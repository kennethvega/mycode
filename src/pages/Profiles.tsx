import { useState, useEffect } from "react";
import styles from "./Profiles.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import { Document } from "../ts/types/document";
// components
import PostItem from "../components/PostItem";
import Button from "../components/Buttons/PrimaryButton";
import Container from "../components/utility/Container";
import PostItemSkeleton from "../components/skeletons/PostItemSkeleton";
import ProfileSidebarSkeleton from "../components/skeletons/ProfileSidebarSkeleton";
import { useNameFormat } from "../hooks/useNameFormat";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

const Profiles = () => {
  let { id } = useParams();
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState<DocumentData | undefined>();
  const [documents, setDocuments] = useState<DocumentData | undefined>();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  // capitalizing the user username
  const displayName = useNameFormat(userDetails?.username);
  useEffect(() => {
    // fetch user document
    const timer = setTimeout(() => {
      const userQuery = doc(db, "users", `${id}`);
      onSnapshot(userQuery, (snapshot) => {
        const data = snapshot.data();
        setUserDetails(data);
      });
      // fetch user posts
      const q = query(
        collection(db, "users", `${id}`, "posts"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const postsData: any = [];
        snapshot.forEach((doc) => {
          postsData.push(postToJSON(doc));
        });
        setDocuments(postsData);
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <Container>
      {!openEditProfile && (
        <div className={styles["profile-grid"]}>
          {userDetails && (
            <div className={styles.profile}>
              <img
                src={
                  userDetails?.photoURL ? userDetails?.photoURL : defaultImage
                }
                alt="profile-image"
                className={styles.image}
              />

              <h1 className={styles.name}>{displayName}</h1>

              <p className={styles.bio}>{`${
                userDetails?.bio ? `Bio: ${userDetails?.bio}` : " "
              }`}</p>
              <p className={styles.documents}>Documents: {documents?.length}</p>

              {user?.uid == userDetails?.id && (
                <Button
                  type="button"
                  disabled={false}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Edit profile
                </Button>
              )}
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
      )}
      {openEditProfile && (
        <EditProfile
          userDetails={userDetails}
          setOpenEditProfile={setOpenEditProfile}
        />
      )}
    </Container>
  );
};

export default Profiles;
