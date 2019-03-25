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
      if (response.ok) return response.json();
      else throw new Error("ERROR ; Fetching memes (" + response.status + ")"); }); }

  $("#memes").on("click", getMemes);

  function addMemeElement(){
    refreshPage();
    $("#content").append($('<form class="memeAdder" action="index.html" method="post"><input type="text" name="nomMeme" value="" placeholder="Name of the meme"><input type="text" name="descMeme" value="" placeholder="Enter description of the meme"><input type="date" name="" value=""><input type="url" name="urlMeme" value="" placeholder="URL for the image of the meme"><input type="submit" name="" value="Confirm"></form>')); }

  function browseDictionnary(){}

  function prepareQuizz(){}
});
