var express = require('express');
var router = express.Router();
var DB = require('../../config/connection');
var Question = DB.models.Question;
var Answer = DB.models.Answer;


function error(response, message){
  response.status(500);
  response.json({error: message})
}

function songsWithQuestionNames(answers, questions){
  var a, q;
  for(a in answers){
    for(q in questions){
      if(questions[q].id == answers[a].questionId){
        answers[a].questionTitle = questions[q].title;
        break;
      }
    }
  }
  return answers;
}

router.get("/answers", function(req, res){
  var answers;
  Answer.findAll()
  .then(function(s){
    answers = a;
    return Question.findAll()
  })
  .then(function(questions){
    res.render("answers/index", {answers: songsWithQuestionNames(answers, questions)});
  });
});

router.get("/answers/:id", function(req, res){
  if(req.params.id == "api"){
    Answer.findAll({order: "id"}).then(function(answers){
      res.json(answers);
    });
  } else {
    var answer;
    Answer.findById(req.params.id)
    .then(function(a){
      if(!a) return error(res, "not found");
      answer = a;
      return answer.getQuestion();
    })
    .then(function(question){
      answer.questionMame = question.title;
      res.render("answers/show", {answer: answer});
    });
  }
});

router.get("/answers/new", function(req, res){
  res.render("answers/new");
})


router.get("/answers/:id/edit", function(req, res){
  Answer.findById(req.params.id).then(function(answer){
    if(!answer) return error(res, "not found");
    res.render("answers/edit", {answer: answer});
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
