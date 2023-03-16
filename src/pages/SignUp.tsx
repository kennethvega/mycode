import defaultImage from "../assets/blank profile.jpg";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Error from "../components/utility/Error";
import Form from "../components/utility/Form";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { useSignup } from "../hooks/useSignUp";
import Container from "../components/utility/Container";
import styles from "../components/EditProfile.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [preview, setPreview] = useState<any>();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { signUp, error, isPending } = useSignup();

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

  // submit signup function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signUp(email, password, userName, profilePicture);
  };
  const user = useSelector(selectUser);
  
  return (
    <Container>
      {!user && (
        <Form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <label>
            <span>Email:</span>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              type="password"
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <label>
            <span>Username:</span>
            <input
              type="text"
              required
              placeholder="John Doe"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </label>

          {/* image */}
          <label className={styles.picture}>
            <img
              src={preview ? preview : defaultImage}
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
              disabled={isPending ? true : false}
            />
          </label>

          {isPending ? (
            <PrimaryButton disabled={true} type="submit">
              <LoadingSpinner />
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled={false}>Sign up</PrimaryButton>
          )}
          {error && <Error error={error} />}
          <h3 className="form-message">
            Already have an account ?{"  "}
            <Link to="/login">Log in</Link>
          </h3>
        </Form>
      )}
    </Container>
  );
};

export default SignUp;
