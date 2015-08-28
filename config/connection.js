var Sequelize = require("sequelize");

if (process.env.DATABASE_URL){
  // The application is executed on Heroku, use the postgres database.
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true // false
  });
} else {
  sequelize = new Sequelize("postgres:///turtle_db");

// var User = sequelize.import("../app/models/user");
var Question = sequelize.import("../app/models/question");
var Answer = sequelize.import("../app/models/answer");

// User.hasMany(Question);
// User.hasMany(Answer);
Answer.belongsTo(Question);
Question.hasMany(Answer);
// Answer.belongsTo(User);
// Question.belongsTo(User);


module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    // User: User,
    Question: Question,
    Answer: Answer
  }
}
