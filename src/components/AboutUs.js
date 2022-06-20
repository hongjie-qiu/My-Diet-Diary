import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './Footer.js';

export function AboutUs() {
  return (
    <div>
      {/* About us section: introducing the project */}
      <div className="about-section">
        <h1>About Us</h1>
        <div className='about-p'>
          <p> Hello! We are a group of students taking INFO 340 (Client-Side Development), and MyDietDiary is our team project. </p>
          <p> Our group decided to focus on tracking BMI data and diet plans because we noticed that people's eating </p>
          <p> habits in modern days lack specific categories of food, with mostly only fat, starch, and sugar for a meal. </p>
          <p> Busy schedules also lead to people eating on the run, which results in poor nutritional intake. </p>
          <p> We hope MyDietDiary will help users achieve a healthier lifestyle by monitoring BMI results </p>
          <p> and tracking daily food intake. </p>
        </div>
      </div>

      {/* Features section: introducing the functionalities */}
      <div className="feature-section">
        <div className="row">

          {/* Feature 1 - Calculate &amp; Track BMI */}
          <div className="column">
            <div className="card">
              <div className="container">
                <h2>Feature 1 - Calculate &amp; Track BMI</h2>
                <p>You can caculate your BMI by providing your weight and height. </p>
                <p>Your BMI will be recorded and shown in a trending chart! </p>
              </div>
            </div>
          </div>

          {/* Feature 2 - Make Diet Plan */}
          <div className="column">
            <div className="card">
              <div className="container">
                <h2>Feature 2 - Make Diet Plan</h2>
                <p>You can add the food items into your diet plan with a date. </p>
                <p>The search food and filter food catogery functions can help you find the results quickly.</p>
                <p>If your desired food does not exist in the database, you can customize one using "adding food to database" button!</p>
              </div>
            </div>
          </div>

          {/* Feature 3 - View Diet Plan */}
          <div className="column">
            <div className="card">
              <div className="container">
                <h2>Feature 3 - View Diet Plan</h2>
                <p>You can view your added food items based on selected date. </p>
                <p>All information regarding the food items will be displayed.</p>
                <p>If you have accidently added wrong items, you have the option to remove them from your plan!</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Team section: introducing team members */}
      <div className="team-section">
        <h2>Our Team</h2>
        <div className="row">

          {/* Member card for Wen */}
          <div className="column">
            <div className="card">
              <img src={require("../img/wenchen.jpg")} alt="Wen Chen" className="about-member-img"></img>
              <div className="container">
                <h2>Wen Chen</h2>
                <p className="title">Team Leader</p>
                <p>Junior - Informatics</p>
              </div>
            </div>
          </div>

          {/* Member card for Kelly */}
          <div className="column">
            <div className="card">
              <img src={require("../img/kellywang.jpeg")} alt="Kelly Wang" className="about-member-img"></img>
              <div className="container">
                <h2>Kelly Wang</h2>
                <p className="title">Web Developer</p>
                <p>Junior - Informatics</p>
              </div>
            </div>
          </div>

          {/* Member card for Yifan */}
          <div className="column">
            <div className="card">
              <img src={require("../img/yifanwang.jpg")} alt="Yifan Wang" className="about-member-img"></img>
              <div className="container">
                <h2>Yifan Wang</h2>
                <p className="title">Web Designer</p>
                <p>Junior - Informatics</p>
              </div>
            </div>
          </div>

          {/* Member card for Jeffrey */}
          <div className="column">
            <div className="card">
              <img src={require("../img/jeffreyqiu.jpg")} alt="Jeffrey Qiu" className="about-member-img"></img>
              <div className="container">
                <h2>Jeffrey Qiu</h2>
                <p className="title">Web Developer</p>
                <p>Junior - Informatics</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  )
}
