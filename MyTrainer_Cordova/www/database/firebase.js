
var firebaseConfig = {
    apiKey: "AIzaSyAOI75Bd9hPU6quGdBzX9uS5eauefRpnzY",
    authDomain: "pw3-pam2-bd3-01.firebaseapp.com",
    databaseURL: "https://pw3-pam2-bd3-01.firebaseio.com",
    projectId: "pw3-pam2-bd3-01",
    storageBucket: "pw3-pam2-bd3-01.appspot.com",
    messagingSenderId: "272431978865",
    appId: "1:272431978865:web:91487e98644584408cbed0",
    measurementId: "G-K02BYV7CQH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
db = firebase.firestore();