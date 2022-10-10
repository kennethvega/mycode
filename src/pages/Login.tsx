import Button from "../components/Buttons/Button";
import Form from "../components/Form";
const Login = () => {
  return (
    <div className="container margin-top-big ">
      <Form>
        <h2>Login</h2>
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
        <Button disabled={false}>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
