import { useState, useEffect, useRef } from "react";
import styles from "./Profiles.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import {
  collection,
  collectionGroup,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, storage } from "../lib/firebase";
import { checkUserWithUsername, postToJSON } from "../services/firebase";
import { Document } from "../ts/types/document";
// components
import PostItem from "../components/PostItem";
import Button from "../components/Buttons/PrimaryButton";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profiles = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<DocumentData | undefined>();
  const [documents, setDocuments] = useState<DocumentData | undefined>();
  // edit state
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [preview, setPreview] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector(selectUser);

  // fetch user details realtime
  useEffect(() => {
    // realtime data on user
    onSnapshot(doc(db, "users", `${id}`), (doc) => {
      const data = doc.data();
      setUserDetails(data);
      setPhotoUrl(data?.photoURL);
      setUsername(data?.username);
      setBio(data?.bio);
      console.log(doc);
    });

    // get users posts only once when component mounts.
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

  // ------update profile logic-------
  // add image
  const addProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target?.result);
    };
  };

  // update function logic
  const updateUserProfile = async () => {
    let imageURL: any;
    const userRef = doc(db, "users", `${user?.uid}`);
    const fileRef = ref(storage, userDetails?.id);
    if (profilePicture) {
      await uploadBytes(fileRef, profilePicture);
      imageURL = await getDownloadURL(fileRef);
    } else {
      imageURL = userDetails?.photoURL;
    }
    // update both profile and users document
    await updateProfile(user!, {
      photoURL: imageURL,
      displayName: username,
    });
    // update document firestore database
    await updateDoc(userRef, {
      photoURL: imageURL,
      username: username,
      bio: bio,
    });

    // update user posts username and user photo
    const postsData = await getDocs(
      query(collectionGroup(db, "posts"), where("id", "==", userDetails?.id))
    );
    const userPosts = postsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    await Promise.all(
      userPosts.map((post) =>
        updateDoc(doc(db, "users", `${user?.uid}/posts/${post?.id}`), {
          username: username,
          photoURL: user?.photoURL,
        })
      )
    );

    setLoading(false);
    setOpenModal(false);
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userDetails?.username === username) {
      try {
        setLoading(true);
        await updateUserProfile();
      } catch (err) {
        console.log(err);
      }
    } else {
      const userNameTaken = await checkUserWithUsername(username);
      if (!userNameTaken) {
        try {
          setLoading(true);
          await updateUserProfile();
        } catch (err) {
          console.log(err);
        }
      } else {
        setError("username is already taken. please try another");
        setLoading(false);
      }
    }
  };

  return (
    <div className="container margin-top-big">
      <div className={styles["profile-grid"]}>
        {/* edit profile modal */}
        <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
          <h3 className={styles["update-heading"]}>Update Profile</h3>
          <Form onSubmit={handleSubmit}>
            <label>
              <span>Username:</span>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>
            <label>
              <span>Bio:</span>
              <textarea onChange={(e) => setBio(e.target.value)} value={bio} />
            </label>
            <label className={styles.picture}>
              <img
                src={
                  preview || userDetails?.photoURL
                    ? preview || userDetails?.photoURL
                    : defaultImage
                }
                width={150}
                height={150}
                alt="user-profile"
                className={styles.image}
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
              />
              <p>Upload a photo</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles["image-input-file"]}
                onChange={addProfilePicture}
                disabled={loading ? true : false}
              />
            </label>
            <Button disabled={false}>Edit profile</Button>
          </Form>
        </Modal>
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
          {error && <p>{error}</p>}
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
    </div>
  );
};

export default Profiles;
