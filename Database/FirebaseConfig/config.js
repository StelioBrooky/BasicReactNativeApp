// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";


// My Firebase configuration
function StartDB() {
    const firebaseConfig = {
        apiKey: "AIzaSyCxRcf-YVfIVSXyBv7dtjhBoHy-rCI9upk",
        authDomain: "reptile-resource-nz.firebaseapp.com",
        databaseURL: "https://reptile-resource-nz-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "reptile-resource-nz",
        storageBucket: "reptile-resource-nz.appspot.com",
        messagingSenderId: "1087595225645",
        appId: "1:1087595225645:web:21340a654cf282f13c4ea4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}

export default StartDB;