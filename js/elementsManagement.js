import { circleShowPosition } from "./randomGeneration.js";
import { Config, Utils } from "../config/config.js";
import { LocalStorageBG } from "./localStorage.js";

const page = document.getElementById("page-container");
const CIRCULE_DURATION = Config.circleConfig.duration;
const LS_CIRCLES_ACTIVE = Config.LSStorage.CIRCLE_POSITION_ELEMENTS;
const LS_CIRCLES_SHOWN = Config.LSStorage.CIRCLES_SHOWN;
const LS_CIRCLES_REPEAT_SHOWS = Config.LSStorage.CIRCLES_REPEAT_SHOWS;
const MIN_CIRCLES_TO_SHOW = Config.circleConfig.minCirclesShow;
const COLORS = Config.circleConfig.color;

const createDivElement = (color) => {
    const divElement = document.createElement("div");
    divElement.className = "circle-style";
    divElement.style.backgroundColor = color
    divElement.style.boxShadow = "0px 0px 10px 2px " + color;
    divElement.style.border = "1px solid " + color;
    return divElement;
}

const createDivContainer = () => {
    const max = 30;
    const min = 1;

    const divElement = document.createElement("div");
    divElement.className = "circle-container";
    const randomSize = 20 + Math.floor((Math.random() * max) + min) + "vh";
    divElement.style.width = randomSize;
    divElement.style.height = randomSize;
    
    return divElement;
}
const createDivStyle = (color) => {
    const divElement = document.createElement("div");
    divElement.className = "circle-shadow";
    
    divElement.style.boxShadow = "0px 0px 10px 2px " + color;
    
    return divElement;
}

const createTextCircle = (titleText, subText) => {
    debugger;
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

setInterval(() => {
    try {
        const circlesActivate = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_ACTIVE) || "[]");
        const circlesShown = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_SHOWN) || "[]" );
        const circlesRepeatShows = Number(LocalStorageBG.GetData(LS_CIRCLES_REPEAT_SHOWS) || "0");

        if(circlesActivate.length >= MIN_CIRCLES_TO_SHOW || circlesRepeatShows >= MIN_CIRCLES_TO_SHOW || circlesShown.length === 0
            || (circlesRepeatShows + 1) > circlesShown.length ) 
            return;
        
        

        const showList = document.getElementsByClassName("circle-style");
        for (var i = 0; i < showList.length; i++) {
            if(showList[i].style.display == "none"){
                const idSplit = showList[i].id.split("-");
                showList[i].style.display = "unset";
                deleteCirclesShownTimer(showList[i], Number(idSplit[0]), Number(idSplit[1]) );
                LocalStorageBG.SetData(LS_CIRCLES_REPEAT_SHOWS, circlesRepeatShows + 1);
                break;
            }
        }

    } catch (error) {
    }

}, 2000);

const deleteCirclesShownTimer = (divElement, Height, Width) => {
    setTimeout(() => {
        divElement.style.display = "none";

        try {            
            const circlesRepeatShows = Number(LocalStorageBG.GetData(LS_CIRCLES_REPEAT_SHOWS) || "0");
            if(circlesRepeatShows > 0){
                LocalStorageBG.SetData(LS_CIRCLES_REPEAT_SHOWS, circlesRepeatShows - 1);
            }

            let circlesShown = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_SHOWN) || "[]" );

            const dataa = document.getElementById(divElement.id);

            const [ NewHeight, NewWidth ] = circleShowPosition();


            circlesShown = circlesShown.filter(element => {
                if(element.width === Width && element.heigth === Height)
                    return false;
                return true;
                
            })
            circlesShown.push({
                width: Width,
                heigth: Height
            });
                
            const parent = dataa.parentNode;
            //dataa.id = Height + "-" + Width;
            parent.style.top = NewHeight +"px";
            parent.style.left = NewWidth +"px";


            
            LocalStorageBG.SetData(LS_CIRCLES_SHOWN, JSON.stringify(circlesShown));
            
        } catch (error) {
        }
        
    }, CIRCULE_DURATION);
}

const handleCircleShown = (divElement, Height, Width) => {
    try {
        const circlesShown = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_SHOWN) || "[]" );
        
        const dataa = document.getElementById(divElement.id);
        dataa.style.display = "none";

        


        const [ NewHeight, NewWidth ] = circleShowPosition();

        const parent = dataa.parentNode;
        //dataa.id = Height + "-" + Width;
        parent.style.top = NewHeight +"px";
        parent.style.left = NewWidth +"px";

        circlesShown.push({
            width: Width,
            heigth: Height
        });

        LocalStorageBG.SetData(LS_CIRCLES_SHOWN, JSON.stringify(circlesShown));

        

    } catch (error) {
    }
}


const deleteElementTimer = (divElement, Height, Width) => {
    setTimeout(() => {
        divElement.style.display = "none";
        try {
            const circlesActivate = JSON.parse(LocalStorageBG.GetData(LS_CIRCLES_ACTIVE) || "[]");
            const newCircles = circlesActivate.filter(x => { 
                return x.width !== Width && x.heigth !== Height
            });
            LocalStorageBG.SetData(LS_CIRCLES_ACTIVE, JSON.stringify(newCircles));
            
            

            handleCircleShown(divElement, Height, Width);
            
        } catch (error) {
            
        }
       
    }, CIRCULE_DURATION);
}

let colorCircles = 0;
const addNewElement  = async (detailObject) => {
    console.log(Config.circleConfig.color.length);
    const divElement = createDivElement(COLORS[colorCircles]);

    const divContainerElement = createDivContainer();
    debugger;
    const divStyle = createDivStyle(COLORS[colorCircles]);
    const textCircle = createTextCircle("Peloteo", "chao");
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