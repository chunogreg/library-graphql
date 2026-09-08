import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const ADD_BIRTHDAY = gql`
  mutation addBirthday($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

const AuthorsBirthday = () => {
  const [name, setName] = useState("");
  const [setBornTo, setBorn] = useState("");
  const [token] = useState(localStorage.getItem("loggedInUser"));

  const [addBirthday] = useMutation(ADD_BIRTHDAY);

  const result = useQuery(ALL_AUTHORS);

  const submit = async (event) => {
    event.preventDefault();

    addBirthday({ variables: { name, setBornTo } });

    console.log("add birthday...");

    setName("");
    setBorn("");
  };

  if (!token) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select
            value={name}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option value="">Select author</option>
            {result.data.allAuthors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            born
            <input
              value={setBornTo}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </label>
        </div>

        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  );
};

export default AuthorsBirthday;
