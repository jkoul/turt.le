var express = require('express');
var router = express.Router();
var DB = require('../../config/connection');
var User = DB.models.User;
var Question = DB.models.Question;
var Answer = DB.models.Answer;


function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/answers", function(req, res){
  Answer.findAll({order: "id"}).then(function(answers){
    res.json(answers);
  });
});

router.get("/answers/:id", function(req, res){
  Answer.findById(req.params.id).then(function(answer){
    res.json(answer);
  });
});

router.put("/answers/:id", function(req, res){
  Answer.findById(req.params.id).then(function(answer){
    if(!answer) return error(res, "not found");
    answer.updateAttributes(req.body).then(function(answer){
      res.json(answer);
    });
  });
});

router.delete("/answers/:id", function(req, res){
  Answer.findById(req.params.id).then(function(answer){
    if(!answer) return error(res, "not found");
    answer.destroy().then(function(db_res){
      res.json(db_res);
    });
  });
});

router.get("/questions/:questionId/answers", function(req, res){
  Question.findById(req.params.questionId)
  .then(function(question){
    if(!question) return error(res, "not found");
    return question.getAnswers();
  })
  .then(function(answers){
    res.json(answers);
  });
});

router.post("/questions/:questionId/answers", function(req, res){
  Question.findById(req.params.questionId)
  .then(function(question){
    if(!question) return error(res, "not found");
    return question.createAnswer(req.body);
  })
  .then(function(answers){
    res.json(answers);
  });
});

module.exports = router;
