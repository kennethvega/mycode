import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Form from "../components/Form";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="container margin-top-big ">
      <Form>
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
        <PrimaryButton disabled={false} type="submit">
          Login
        </PrimaryButton>
        <h3 className="form-message">
          Don&apos;t have an account ? sign up here{" "}
          <a onClick={() => navigate("/signup")}>Signup</a>
        </h3>
      </Form>
    </div>
  );
};

export default Login;
