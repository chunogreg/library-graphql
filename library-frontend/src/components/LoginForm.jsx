import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../queries";
import { Token } from "graphql";

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(
    LOGIN,
    {
      onCompleted: (data) => {
        const token = data.login.value;
        setToken(token);
        localStorage.setItem("loggedInUser", token);
      },
    },
    // {
    //   onError: (error) => {
    //     setError(error.message);
    //   },
    // },
  );

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
          username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />{" "}
        </div>
        <div>
          {" "}
          password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
