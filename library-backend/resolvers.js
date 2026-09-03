const { GraphQLError } = require("graphql");
//const { v1: uuid } = require("uuid");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({ genres: args.genre });
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author._id });
      }
      return await Book.find({}).populate("author");
    },

    allAuthors: async () => {
      return await Author.find({});
    },

    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (author) => {
      const books = await Book.find({ author: author._id });
      return books.length;
    },
  },

  Mutation: {
    addBook: async (origin, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("User not authenticated", {
          extension: { code: "UNAUTHENTICATED" },
        });
      }

      if (args.title.length < 5)
        throw new GraphQLError(
          "Input is too short, it has to be more than 4 characters",
          { extension: { code: "BAD_USER_INPUT", invalidArgs: args.author } },
        );
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = await Author({
          name: args.author,

          born: null,
        });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(`saving author failed: ${error.message}`, {
            extension: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,

        genres: args.genres,
      });
      const savedBook = await book.save();
      return savedBook.populate("author");
    },

    editAuthor: async (origin, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("User not authenticated", {
          extension: { code: "UNAUTHENTICATED" },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        password: "secret",
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError(`Creating user failed : ${error.message}`, {
          extensions: {
            code: "BAD_REQUEST",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong username or password ", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = { username: user.username, id: user._id };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError("_resetDatabase is only available in test mode");
      }
      await User.deleteMany({});
      await Book.deleteMany({});
      await Author.deleteMany({});
      return true;
    },
  },
};

module.exports = resolvers;
