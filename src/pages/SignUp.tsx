import Button from "../components/Buttons/Button";
import Form from "../components/Form";

const SignUp = () => {
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
          <span>Permanent User name:</span>
          <input
            type="text"
            required
            placeholder="make unique username"
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
        <Button disabled={false}>Sign up</Button>
        <h3 className="form-message">
          Already have an account ?{"  "}
          {/* <Link href="/Login">Log in</Link> */}
          <a href="#">Log in</a>
        </h3>
      </Form>
    </div>
  );
};

export default SignUp;
