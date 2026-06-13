const { users } = require('../data/mockDb');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password) => {
  // In a real application, you would check against a database and use bcrypt to compare hashes
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '2h' }
  );

  return { token, user: { id: user.id, email: user.email } };
};

const signUpUser = async ({ name, email, password }) => {
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  return {
    message: 'User created successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  };
};

module.exports = { loginUser, signUpUser };
