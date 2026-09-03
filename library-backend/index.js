const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const startServer = require("./server");
const connnectToDb = require("./db");

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 4000;
const main = async () => {
  await connnectToDb(MONGODB_URI);
  startServer(PORT);
};
main();
