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
        name: '/'
    },
    circleConfig: {
        duration:5000, //ms
        showRecursive: true,
        minCirclesShow: 4,
        color: [
            "#ffffff"
        ],
        tamingFunction: [
            "ease",
            "cubic-bezier(0,-0.01,1,1.01)",
            "cubic-bezier(0,-0.01,1,1.01)",
            "cubic-bezier(0,-0.01,1,1.01)",
            "linear",
        ]
    }
}

export class Utils {
    
    static Sleep(milliseconds) {
        return new Promise(res => setTimeout(res, milliseconds));
    }
}