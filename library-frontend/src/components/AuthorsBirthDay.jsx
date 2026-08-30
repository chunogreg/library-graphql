import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const ADD_BIRTHDAY = gql`
  mutation addBirthday($name: String!, $setBornTo: String) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

const AuthorsBirthday = () => {
  const [name, setName] = useState(null);
  const [setBornTo, setBorn] = useState("");

  const [addBirthday] = useMutation(
    ADD_BIRTHDAY,

    {
      onError: (error) => {
        console.log("CREATE BOOK ERROR:", error);
      },
    },
  );

  const submit = async (event) => {
    event.preventDefault();

    addBirthday({ variables: { name, setBornTo } });

    console.log("add birthday...");

    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birthday</h2>
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option value="">Select author</option>
            <option value="Robert Martin">Robert Martin</option>
            <option value="Martin Fowler">Martin Fowler</option>
            <option value="Fyodor Dostoevsky">Fyodor Dostoevsky</option>
            <option value="Joshua Kerievsky">Joshua Kerievsky</option>
            <option value="Sandi Metz">Sandi Metz</option>
          </select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  );
};

export default AuthorsBirthday;
