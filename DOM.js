const myBody = document.body;
console.log(myBody);
 const box2 = document.getElementById('box_2');
 console.log(box2);
 const divs = document.getElementsByClassName('p');
    console.log(divs);
    

//changing content and style without css or html
const box1 = document.getElementById('box_1');
box1.innerHTML = "hello lucky";
 box1.style.backgroundColor="red"

 const boxes = document.getElementsByClassName('box');
 for(let i=0;i<boxes.length;i++){
    boxes[i].classList.add('round-border');

 }
 const box3 = document.getElementById('box_3');
 box3.classList.toggle('round-border');
 console.log(box3.classList.contains('round-border'));
box3.classList.toggle('round-border');
    
 box1.classList.remove('round-border');

//creating new element
    // const newParagraph = document.createElement('p');
    // newParagraph.innerText = "I am a new paragraph";
    // newParagraph.classList.add('box');

    // const container = document.getElementById('container');
    // container.appendChild(newParagraph);

// Button alert
// const addBtn = document.getElementById('addBtn');
// addBtn.addEventListener('click', function() {
//     alert('Button clicked!');
// });

let dbl=document.querySelector('#dbl');
dbl.ondblclick = () => {
    console.log('used event  handler#1 function');alert('hello!');

};
 dbl.addEventListener('dblclick', () => {
    console.log('used event listener#2 function');alert('hello again!');
 });

 //event object demo
 let dbl1=document.querySelector('#dbl');
dbl1.onedblclick=(event) => {
    console.log('used event  handler#1 function');alert(`hello! Mouse at position ${event.clientX}, ${event.clientY}`); 
};
 

