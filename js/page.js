$(function() {

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
      else throw new Error("ERROR : Fetching questions (" + response.status + ")"); }); }

  function getMemes() {
    fetch("http://localhost:3000/memes/")
    .then(response => {
      if (response.ok) {
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); })
      .then(fillMemes); }

  function fillMemes(memes) {
    refreshPage();
    $("#content")
      .append($('<div id="cardDeck" class="row m-3 mx-auto justify-content-center">'));

    for(let meme of memes) {
      $("#cardDeck")
        .append($('<div class="col-lg-4 col-sm-6 p-2">')
          .append($('<div class="card m-3 h-100">')
            .append($('<div class="img-container d-flex align-items-center">')
              .append($('<img class="card-img-top mx-auto" src="' + meme.img_link + '" alt="Card image cap">'))
            )
            .append($('<div class="card-body">')
              .append($('<h5 class="card-title">' + meme.title + '</h5>'))
              .append($('<p id="desc" class="card-text">' + meme.description + '</p>'))
              .append($('<p class="card-text">' + meme.year + '</p>'))
              .append($('<a href="#" class="btn btn-primary">Modifier</a>')).on("click", meme, details)
            )
          )
        );
    }
  }

  function details(event){
      refreshPage();
      memeLayout();
      fillFormMeme(event.data);
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

  function quizz() {
    refreshPage();
    $("#content")
      .append($('<div class="row h-100">')
        .append($('<div class="col-12 text-right float-right">')
          .append($('<button type="button" id="ask" class="btn btn-secondary m-1 p-0">Proposer une question</button>'))
        )
        .append($('<div class="col-12 text-center">')
          .append($('<h1>Commencer un quizz !</h1>'))
          .append($('<button type="button" id="propose" class="btn btn-secondary">Répondre à une question</button>'))
        )
      )
  }

  function adder() {

    var meme = new Meme(
      $("#nameMeme").val(),
      $("#descMeme").val(),
      $("#dateMeme").val(),
      $("#urlMeme").val()
    );
      console.log(JSON.stringify(meme));

      $.ajax({
          url: "http://localhost:3000/memes",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(meme),
          success: function(msg) {
            alert("Meme ajouté !");
            getMemes(); },
          error: function(req, status, err) { alert("ERROR"); }});;
        }

  function modify(){

    var meme = new Meme(
      $("#nameMeme").val(),
      $("#descMeme").val(),
      $("#dateMeme").val(),
      $("#urlMeme").val(),
      $("#idMeme").val()
    );

      console.log(JSON.stringify(meme));

      $.ajax({
          url: "http://localhost:3000/memes/"+meme.id,
          type: "PUT",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(meme),
          success: function(msg) {
            alert("Meme sauvegardé !");
            getMemes(); },
          error: function(req, status, err) { alert("ERROR"); }});;
        }

  getMemes();

});
