import { useQuery } from "@apollo/client/react";
//import { gql } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [myGenre, setMyGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre: myGenre } });
  //const [bookArray, setBookArray] = useState([]);

  if (result.loading) {
    return <div>Loading ......</div>;
  }

  // const handleFiltered = (bookGenre) => {
  //   if (bookGenre === "all") {
  //     setBookArray(result.data.allBooks);
  //     return;
  //   }

  //   const filteredBooks = result.data.allBooks.filter((book) =>
  //     book.genres?.includes(bookGenre),
  //   );
  //   setBookArray(filteredBooks);
  // };

  //console.log("== BOOK-ARRAY ==", bookArray);

  if (!props.show) {
    return null;
  }
  const genres = [
    "classic",
    "refactoring",
    "agile",
    "design",
    "patterns",
    "crime",
  ];
  return (
    <div>
      <h2>books</h2>

      {/* <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr> */}
      {/* {bookArray.length > 0
            ? bookArray.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))} */}
      {/* </tbody>
      </table> */}

      {/* <div>
        <br />
        {genres.map((g) => (
          <button onClick={() => handleFiltered(g)}> {g} </button>
        ))}
        <button onClick={() => handleFiltered("all")}>all genres</button>
      </div> */}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <br />
        {genres.map((g) => (
          <button key={g} onClick={() => setMyGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setMyGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
