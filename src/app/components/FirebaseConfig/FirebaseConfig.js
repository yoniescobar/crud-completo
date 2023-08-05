
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


function FirebaseConfig() {
    const firebaseConfig = {
        apiKey: "AIzaSyBg1sNyfge4WoFLSiv0U6AI30t1RoCxpqU",
        authDomain: "crud-agenda-cdbe4.firebaseapp.com",
        databaseURL: "https://crud-agenda-cdbe4-default-rtdb.firebaseio.com",
        projectId: "crud-agenda-cdbe4",
        storageBucket: "crud-agenda-cdbe4.appspot.com",
        messagingSenderId: "173584444497",
        appId: "1:173584444497:web:7494c033d539c08a439c70",
        measurementId: "G-8PS034X700"
      };
      
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default FirebaseConfig


