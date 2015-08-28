module.exports = function(sequelize, Sequelize){
  return sequelize.define("answer", {
    content: Sequelize.STRING,
    score: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    question_id: Sequelize.INTEGER
    // comments: Sequelize.STRING
  });
}
