import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [page, setPage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("loggedInUser"));

  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>

        <LoginForm show={page === "login"} setToken={setToken} />

        <Authors show={page === "authors"} />

        <Books show={page === "books"} />
      </>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>

        <button onClick={onLogout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendation show={page === "recommend"} />

      {/* <LoginForm show={page === "login"} setToken={setToken} />  */}
    </div>
  );
};

export default App;
