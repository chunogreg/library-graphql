import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("loggedInUser", token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            {" "}
            username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />{" "}
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
