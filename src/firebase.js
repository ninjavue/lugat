import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAGuH6yvfNgVXJNAkNQHHTg3KBAI1OPq2Y",
    authDomain: "test-2b287.firebaseapp.com",
    projectId: "test-2b287",
    storageBucket: "test-2b287.appspot.com",
    messagingSenderId: "912808914011",
    appId: "1:912808914011:web:39bec33b340576f7dae37e",
    measurementId: "G-EDBTF36CWM"
  };

  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);





