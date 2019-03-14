$(function() {

  function Meme(id, title, description, year, img_link) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.year = year;
    this.img_link = img_link; }

  function User(id, username, high_score) {
    this.id = id;
    this.username = username;
    this.description = high_score; }

  function Question(id, type, entitled, id_rep) {
    this.id = id;
    this.type = type;
    this.entitled = entitled;
    this.id_rep = id_rep; }

  function refreshPage() {
    $("#content").empty(); }

  function getQuestions() {
    $.ajax({
      url: "http://localhost:3000/questions/",
      type: "GET",
      dataType: "json",
      sucess: function(questions) {
        console.log("SUCCESSFULLY LOADED QUESTIONS");
        let question_list = [];
        for (let i = 0; i < questions.length; i++) {
          question_list[i] = Question(questions[i].id, questions[i].type, questions[i].entitled, question[i].id_rep); }
        return question_list; },
      error : function() {
        console.log("ERROR : COULDN'T LOAD QUESTIONS");
        return null; }}); }

});
