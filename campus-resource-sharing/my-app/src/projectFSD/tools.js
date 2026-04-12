
if(localStorage.getItem("userLoggedIn") != "true")
{
alert("Login first");
window.location.href="login.html";
}


function calc()
{

let marks = document.getElementById("marks").value;

let cgpa = marks / 9.5;

document.getElementById("result").innerHTML =
"CGPA = " + cgpa.toFixed(2);

}
