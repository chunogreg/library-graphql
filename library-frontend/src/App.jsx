import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
import Recommendation from "./components/Recommendation";
import Notification from "./components/Notification";
//import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("loggedInUser"));
  const [errorMsg, setErrorMsg] = useState(null);

  //console.log("== LOGIN ERROR ==", errorMsg);

  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  };

  if (!token) {
    return (
      <>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>

        <Notification errorMsg={errorMsg} />
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setError={notify}
        />

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

      <Notification errorMsg={errorMsg} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommendation show={page === "recommend"} />

      {/* <LoginForm show={page === "login"} setToken={setToken} />  */}
    </div>
  );
};

export default App;
