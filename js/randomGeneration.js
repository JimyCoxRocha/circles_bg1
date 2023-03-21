

const availablePosition = () => {
    const heigth = window.innerHeight - 200;
    const width = window.innerWidth - 200;
    const randomHeigth = Math.floor(Math.random() * heigth);
    const randomWidth = Math.floor(Math.random() * width);
    return [randomHeigth, randomWidth];       
}





export const circleShowPosition = availablePosition;