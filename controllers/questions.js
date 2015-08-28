var express = require('express');
var router = express.Router();
var DB = require('../../config/connection');
var User = DB.models.User;
var Question = DB.models.Question;


function error(response, message){
  response.status(500);
  response.json({error: message})
}


//index of questions
router.get("/questions", function (req, res) {
  Question.findAll({order: "id"}).then(function (questions) {
    res.json(questions);
  });
});

//update a question with id ":id"
router.put("/questions/:id", function (req, res) {
  Question.findById(req.params.id)
  .then(function (question) {
    if(!question) return error(res, "not found");
    return question.updateAttributes(req.body);
  })
  .then(function (question) {
    res.json(question);
  });
});

//delete a question with id ":id"
router.delete("/questions/:id", function (req, res) {
  Question.findById(req.params.id)
  .then(function(question){
    if(!question) return error(res, "not found");
    return question.destroy()
  })
  .then(function(question){
    res.json(question)
  });
})

//get questions from user
router.get("/users/:userId/questions", function(req, res){
  User.findById(req.params.questionId).then(function(user){
    if(!user) return error(res, "not found");
    return user.getQuestions();
  }).then(function(questions){
    res.json(questions);
  })
})


//create a new question
router.post("/questions", function (req, res) {
  Question.create(req.body).then(function (question) {
    res.json(question);
  })
});

module.exports = router;
