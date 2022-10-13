import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Error from "../components/Error";
import Form from "../components/Form";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSignup } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, error, isPending } = useSignup();
  const navigate = useNavigate();

  // submit signup function
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signUp(email, password, userName);
  };

  return (
    <div className="container margin-top-big">
      <Form>
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
            placeholder="permanent username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </label>
        <label>
          <span>Full name:</span>
          <input
            type="text"
            required
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            placeholder="John Doe"
          />
        </label>
        {isPending ? (
          <PrimaryButton disabled={true}>
            <LoadingSpinner />
          </PrimaryButton>
        ) : (
          <PrimaryButton disabled={false} onClick={handleSubmit}>
            Sign up
          </PrimaryButton>
        )}
        {error && <Error error={error} />}
        <h3 className="form-message">
          Already have an account ?{"  "}
          <a onClick={() => navigate("/login")}>Log in</a>
        </h3>
      </Form>
    </div>
  );
};

export default SignUp;
