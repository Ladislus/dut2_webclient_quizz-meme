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
    fetch("http://localhost:3000/questions/")
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error("ERROR : Fetching questions (" + response.status + ")"); }); }

  function getMemes() {
    fetch("http://localhost:3000/memes/")
    .then(response => {
      if (response.ok){
        console.log(response);
        return response.json(); }
        else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); })
      .then(fillMemes); }

  function fillMemes(memes){
    refreshPage();
    $("#content")
      .append($('<div id="cardDeck" class="row m-3 mx-auto justify-content-center">'));

      for(let meme of memes){
        console.log(meme);
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
                .append($('<a href="#" class="btn btn-primary">Modifier</a>').on("click", meme, details))
              )
            )
          );
      }
  }

  function details(event){
      refreshPage();
      //formTask();
      //fillFormTask(event.data);
      }

  $("#memes").on("click", getMemes);

});
