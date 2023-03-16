import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Container from "../components/utility/Container";
import Error from "../components/utility/Error";
import Form from "../components/utility/Form";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error, isPending } = useLogin();

  //  handle submit
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="demo-details">
          <p>Demo account:</p>
          <span>Email:johndoe@gmail.com</span>
          <span>Password:password</span>
        </div>
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
        {isPending ? (
          <PrimaryButton disabled={true}>
            <LoadingSpinner />
          </PrimaryButton>
        ) : (
          <PrimaryButton disabled={false} type="submit">
            Login
          </PrimaryButton>
        )}

        {error && <Error error={error} />}
        <h3 className="form-message">
          Don&apos;t have an account ? sign up here{" "}
          <Link to="/signup">Signup</Link>
        </h3>
      </Form>
    </Container>
  );
};

export default Login;
