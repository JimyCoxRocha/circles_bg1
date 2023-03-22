export const Config = {
    LSStorage: {
        CIRCLE_POSITION_ELEMENTS: "LS_POSITION_ELEMENTS",
        CIRCLES_SHOWN: "LS_CIRCLES_SHOWN",
        CIRCLES_REPEAT_SHOWS: "CIRCLES_REPEAT_SHOWS",
    },
    randomGeneration: {
        MAX_ITERATION: 150
    },
    database: {
        name: 'databasee'
    },
    circleConfig: {
        duration:15000, //ms
        showRecursive: true,
        minCirclesShow: 4,
        color: [
            "#d99445", 
            "#85C1E9",
            "#A3E4D7",
            "#D7BDE2",
            "#D6EAF8",
            "#F9E79F",
            "#A04000"
        ]
    }
}

export class Utils {
    
    static Sleep(milliseconds) {
        return new Promise(res => setTimeout(res, milliseconds));
    }
}