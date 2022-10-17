import styles from "./Profiles.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";

import PostItem from "../components/PostItem";
import Button from "../components/Buttons/PrimaryButton";
import { Document } from "../ts/types/document";
import Modal from "../components/Modal";
import Form from "../components/Form";
const Profiles = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<DocumentData | undefined>();
  const [documents, setDocuments] = useState<DocumentData | undefined>();
  // edit state
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [bio, setBio] = useState<string | undefined>();

  // fetch user details realtime
  useEffect(() => {
    // realtime data on user
    onSnapshot(doc(db, "users", `${id}`), (doc) => {
      const data = doc.data();
      setUserDetails(data);
      setPhotoUrl(data?.photoURL);
      setUsername(data?.username);
      setBio(data?.bio);
    });

    // get users posts one time
    const fetchData = async () => {
      const q = query(
        collection(db, "users", `${id}`, "posts"),
        orderBy("createdAt", "desc")
      );
      const snapShot = await getDocs(q);
      const posts = snapShot.docs.map(postToJSON);
      setDocuments(posts);
    };

    fetchData();
  }, []);

  return (
    <div className="container margin-top-big">
      <div className={styles["profile-grid"]}>
        <div className={styles.profile}>
          <img
            src={userDetails?.photoURL ? userDetails?.photoURL : defaultImage}
            alt="profile-image"
            className={styles.image}
          />

          <h1 className={styles.name}>{userDetails?.username}</h1>

          <p className={styles.bio}>{userDetails?.bio}</p>
          <p>Documents: {userDetails?.length}</p>
          <Button
            type="submit"
            disabled={false}
            onClick={() => setOpenModal(true)}
          >
            Edit profile
          </Button>
        </div>
        <div className={styles["posts-container"]}>
          {documents?.map((document: Document) => {
            return (
              <div key={document.slug}>
                <PostItem document={document} />
              </div>
            );
          })}
        </div>
      </div>
      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <h3 className={styles.heading}>Update Profile</h3>
        <Form>
          <label>
            <span>Username:</span>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
        </Form>
      </Modal>
    </div>
  );
};

export default Profiles;
