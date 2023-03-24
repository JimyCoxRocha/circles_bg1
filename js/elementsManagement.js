import { circleShowPosition } from "./randomGeneration.js";
import { Config, Utils } from "../config/config.js";
import { LocalStorageBG } from "./localStorage.js";

const page = document.getElementById("page-container");
const CIRCULE_DURATION = Config.circleConfig.duration;
const LS_CIRCLES_ACTIVE = Config.LSStorage.CIRCLE_POSITION_ELEMENTS;
const LS_CIRCLES_SHOWN = Config.LSStorage.CIRCLES_SHOWN;
const TAMING_FUNCTION = Config.circleConfig.tamingFunction;
const COLORS = Config.circleConfig.color;
let tamingFunctionCircles = 0;

const createDivElement = (color) => {
    const divElement = document.createElement("div");
    divElement.className = "circle-style";
    divElement.style.backgroundColor = color
    divElement.style.border = "1px solid " + color;
    return divElement;
}

const createDivContainer = () => {
    /* 
        const max = 30;
        const min = 1; 
        const randomSize = 20 + Math.floor((Math.random() * max) + min) + "vh";
    */

    const divElement = document.createElement("div");
    divElement.className = "circle-container";
    divElement.style.width = "35vh";
    divElement.style.height = "35vh";
    
    return divElement;
}
const createDivStyle = (color) => {
    const divElement = document.createElement("div");
    divElement.className = "circle-shadow";
    
    
    return divElement;
}

const createTextCircle = (titleText, subText) => {
    const divElement = document.createElement("div");
    divElement.className = "text-container";
    const h1Element = document.createElement("h1");
    const h1TextNode = document.createTextNode(titleText);
    h1Element.appendChild(h1TextNode);
    
    const pElement = document.createElement("p");
    const pTextNode = document.createTextNode(subText);
    pElement.appendChild(pTextNode);
    
    
    divElement.appendChild(h1Element);
    divElement.appendChild(pElement);
    
    return divElement;
}


const handleCircleShown = (divElement, Height, Width) => {
    try {
        const minAnim = 25;
        const maxAnim = 28;
        const circlesShown = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_SHOWN) || "[]" );
        const dataa = document.getElementById(divElement.id);
        
        dataa.className = dataa.className + " circle-final-animation";
        //Math.random() * (max - min) + min;
        const durationAnim = Math.floor(Math.random() * ( maxAnim - minAnim) + minAnim);
        dataa.style.animation = "finalAnimation "+  durationAnim + "s " + TAMING_FUNCTION[tamingFunctionCircles] + " infinite"


        tamingFunctionCircles = tamingFunctionCircles + 1;
        if(tamingFunctionCircles >= Config.circleConfig.tamingFunction.length )
            tamingFunctionCircles = 0;

        LocalStorageBG.SetData(LS_CIRCLES_SHOWN, JSON.stringify(circlesShown));

        

    } catch (error) {
    }
}

//const elementsTran

const deleteElementTimer = (divElement, Height, Width) => {
    setTimeout(() => {
        try {
            const circlesActivate = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_ACTIVE) || "[]");
            const newCircles = circlesActivate.filter(x => { 
                return x.width !== Width && x.heigth !== Height
            });
            LocalStorageBG.SetData(LS_CIRCLES_ACTIVE, JSON.stringify(newCircles));
            
            

            handleCircleShown(divElement, Height, Width);
            
        } catch (error) {
            
        }
       
    }, (CIRCULE_DURATION));
    setTimeout(() => {
        try {
            const min = 0.30;
            const max = 0.50;
            const dataa = document.getElementById(divElement.id);

            dataa.style.opacity = (Math.random() * max) + min;
            
        } catch (error) {
            
        }
       
    }, (CIRCULE_DURATION - (CIRCULE_DURATION * 0.30)));
}

let colorCircles = 0;
const addNewElement  = async ({title, subtitle}) => {
    const divElement = createDivElement(COLORS[colorCircles]);

    const divContainerElement = createDivContainer();
    const divStyle = createDivStyle(COLORS[colorCircles]);
    const textCircle = createTextCircle(title, subtitle);
    colorCircles = colorCircles + 1;
    if(colorCircles >= Config.circleConfig.color.length )
        colorCircles = 0;

    const [ Height, Width ] = circleShowPosition();
    divElement.id = Height + "-" + Width;
    divContainerElement.style.top = Height +"px";
    divContainerElement.style.left = Width +"px";

    const storage = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_ACTIVE)) || [];
    storage.push({
        width: Width,
        heigth: Height
    });
    LocalStorageBG.SetData(LS_CIRCLES_ACTIVE, JSON.stringify(storage));
    deleteElementTimer(divElement, Height, Width);

    divStyle.appendChild(textCircle);
    divElement.appendChild(divStyle);
    divContainerElement.appendChild(divElement);
    page.appendChild(divContainerElement);
}

export default addNewElement;