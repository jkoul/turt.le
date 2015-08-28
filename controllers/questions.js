var express = require('express');
var router = express.Router();
var DB = require('../../config/connection');
var Question = DB.models.Question;


function error(response, message){
  response.status(500);
  response.json({error: message})
}


//index of questions
router.get("/questions", function(req, res){
  Question.findAll().then(function(questions){
    res.render("questions/index", {questions: questions});
  });
});

//update a question with id ":id"
router.get("/questions/:id", function (req, res) {
  if (req.params.id == "api") {
    Question.findAll({order: "id"}).then(function (questions) {
      res.json(questions);
    })
  }
  else {
    var question;
    Question.findById(req.params.id)
    // .then(function(a){
    //   if(!a) return error(res, "not found");
    //   question = a;
    //   return question.getAnswers()
    // })
    .then(function(answers){
      res.render("questions/show", {question: question, answers: answers});
    });
  }
});

//go to new question form
router.get("/questions/new", function(req, res){
  res.render("questions/new");
});


//create a new question
router.post("/questions", function (req, res) {
  Question.create(req.body).then(function (question) {
    res.json(question);
    res.redirect("/questions/" + question.id);
  })
});

// go to edit question form
router.get("/questions/:id/edit", function(req, res){
  Question.findById(req.params.id).then(function(question){
    if(!question) return error(res, "not found");
    res.render("questions/edit", {question: question});
  });
});

// update a question
router.put("/questions/:id", function(req, res){
  var updatedQuestion, songs;
  Question.findById(req.params.id)
  .then(function(question){
    if(!question) return error(res, "not found");
    return question.updateAttributes(req.body)
  })
  .then(function(question){
    updatedQuestion = question;
    return updatedQuestion.getSongs()
  })
  // .then(function(songs){
  //   res.render("questions/show", {question: updatedQuestion, answers: answers});
  // });
});

//delete a question with id ":id"
router.delete("/questions/:id", function (req, res) {
  Question.findById(req.params.id)
  .then(function(question){
    if(!question) return error(res, "not found");
    return question.destroy()
  })
  .then(function(question){
    res.redirect("/questions")
  });
})

module.exports = router;
