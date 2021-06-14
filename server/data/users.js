const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admn@xyz.com",
    password: bcrypt.hashSync("abc$123456", 10),
    isAdmin: true,
  },
  {
    name: "Messi",
    email: "messi@xyz.com",
    password: bcrypt.hashSync("abc$123456", 10),
  },
  {
    name: "Ronaldo",
    email: "ronaldo@xyz.com",
    password: bcrypt.hashSync("abc$123456", 10),
  },
];

module.exports = users;
