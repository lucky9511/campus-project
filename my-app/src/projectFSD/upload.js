
if(localStorage.getItem("userLoggedIn") != "true")
{
alert("Login first");
window.location.href="login.html";
}


function upload()
{

let title = document.getElementById("title").value;

let type = document.getElementById("type").value;


document.getElementById("msg").innerHTML =
type + " uploaded successfully ✔";

}
