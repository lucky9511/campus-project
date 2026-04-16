
// check login first
if(localStorage.getItem("userLoggedIn") != "true")
{
alert("Please login first");
window.location.href="login.html";
}


// load books
fetch("../public/books.json")

.then(res => res.json())

.then(data => {

let container = document.getElementById("booksContainer");

data.forEach(book => {

container.innerHTML += `

<div class="card">

<h3>${book.title}</h3>

<p>${book.author}</p>

<button>Download</button>

</div>

`;

});

});


// load notes
fetch("../public/notes.json")

.then(res => res.json())

.then(data => {

let container = document.getElementById("notesContainer");

data.forEach(note => {

container.innerHTML += `

<div class="card">

<h3>${note.title}</h3>

<p>${note.subject}</p>

<button>Download</button>

</div>

`;

});

});
