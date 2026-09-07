import { ME, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client/react";

const Recommendation = (props) => {
  const result = useQuery(ME);
  const genreResult = useQuery(ALL_BOOKS);

  if (result.loading) return <div>loading - - - -</div>;

  if (result.error) return <div> Error loading </div>;

  if (!props.show) return null;
  console.log(" == RECOMMENDATION ==", genreResult.data.allBooks[2]);
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <strong>{result.data.me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreResult.data.allBooks
            .filter((a) => a.genres.includes(result.data.me.favoriteGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
