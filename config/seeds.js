var DB = require("../config/connection");
var data = {
  questions: [
    {
      "title": "question 1",
      "content": "this is question 1 content"
    },
    {
      "title": "question 2",
      "content": "this is question 2 content"
    },
    {
      "title": "question 3",
      "content": "this is question 3 content"
    },
  ],
  answers: {
    "question 1": [
      {
        "content": "this is answer 1 for question 1"
      },
      {
        "content": "this is answer 2 for question 1"
      }
    ],
    "question 2": [
      {
        "content": "this is answer 1 for question 2"
      },
      {
        "content": "this is answer 2 for question 2"
      }
    ],
    "question 3": [
      {
        "content": "this is answer 1 for question 3"
      },
      {
        "content": "this is answer 2 for question 3"
      }
    ],
  }

}

DB.models.Question.bulkCreate(data.questions).done(function(){
  DB.models.Question.findAll().done(function(questions){
    var q, question, a, answer, answers, output = [];
    for(q = 0; q < questions.length; q++){
      question = questions[q];
      answers = data.answers[question.title];
      for(a = 0; a < answers.length; a++){
        answer = answers[a];
        answer.questionId = question.id;
        output.push(answer);
      }
    }
    DB.models.Answer.bulkCreate(output).done(function(){
      process.exit();
    })
  });
});













// var DB = require("../config/connection")
//
// var User = DB.models.User
// var Question = DB.models.Question
// var Answer = DB.models.Answer
//
// var users = [
//   {username:"TurtleAdmin", fullname:"GA Honcho Person", email:"honcho@generalassemb.ly", position:"student"},
// ]
//
// var questions = [
//   {title:"How do I create user authentication on my Express app?", content:"My group is building an Express app for WDI and related GA classes with user-submitted questions and answers. We want to implement user authentication, ideally tied to Github login info. What are our options?"},
//   {title:"Express vs. Sinatra", content:"Can someone explain the difference between Express and Sinatra to develop simple single-page apps? How do I choose one vs. the other?"},
//   {title:"Relative and Absolute positioning", content:"I'm trying to nest a box within a box, but am having some trouble. How would I position it?"},
//   {title:"Pseudoclasses", content:"Why would I ever need them?"},
//   {title:"Analogy for MVC framework?", content:"Does anyone have a good metaphor that explains where each piece of the MVC framework fits in?"},
//   {title:"Handlebars in Node", content:"I'm setting up an Express app. When do handlebars help me? Is it only if I'm building an app with multiple pages?"},
//   {title:"rolling back mistakes in Github", content:"Can I use the command <em>git revert</em> to undo my changes? How would I find the right point to go to?"}
// ]
//
// var answers = [
//   {content:"Check out <a href='http://passportjs.org/'>Passport.js</a>. Or go to Jesse's lesson on authentication Tuesday afternoon.", question_id: 1},
//   {content:"Great question..the difference between Expess and Sinatra is ....", question_id: 2},
//   {content:"You should nest the box by doing ....", question_id: 3},
//   {content:"You don't need pseudoclasses because...", question_id: 4},
//   {content:"The MVC fits into the framework...", question_id: 5},
//   {content:"Handlebars help you when...", question_id: 6},
//   {content:"When rolling back changes on Github you should...", question_id: 7}
// ]
//
// User.bulkCreate(users)
// .then(function(){
//   return Question.bulkCreate(questions).then(function(){
//     return Answer.bulkCreate(answers).then(function(){
//       console.log("Seeded successfully! kthxbye");
//       process.exit();
//     })
//   })
// });
