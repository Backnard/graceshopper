const { client } = require('./client')

module.exports = {
  client,
  ...require('./users'),
  ...require('./categories'),
  ...require('./products'),
};
