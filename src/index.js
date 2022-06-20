import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


//import COMMON_FOODS from './data/common_foods.json';
import "jquery/dist/jquery";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';

//import reportWebVitals from './reportWebVitals';
import 'whatwg-fetch';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1Qj5X5SmJxgxdZqCSVPTApb8GyXHufOk",
    authDomain: "mydietdiary-de3a4.firebaseapp.com",
    databaseURL: "https://mydietdiary-de3a4-default-rtdb.firebaseio.com",
    projectId: "mydietdiary-de3a4",
    storageBucket: "mydietdiary-de3a4.appspot.com",
    messagingSenderId: "291913595676",
    appId: "1:291913595676:web:1d1ac671f7d1f35b7a18d9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();