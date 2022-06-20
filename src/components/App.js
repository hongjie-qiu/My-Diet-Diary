import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

import { AboutUs } from './AboutUs.js';
import { Home } from './Home.js';
import { NavBar } from './NavBar.js';
import { Routes, Route } from 'react-router-dom';
import { BMICalculator } from './BMICalculator.js';
import { MakeMyDietPlan } from './MakeMyDietPlan.js';
import { ViewMyDietPlan } from './ViewMyDietPlan.js';
import { AddFoodToDatabase } from './AddFoodToDatabase.js'

function App(props) {

    const [addedCustomizedFoodArray, setAddedCustomizedFoodArray] = useState([]);

    // get added customized food data from firebase
    useEffect(() => {
        // what to do FIRST TIME the component loads

        // hook up listener for when a value changes
        const db = getDatabase();
        const allAddedCustomizedFoodData = ref(db, "allAddedCustomizedFoodData"); // refers to "allAddedCustomizedFoodData" in the database
   

        const unregisterFunction = onValue(allAddedCustomizedFoodData, (snapshot) => {
			const newValObj = snapshot.val();
			
			// need to convert obj into array in order to setFoodItemDisplayArray() 
			const keys = Object.keys(newValObj);
			const newObjArray = keys.map((keyString) => {
				return newValObj[keyString];
			})

			setAddedCustomizedFoodArray(newObjArray);
        })
    
        //cleanup function for when component is removed
        function cleanup() {
          unregisterFunction(); //call the unregister function
        }
        return cleanup; //effect hook callback returns the cleanup function
      }, [])


      const [stateData, setStateData] = useState([]);

      // AJAX
      useEffect(() => {
        fetch('./data/common_foods.json') //send AJAX request
          .then((response) => response.json())
          .then((data) => {
            setStateData(data) //assign data to state
          })
          .catch((error) => {
            console.log("Error Reading data: " + error);
          })

      }, [])

      const combinedFoodData = stateData.concat(addedCustomizedFoodArray);

    

    return (
        <div>
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="bmicalculator" element={<BMICalculator />} />
                <Route path="makeplan" element={<MakeMyDietPlan foodData={combinedFoodData}/>} />
                <Route path="viewplan" element={<ViewMyDietPlan foodData={combinedFoodData}/>} />
                <Route path="add-food-to-database" element={<AddFoodToDatabase foodData={combinedFoodData} />} />
                <Route path='*' element={<Home foodData={props.foodData} />} />
            </Routes>
            
        </div>
    )
}

export default App;