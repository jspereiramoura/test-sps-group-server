const uuid = require("uuid");

function genUuid() {
  return uuid.v4();
}

const users = [
  {
    id: genUuid(),
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
];

const getAllUsers = () => users;
const findUserById = (id) => users.find((user) => user.id === id);
const findUserByEmail = (email) => users.find((user) => user.email === email);

const addUser = (user) => {
  users.push({ ...user, id: genUuid() });
};

const updateUser = (id, data) => {
  const user = findUserById(id);
  if (!user) return;

  if (data.name) user.name = data.name;
  if (data.type) user.type = data.type;
  if (data.email) user.email = data.email;
  if (data.password) user.password = data.password;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllUsers,
  findUserById,
  findUserByEmail,
  addUser,
  updateUser,
  deleteUser,
};
