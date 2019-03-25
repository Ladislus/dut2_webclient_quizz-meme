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

// async function getMemes(){
//   await $.ajax({
//     url: "http://localhost:3000/memes/",
//     type: "GET",
//     dataType: "json",
//     success: function(data){
//       let memes = JSON.parse(data);
//       fillMemes(memes);
//     },
//     error: function(err){
//       console.log(err);
//     }
//   })
// }
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
          .append($('<div class="col-lg-4 col-sm-6 p-2"><div class="card m-3 h-100"><div class="img-container d-flex align-items-center"><img class="card-img-top mx-auto" src="' + meme.img_link + '" alt="Card image cap"></div><div class="card-body"><h5 class="card-title">' + meme.title + '</h5><p id="desc" class="card-text">' + meme.description + '</p><p class="card-text">' + meme.year + '</p><a href="#" class="btn btn-primary">Modifier</a></div></div></div>'));
      }
  }

  $("#memes").on("click", getMemes);

});
