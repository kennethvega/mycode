import defaultImage from "../../assets/blank profile.jpg";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Error from "../components/utility/Error";
import Form from "../components/utility/Form";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { useSignup } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { signUp, error, isPending } = useSignup();

  // submit signup function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password, userName);
  };

  return (
    <div className="container margin-top-big">
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
    </div>
  );
};

export default SignUp;
