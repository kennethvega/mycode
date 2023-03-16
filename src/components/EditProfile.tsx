import { useState, useRef } from "react";
import defaultImage from "../assets/blank profile.jpg";
import { updateProfile } from "firebase/auth";
import {
  collectionGroup,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import Button from "./Buttons/PrimaryButton";
import Container from "./utility/Container";
import Form from "./utility/Form";
import { db, storage } from "../lib/firebase";
import { checkUserWithUsername } from "../services/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import styles from "./EditProfile.module.scss";
import Error from "./utility/Error";
import LoadingSpinner from "./utility/LoadingSpinner";
import { toast } from "react-toastify";

const EditProfile = ({ userDetails, setOpenEditProfile }: DocumentData) => {
  // edit state
  const [username, setUsername] = useState<string | undefined>(
    userDetails?.username
  );

  const [bio, setBio] = useState<string | undefined>(userDetails?.bio);
  const [preview, setPreview] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector(selectUser);

  // ------update profile logic-------
  // add image to preview in UI logic
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

  // update function to call in handleSubmit
  const updateUserProfile = async () => {
    let imageURL: string | null;
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
      displayName: username?.trim(),
    });
    // update document firestore database
    await updateDoc(userRef, {
      photoURL: imageURL,
      username: username?.trim(),
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
          username: username?.trim(),
          photoURL: user?.photoURL,
        })
      )
    );
    // update comments
    const postsComments = await getDocs(
      query(collectionGroup(db, "comments"), where("id", "==", userDetails?.id))
    );
    const userComments = postsComments.docs.map((doc) => ({
      ...doc.data(),
      reference: doc.ref,
    }));
    console.log(userComments);

    await Promise.all(
      userComments.map((comment) =>
        updateDoc(comment.reference, {
          username: username?.trim(),
          photoURL: user?.photoURL,
        })
      )
    );

    setLoading(false);
    setError("");
    setOpenEditProfile(false);
  };
  // submit edit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userDetails?.username === username) {
      try {
        setLoading(true);
        await updateUserProfile();
        setOpenEditProfile(false);
        toast.success("Successfully edited profile.");
      } catch (err) {
        toast.error(`${err}`);
      }
    } else {
      const userNameTaken = await checkUserWithUsername(username);
      if (!userNameTaken) {
        try {
          setLoading(true);
          await updateUserProfile();
          setOpenEditProfile(false);
          toast.success("Successfully edited profile.");
        } catch (err) {
          toast.error(`${err}`);
        }
      } else {
        setError("username is already taken. please try another");
        setLoading(false);
      }
    }
  };

  return (
    <Container>
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
        {error && <Error error={error} />}
        {loading ? (
          <Button disabled={true}>
            <LoadingSpinner />
          </Button>
        ) : (
          <Button disabled={false}>Edit profile</Button>
        )}
      </Form>
    </Container>
  );
};

export default EditProfile;
