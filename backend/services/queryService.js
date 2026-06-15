const { queries } = require('../data/mockDb');

const addQuery = async (userId, queryText) => {
  const newQuery = {
    id: queries.length + 1,
    userId,
    queryText,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  queries.push(newQuery);
  return newQuery;
};

module.exports = { addQuery };

const getQueriesByUser = async (userId) => {
  return queries.filter(q => q.userId === userId);
};

module.exports = {
  addQuery,
  getQueriesByUser
};
