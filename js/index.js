

import ElementManagement from "./elementsManagement.js";
import { fireRealtimeData } from "./firebaseManagement.js";


fireRealtimeData(async (detailObject) => {
    await ElementManagement(detailObject)
})
