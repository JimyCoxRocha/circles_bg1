import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, onValue, get, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import { Config, Utils } from "../config/config.js";

const firebaseConfig = {
    apiKey: "AIzaSyAdLpM6P1Qn9R_dQmnb_dvp19lZv5-mA6A",
    authDomain: "bg-test-df800.firebaseapp.com",
    databaseURL: "https://bg-test-df800-default-rtdb.firebaseio.com",
    projectId: "bg-test-df800",
    storageBucket: "bg-test-df800.appspot.com",
    messagingSenderId: "805694285036",
    appId: "1:805694285036:web:1ee4dbff91e23bf5d231c9"
};
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



export const fireRealtimeData = async (callback)  => {
    const dbRef  = ref(database, Config.database.name);
    let firstTotalDataCount = 0;
    let circlesSleepFirstSession = 0;

    try {
        const firstTotalData = await get(dbRef).then((snapshot) => {
            
            return snapshot.exists() ? snapshot.val() : 0;
          }).catch(() => {
            return 0
          });
        firstTotalDataCount = Object.keys(firstTotalData).length;
    } catch (error) {
        firstTotalDataCount = 0;
    }

    
    return onChildAdded(dbRef, async (snapshot) => {
        circlesSleepFirstSession += 1;
        if(circlesSleepFirstSession < firstTotalDataCount){
            await Utils.Sleep(1000 * circlesSleepFirstSession)
        }
        
        const data = snapshot.val();
        await callback({
            title: data.CircleName,
            subtitle: data.CreatorName
        })
    });
}