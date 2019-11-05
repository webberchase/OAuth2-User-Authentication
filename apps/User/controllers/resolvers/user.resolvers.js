const { User } = require('../../models/User');

const getUsers = () => User.find();

const getUserById = id => User.findById(id);

const getUserByAccessToken = accessToken => User.findOne({ accessToken: new RegExp(`^${accessToken}$`, 'i') });

const getUserByUsername = username => User.findOne({ username: new RegExp(`^${username}$`, 'i') });

const getUserByEmail = email => User.findOne({ email: new RegExp(`^${email}$`, 'i') });

const createUser = async (accessToken) => {
  const date = new Date();
  const user = new User({
    accessToken,
    disabled: false,
    accountVerified: false,
    dateCreated: date,
    dateModified: date,
  });
  await user.save();
  return user;
};

const deleteUser = async id => User.findByIdAndDelete(id).then(result => result);

const updateUser = async (id, updateVariable, updateValue) => {
  if (updateValue === '~DATETIME~') {
    const val = await User.findByIdAndUpdate(id,
      { $set: { [updateVariable]: new Date() } },
      { new: false })
      .then(result => result);
    return val;
  }
  const val = await User.findByIdAndUpdate(id,
    { $set: { [updateVariable]: updateValue } },
    { new: true })
    .then(result => result);
  return val;
};

// Functions condenced to be exported
const userResolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUserById: ({ id }) => getUserById(id),
    getUserByAccessToken: ({ accessToken }) => getUserByAccessToken(accessToken),
    getUserByUsername: ({ username }) => getUserByUsername(username),
    getUserByEmail: ({ email }) => getUserByEmail(email)
  },
  Mutation: {
    createUser: async ({ accessToken }) => createUser(accessToken),
    deleteUser: async ({ id }) => deleteUser(id),
    updateUser: async ({
      id, updateVariable, updateValue
    }) => updateUser(id, updateVariable, updateValue),
  }
};

module.exports.userResolvers = userResolvers;
