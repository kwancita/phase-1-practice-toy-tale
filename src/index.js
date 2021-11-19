let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//variable
const base_URL = "http://localhost:3000/toys";
const collection = document.querySelector("#toy-collection");



//evenListener
const toyForm = document.querySelector('.container')
toyForm.addEventListener('submit',handleSubmit);

//handleSubmit()
function  handleSubmit(event){
  event.preventDefault()
  let newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  } 
  renderToy(newToyObj)
  addNewToy(newToyObj)
}

//toy render
function renderToy(toy){
  console.log(toy)
  //create element
  const card = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const btn = document.createElement("button")
  //add attribute
  card.className = "card";
  h2.textContent = toy.name;
  img.src = toy.image;
  p.textContent = `${toy.likes} Likes`;
  btn.textContent = "Like";
  btn.className = "like-btn";
  btn.id = toy.id;
  //append
  card.append(h2,img,p,btn)
  collection.append(card);

  card.querySelector('.like-btn').addEventListener('click',() => {
    p.textContent = `${++toy.likes} Likes`
    updateLikes(toy)
  })
}


//create all toy info
function getAllToy(){
fetch(base_URL)
.then((res) => res.json())
.then((toyData) => toyData.forEach(toy => renderToy(toy)))
}

//add new toy
function addNewToy(newToyObj){
  fetch(base_URL,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"},
    body: JSON.stringify(newToyObj)
  })
  .then((res) => res.json())
  .then(newToy => console.log(newToy))
}

function updateLikes(newToyObj){
  fetch(`${base_URL}/${newToyObj.id}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(newToy  => console.log(newToy))
}

function initialize(){
  getAllToy()
}

initialize()








