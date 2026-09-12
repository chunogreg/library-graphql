import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ALL_BOOKS = gql`
  query bookByGenre($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      id
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      author {
        id
        name
        born
        bookCount
      }
      genres
    }
  }
`;
