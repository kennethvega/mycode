import defaultImage from "../assets/blank profile.jpg";
import { deleteDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/utility/Container";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import DOMPurify from "dompurify";
import styles from "./Document.module.scss";
import useDateFormat from "../hooks/useDateFormat";
import Likes from "../components/Likes";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Tippy from "@tippyjs/react";
import EditDocument from "../components/EditDocument";
import { useNameFormat } from "../hooks/useNameFormat";
import Modal from "../components/utility/Modal";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import CommentsContainer from "../components/CommentsContainer";
import { toast } from "react-toastify";

export const Document = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState<DocumentData>();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = useNameFormat(post?.username);
  const date = useDateFormat(post?.createdAt);
  const { id, slug } = useParams();
  const navigate = useNavigate();
  //document reference
  const docRef = doc(db, "users", `${id}`, "posts", `${slug}`);
  // fetch postdetail
  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      const data = postToJSON(snapshot);
      setPost(data);
    });
  }, [id]);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await deleteDoc(docRef);
    setLoading(false);
    navigate("/");
    toast.success("Successfully deleted post.");
  };

  return (
    <Container>
      {!openEditForm && (
        <div className={styles["document-container"]}>
          <div className={styles["left-col"]}>
            <div className={styles["reactions-container"]}>
              <Likes id={post?.id} likes={post?.likes} slug={post?.slug} />
              <Tippy content="Jump to comments">
                <a href="#comments" className={styles["comment-container"]}>
                  <MdOutlineInsertComment className={styles.comment} />
                  <span>{post?.comments}</span>
                </a>
              </Tippy>
            </div>
          </div>
          <div className={styles["main-col"]}>
            <div className={styles["post-image-container"]}>
              <img
                src={post?.photoURL ? post.photoURL : defaultImage}
                alt="Author's image"
                className={styles.image}
              />
              <div className={styles["author-container"]}>
                <Link to={`/profile/${post?.id}`}>
                  <p className={styles.name}>{name}</p>
                </Link>
                <span>{date}</span>
              </div>
              {/* edit delete buttons */}
              {post?.id === user?.uid && (
                <div className={styles["buttons-container"]}>
                  <Tippy content="Edit this post">
                    <div onClick={() => setOpenEditForm(true)}>
                      <TbEdit className={styles.edit} />
                    </div>
                  </Tippy>
                  <Tippy content="Delete this post">
                    <div onClick={() => setOpenModal(true)}>
                      <RiDeleteBin6Line className={styles.delete} />
                    </div>
                  </Tippy>
                </div>
              )}
            </div>
            {/* main contents of page */}
            <h1 className={styles["post-title"]}>{post?.title}</h1>
            <div
              className="scrollbar"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.content),
              }}
            ></div>
            {/* comments */}
            <CommentsContainer id={id} slug={slug} />
          </div>
        </div>
      )}
      {openEditForm && (
        <EditDocument post={post} setOpenEditForm={setOpenEditForm} />
      )}
      {openModal && (
        <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
          <h2 className={styles["modal-title"]}>
            Are you sure you want to delete this post ?
          </h2>
          <div className={styles["modal-button-container"]}>
            {!loading ? (
              <PrimaryButton disabled={false} onClick={handleDelete}>
                Delete
              </PrimaryButton>
            ) : (
              <PrimaryButton disabled={true}>
                <LoadingSpinner />
              </PrimaryButton>
            )}
            <SecondaryButton
              disabled={false}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </SecondaryButton>
          </div>
        </Modal>
      )}
    </Container>
  );
};
