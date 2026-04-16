function printchai(){
    console.log("Hello chai");
}

function bringBrush(itne){
    console.log(`Bring ${itne} brushes`);
}
function addTwo(ekdum,doNUm){
    return ekdum + doNUm;
}
bringBrush(4);
printchai();
addTwo(1,1);//this will not print anything beacause we are not using console.log here
console.log(addTwo(5,10));
