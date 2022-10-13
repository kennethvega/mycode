import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Form from "../components/Form";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="container margin-top-big">
      <Form>
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            // onChange={(e) => setEmail(e.target.value)}
            required
            // value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            placeholder="password"
            // onChange={(e) => setPassword(e.target.value)}
            // value={password}
          />
        </label>
        <label>
          <span>Username:</span>
          <input
            type="text"
            required
            placeholder="permanent username"
            // onChange={(e) => setUserName(e.target.value)}
            // value={userName}
          />
        </label>
        <label>
          <span>Full name:</span>
          <input
            type="text"
            required
            // onChange={(e) => setUserName(e.target.value)}
            // value={userName}
            placeholder="John Doe"
          />
        </label>
        <PrimaryButton disabled={false}>Sign up</PrimaryButton>
        <h3 className="form-message">
          Already have an account ?{"  "}
          {/* <Link href="/Login">Log in</Link> */}
          <a onClick={() => navigate("/login")}>Log in</a>
        </h3>
      </Form>
    </div>
  );
};

export default SignUp;
// Image upload option later
{/* <label className={styles.picture}>
<Image
  src={
    preview || userDetail.photoURL
      ? preview || userDetail.photoURL
      : defaultImage
  }
  width={150}
  height={150}
  alt="user-profile"
  className={styles.image}
  onClick={(e) => {
    e.preventDefault();
    fileInputRef.current.click();
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
</label> */}