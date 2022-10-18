import { useState, useEffect } from "react";
import styles from "./Profiles.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import { Document } from "../ts/types/document";
// components
import PostItem from "../components/PostItem";
import Button from "../components/Buttons/PrimaryButton";

import Container from "../components/utility/Container";
import PostItemSkeleton from "../components/skeletons/PostItemSkeleton";
import ProfileSidebarSkeleton from "../components/skeletons/ProfileSidebarSkeleton";

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
        {userDetails && (
          <div className={styles.profile}>
            <img
              src={userDetails?.photoURL ? userDetails?.photoURL : defaultImage}
              alt="profile-image"
              className={styles.image}
            />

            <h1 className={styles.name}>{userDetails?.username}</h1>

            <p className={styles.bio}>{`${
              userDetails?.bio ? `Bio: ${userDetails?.bio}` : " "
            }`}</p>
            <p>Documents: {documents?.length}</p>
            <Link to={`/edit-profile/${id}`}>
              <Button type="button" disabled={false}>
                Edit profile
              </Button>
            </Link>
          </div>
        )}
        {!userDetails && <ProfileSidebarSkeleton />}

        <div className={styles["posts-container"]}>
          {documents &&
            documents?.map((document: Document) => {
              return <PostItem document={document} key={document.slug} />;
            })}
          {!documents && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profiles;
