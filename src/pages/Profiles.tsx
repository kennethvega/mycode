import { useState, useEffect, useRef } from "react";
import styles from "./Profiles.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import {
  collection,
  collectionGroup,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../lib/firebase";
import { checkUserWithUsername, postToJSON } from "../services/firebase";
import { Document } from "../ts/types/document";
// components
import PostItem from "../components/PostItem";
import Button from "../components/Buttons/PrimaryButton";
import Modal from "../components/utility/Modal";
import Form from "../components/utility/Form";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Container from "../components/utility/Container";

const Profiles = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<DocumentData | undefined>();
  const [documents, setDocuments] = useState<DocumentData | undefined>();

  useEffect(() => {
    // get users posts only once when component mounts.
    const fetchData = async () => {
      // fetch user data
      const userQuery = doc(db, "users", `${id}`);
      const userSnap = await getDoc(userQuery);
      const user = userSnap.data();
      setUserDetails(user);
      console.log(user);
      // fetch user posts
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
    <Container>
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
          <Link to={`/edit-profile/${id}`}>
            <Button type="button" disabled={false}>
              Edit profile
            </Button>
          </Link>
        </div>
        <div className={styles["posts-container"]}>
          {documents?.map((document: Document) => {
            return <PostItem document={document} key={document.slug} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export default Profiles;
