import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import AuthorsBirthday from "./AuthorsBirthDay";

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

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  console.log("===AUTHORS===", result);

  if (!props.show) {
    return null;
  }
  //const authors = [];

  if (result.loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>

          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorsBirthday />
    </div>
  );
};

export default Authors;
