import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, onValue, get, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import { Config, Utils } from "../config/config.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsxWtJaox9mU4tDUm6qLZvdj5-9yNMmGs",
    authDomain: "reinvention-7dce9.firebaseapp.com",
    databaseURL: "https://reinvention-7dce9-default-rtdb.firebaseio.com",
    projectId: "reinvention-7dce9",
    storageBucket: "reinvention-7dce9.appspot.com",
    messagingSenderId: "108205719564",
    appId: "1:108205719564:web:b60cebcea17a5e0e71ee29"
};
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let circlesSleepFirstSession = 0;


export const fireRealtimeData = async (callback)  => {
    const dbRef  = ref(database, Config.database.name);
    let firstTotalDataCount = 0;
    

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
            setTimeout(async () => {
                console.log("tiemeout");
                const data = snapshot.val();
                if(data.nombreGrupo){
                    let groupName = "";
                    try {
                        groupName = data.nombreGrupo.length >= 30 ? data.nombreGrupo.trim().substring(0, 27) + "..." : data.nombreGrupo;
                    } catch (error) {
                        groupName = data.nombreGrupo;
                    }
                    await callback({
                        title: groupName,
                        subtitle: data.nombreOrigen || ""
                    })
                }
            }, 2000 * circlesSleepFirstSession);
        }else{
            const data = snapshot.val();
            if(data.nombreGrupo){
                let groupName = "";
                try {
                    groupName = data.nombreGrupo.length >= 30 ? data.nombreGrupo.trim().substring(0, 27) + "..." : data.nombreGrupo;
                } catch (error) {
                    groupName = data.nombreGrupo;
                }
                await callback({
                    title: groupName,
                    subtitle: data.nombreOrigen || ""
                })
            }
        }
        
    });
}