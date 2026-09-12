import { useState } from "react";
import {
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client/react";
import { ADD_BOOK, ALL_BOOKS } from "../queries";
import { BOOK_ADDED } from "../queries";
import { addBookToCache } from "../utils/apolloCache";

const NewBook = ({ setError, show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const client = useApolloClient();

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook;
      addBookToCache(cache, addedBook);
    },

    // refetchQueries: [{ query: ALL_BOOKS } ],
    // refetchQueries: ["ALL_BOOKS"],
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log("== BOOK ADDED ==", addedBook);
      //setError(`${addedBook.title} added`);
      setError("Book added successfully");
      addBookToCache(client.cache, addedBook);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await createBook({ variables: { title, published, author, genres } });
    } catch (error) {
      setError(error.message);
    }

    console.log("add book...");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />{" "}
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(parseInt(target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            genre
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
