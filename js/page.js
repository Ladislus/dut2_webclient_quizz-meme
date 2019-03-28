$(function() {
  let global_question = [];
  let asked_question = [];
  let global_meme_question;
  let global_answer_meme_final;
  let the3memes = []
  let score = 0;

  function Meme(title, description, year, img_link, id) {
    this.title = title;
    this.description = description;
    this.year = year;
    this.img_link = img_link;
    this.id = id;}

  function User(username, high_score) {
    this.username = username;
    this.description = high_score; }

  function Question(type, entitled, id_rep) {
    this.type = type;
    this.entitled = entitled;
    this.id_rep = id_rep; }

  function refreshPage() {
    $("#content").empty(); }

  function getQuestions() {
    fetch("http://localhost:3000/questions/")
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error("ERROR : Fetching questions (" + response.status + ")"); })
      .then(var_question)
      .then(questAleat);
    }

  function var_question(questions) {
    global_question = questions;
  }

  function getMemes(page) {
    fetch("http://localhost:3000/memes/")
    .then(response => {
      if (response.ok) {
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); }, page)
      .then(fillMemes);
  }

  function fillMemes(memes) {
    refreshPage();
    $("#content")
      .append($('<div class="col-12 p-2">')
        .append($('<input class="form-control" type="text" id="searchbar" placeholder="Search for memes..">').on("keyup",search))
      )
      .append($('<div id="cardDeck" class="row m-3 mx-auto justify-content-center">'))
      .append($('<ul class="pagination pagination-sm">'));

    for(let meme of memes) {
      $("#cardDeck")
        .append($('<div class="carte col-lg-4 col-sm-6 p-2">')
          .append($('<div class="card m-3 h-100">')
            .append($('<div class="m-2 img-container d-flex align-items-center">')
              .append($('<img class="card-img-top mx-auto" src="' + meme.img_link + '" alt="Card image cap">'))
            )
            .append($('<div class="card-body">')
              .append($('<h5 class="card-title">' + meme.title + '</h5>'))
              .append($('<p id="desc" class="card-text">' + meme.description + '</p>'))
              .append($('<p class="card-text">' + meme.year + '</p>'))
              .append($('<button class="btn btn-primary">Modify</button>').on("click", meme, details))
              .append($('<button class="btn btn-danger float-right">Delete</button>').on("click", meme, supprMeme))
            )
          )
        );
    }

  }

  function details(event){
      memeLayout();
      fillFormMeme(event.data);
  }

  function supprMeme(event){
      refreshPage();
      suppr(event.data);
      getMemes();
  }

  function fillFormMeme(m){
    $("#nameMeme").val(m.title),
    $("#descMeme").val(m.description),
    $("#dateMeme").val(m.year),
    $("#urlMeme").val(m.img_link),
    $("#idMeme").val(m.id)
  }

  $("#memes").on("click", getMemes);
  $("#question").on("click", quizz);
  $("#add").on("click", memeLayout);

  function memeLayout(isnew){
    refreshPage();
    $("#content")
      .append($('<form class="memeAdder" id="formMeme" method="POST">')
        .append($('<div class="row m-3 mx-auto justify-content-center">')
          .append($('<div class="col-lg-6 col-sm-12 p-1">')
            .append($('<input class="form-control" type="text" id="nameMeme" value="" placeholder="Name of the meme" required>'))
          )
          .append($('<div class="col-lg-6 col-sm-12 p-1">')
            .append($('<input class="form-control" type="date" id="dateMeme" value="" required>'))
          )
          .append($('<div class="col-12 p-1">')
            .append($('<input class="form-control" type="url" id="urlMeme" value="" placeholder="URL for the image of the meme" required>'))
          )
          .append($('<div class="col-12 p-1">')
            .append($('<textarea rows="3" class="form-control" id="descMeme" form="formMeme" value="" placeholder="Enter description of the meme" required></textarea>'))
          )
          .append($('<div class="col-lg-2 col-sm-6 p-1">')
            .append(isnew?$('<input class="form-control" type="submit" value="Add">')
                         :$('<input class="form-control" type="submit" value="Save">')
            )
          )
          .append($('<input type="hidden" id="idMeme">'))
        )
      );
      $("#formMeme").submit(function( event ) {event.preventDefault();
                                              isnew?adder()
                                              :modify();
                                              })
    }

  function questionAddLayout(isnew){
    refreshPage();
    $("#content")
      .append($('<form class="questionAdder" id="formQuestion" method="POST">')
        .append($('<div class="row m-3 mx-auto justify-content-center">')
          .append($('<div class="col-lg-6 col-sm-12 p-1">')
            .append($('<input class="form-control" type="text" id="entitled" value="" placeholder="Entitled of question" required>'))
          )
          .append($('<div class="col-lg-6 col-sm-12 p-1">')
            .append($('<select class="form-control" id="type"><option value="string_qu">Text Question</option><option value="img_qu">Image Question</option><select>')
              .on("change", function() {
                $("#answer").empty();
                if ($("#type").val() == "string_qu") {
                  $("#answer").append($('<input class="form-control" type="text" id="rep" value="" placeholder="Response" required>')); }
                else {
                  $("#answer").append($('<select class="form-control" id="rep" value="" required>'));
                  allMemes(); }})
              )
          )
          .append($('<div id="answer" class="col-12 p-1">')
            .append($('<input class="form-control" type="text" id="rep" value="" placeholder="Response" required>'))
          )
          .append($('<div class="col-lg-2 col-sm-6 p-1">')
            .append(isnew?$('<input class="form-control" type="submit" value="Add">')
                         :$('<input class="form-control" type="submit" value="Save">')
            )
          )
          .append($('<input type="hidden" id="idMeme">'))
        )
      );
      $("#formQuestion").submit(function( event ) {event.preventDefault();
                                              adderQuestion();
                                              })
  }

  function allMemes() {
    fetch("http://localhost:3000/memes/")
    .then(response => {
      if (response.ok) {
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); })
      .then(optionMemes); }

  function optionMemes(memes) {
    for (let meme of memes) {
      $("#rep").append($('<option value="' + meme.id + '">' + meme.title + '</option>')); }}

  function questLayout(question){
    refreshPage();
    $("#content")
      .append($('<div class="row mx-auto h-100 text-center" id="center_div">')
        .append($('<h1 class="col-12">Question ' + (score + 1) + '</h1>'))
        .append($('<div class="col-12" id="quizz_question">'))
        .append($('<div class="col-12 justify-content-center" id="quizz_answer">'))
        .append($('<p class="col-12">Score ' + score + '</p>'))
      )
    $("#quizz_question")
      .append(question.entitled);
    if (question.type == "string_qu"){
      $("#quizz_answer")
        .append($('<input class="form-control" type="text" id="answer">'))
        .append($('<button class="btn btn-secondary col-lg-4 col-sm-6" id="validation">Validate !</button>').on("click", question, validateStr))
    }
    else{
      getImageFromId(question);
    }

  }

  function getImageFromId(question){
    global_meme_question = question;
    fetch("http://localhost:3000/memes/"+question.id_rep)
    .then(response => {
      if (response.ok) {
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); })
      .then(get3Aleat);
    }

  function get3Aleat(meme) {
    the3memes = [];
    global_answer_meme_final = meme;
    the3memes.push(meme);
    fetch("http://localhost:3000/memes/")
    .then(response => {
      if (response.ok) {
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); })
      .then(memes => {

        for (i = 0; i < 3; i++) {
        let m = memes[parseInt(Math.random() * memes.length)];
        while (m.id == meme.id) {
          m = memes[parseInt(Math.random() * memes.length)]; }
        the3memes.push(m); }})
        .then(addImage); }

  function addImage(){
    console.log('ALL MEMES');
    console.log(the3memes);
    the3memes.sort(function(a, b){ return 0.5 - Math.random() });
    for (let current_meme of the3memes) {
      $("#quizz_answer")
      .append($('<img class="col-lg-6 col-sm-12" src=' + current_meme.img_link + ' alt="" id="#answer">').on("click", current_meme, validateImg));
  }}

  function quizz() {
    refreshPage();
    $("#content")
      .append($('<div class="row mx-auto h-100">')
        .append($('<div class="col-12 text-right float-right">')
          .append($('<button type="button" id="ask" class="btn btn-secondary m-1 p-0">Proposer une question</button>').on("click", questionAddLayout))
        )
        .append($('<div class="col-12 text-center">')
          .append($('<h1>Commencer un quizz !</h1>'))
          .append($('<button type="button" id="propose" class="btn btn-secondary">Répondre à une question</button>').on("click", getQuestions))
        )
      )
  }

  function adderQuestion() {

    var qu = new Question(
      $("#type").val(),
      $("#entitled").val(),
      $("#rep").val(),
    );

      $.ajax({
          url: "http://localhost:3000/questions",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(qu),
          success: function(msg) {
            alert("Question ajoutée !");
            quizz(); },
          error: function(req, status, err) { alert("ERROR"); }});
        }

  function adder() {

    let meme = new Meme(
      $("#nameMeme").val(),
      $("#descMeme").val(),
      $("#dateMeme").val(),
      $("#urlMeme").val()
    );

      $.ajax({
          url: "http://localhost:3000/memes",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(meme),
          success: function(msg) {
            alert("Meme ajouté !");
            getMemes(1); },
          error: function(req, status, err) { alert("ERROR"); }});
        }

  function modify(){

    let meme = new M
    var qu = new Question(
      $("#type").val(),
      $("#entitled").val(),
      $("#rep").val(),
    );

      $.ajax(eme(
      $("#nameMeme").val(),
      $("#descMeme").val(),
      $("#dateMeme").val(),
      $("#urlMeme").val(),
      $("#idMeme").val()
    ));


      $.ajax({
          url: "http://localhost:3000/memes/"+meme.id,
          type: "PUT",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(meme),
          success: function(msg) {
            alert("Meme sauvegardé !");
            getMemes(1); },
          error: function(req, status, err) { alert("ERROR"); }});
        }

    function suppr(meme){

        $.ajax({
            url: "http://localhost:3000/memes/"+meme.id,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(meme),
            success: function(msg) {
              alert("Meme supprimé !");
              getMemes(1); },
            error: function(req, status, err) { alert("ERROR"); }});
          }


    function search() {
      // Declare variables
      var input, filter, deck, cards, c, i, txtValue;
      input = document.getElementById('searchbar');
      if(input != null){
        filter = input.value.toUpperCase();
        deck = document.getElementById("cardDeck");
        cards = deck.getElementsByClassName('carte');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < cards.length; i++) {
          c = cards[i].getElementsByTagName('div')[2].getElementsByClassName('card-title')[0];
          txtValue = c.textContent || c.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1 || input.value.replace(/\s/g, '').length == 0) {
            cards[i].style.display = "";
          }
          else {
            cards[i].style.display = "none";
          }
        }
      }
    }

  getMemes(1);


    function questAleat(){
      let qu = global_question[parseInt(Math.random()*global_question.length)];
      while ( qu in asked_question){
        qu = global_question[Math.random()*global_question.length];
      }
      asked_question.push(qu);
      questLayout(qu);
    }

    function validateStr(event) {
      if ($("#answer").val() == event.data.id_rep){
        score+=1;
        let qu = questAleat();
      }
      else{
          /* La défaite */
        console.log("PERDU");
      }
    }

    function validateImg(meme){
      console.log("CLICKED MEME");
      console.log(meme.data.id);
      console.log(global_answer_meme_final.id);
      if (meme.data.id == global_answer_meme_final.id){
        score+=1;
        let qu = questAleat();
      }
      else{
          /* La défaite */
        console.log("PERDU");
      }
    }
});
