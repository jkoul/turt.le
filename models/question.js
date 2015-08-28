module.exports = function(sequelize, Sequelize){
  return sequelize.define("question", {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    category: Sequelize.STRING,
    user_id: Sequelize.STRING
  });
}
