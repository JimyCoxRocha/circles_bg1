import { circleShowPosition } from "./randomGeneration.js";


const circle = document.querySelectorAll('div');

setInterval(() => {
    console.log(circleShowPosition);
    circle.forEach(function circle(myclass) {
        const [ top, left ] = circleShowPosition();
        myclass.style.top = top +"px";
        myclass.style.left = left +"px";
    });
}, 100);