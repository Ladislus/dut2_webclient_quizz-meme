$(function() {

  function Meme(title, description, year, img_link) {
    this.title = title;
    this.description = description;
    this.year = year;
    this.img_link = img_link; }

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
    $("#content").append($('<div id="cardDeck" class="row m-3 mx-auto justify-content-center">'));

    for(let meme of memes) {
      $("#cardDeck").append($('<div class="col-lg-4 col-sm-6 p-2"><div class="card m-3 h-100"><div class="img-container d-flex align-items-center"><img class="card-img-top mx-auto" src="' + meme.img_link + '" alt="Card image cap"></div><div class="card-body"><h5 class="card-title">' + meme.title + '</h5><p id="desc" class="card-text">' + meme.description + '</p><p class="card-text">' + meme.year + '</p><a href="#" class="btn btn-primary">Modifier</a></div></div></div>')); }}

  $("#memes").on("click", getMemes);
  $("#add").on("click", memeLayout);

  function memeLayout(){
    refreshPage();
    $("#content").append($('<form class="memeAdder" id="formMeme" method="POST"><div class="row m-3 mx-auto justify-content-center"><div class="col-lg-6 col-sm-12 p-1"><input class="form-control" type="text" id="nameMeme" value="" placeholder="Name of the meme" required></div><div class="col-lg-6 col-sm-12 p-1"><input class="form-control" type="date" id="dateMeme" value="" required></div><div class="col-12 p-1"><input class="form-control" type="url" id="urlMeme" value="" placeholder="URL for the image of the meme" required></div><div class="col-12 p-1"><textarea rows="3" class="form-control" id="descMeme" form="formmeme" value="" placeholder="Enter description of the meme" required></textarea></div><div class="col-lg-2 col-sm-6 p-1"><input class="form-control" type="submit" name="confirmMemeAdd" value="Confirm"></div></div></form>'));
    adder(); }

  function adder() {
    $("#formMeme").on("submit", function(e) {
      let name = $("#nameMeme").val();
      let desc = $("#descMeme").val();
      let date = $("#dateMeme").val();
      let url = $("#urlMeme").val();

      console.log(name);
      console.log(desc);
      console.log(date);
      console.log(url);

      let meme = new Meme(name, desc, date, url);
      console.log(JSON.stringify(meme));

      $.ajax({
          url: "http://localhost:3000/memes",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(meme),
          success: function(msg) {
            alert("Meme sauvegardé !");
            getMemes(); },
          error: function(req, status, err) { alert("ERROR"); }});
      e.preventDefault(); }); }


  getMemes();

});
