import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { ViewMyDietPlanFoodTable } from './ViewMyDietPlanFoodTable.js';
import { Footer } from './Footer.js';
import { getDatabase, ref, onValue } from 'firebase/database';

export function ViewMyDietPlan(props) {

    // state variables
    const [date, setDate] = useState(new Date());
    const [foodItemDisplayArray, setFoodItemDisplayArray] = useState([]);
    // firebase AllBMIData state variable
    const [firebaseBMIData, setFirebaseBMIData] = useState(null);

    useEffect(() => {
        // what to do FIRST TIME the component loads

        // hook up listener for when a value changes
        const db = getDatabase();
        const AlladdedFoodDataRef = ref(db, "allAddedFoodData"); // refers to "allAddedFoodData" in the database


        const unregisterFunction = onValue(AlladdedFoodDataRef, (snapshot) => {
            const newValObj = snapshot.val();
            setFirebaseBMIData(newValObj); // keep a copy of firebase allAddedFoodData

            // need to convert obj into array in order to setFoodItemDisplayArray() 
            const keys = Object.keys(newValObj);
            const newObjArray = keys.map((keyString) => {
                return newValObj[keyString];
            })

            setFoodItemDisplayArray(newObjArray);
        })

        //cleanup function for when component is removed
        function cleanup() {
            unregisterFunction(); //call the unregister function
        }
        return cleanup; //effect hook callback returns the cleanup function
    }, [])

    let resultArr = []
    const viewMyDietPlanDate = date.toString().slice(0, 15);
    for (let i = 0; i < foodItemDisplayArray.length; i++) {
        if (foodItemDisplayArray[i].date == viewMyDietPlanDate) {
            resultArr.push(foodItemDisplayArray[i].addedFoodItem);
        }
    }

    return (
        <div>
            <section id="view-my-diet-plan" className="subsection-3">
                <h1>View My Diet Plan</h1>
                <div className="center">
                    <div className="flex-container-view">

                        {/* choice of date */}
                        <div className="flex-item-card-view">
                            <form>
                                <label htmlFor="view-plan-date">Date:</label>
                                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                            </form>
                        </div>

                        {/* displaying results */}
                        <div className="flex-item-card-view">
                            <h1>Results</h1>
                            <div className='foodtable'>
                                <ViewMyDietPlanFoodTable foodData={props.foodData} viewMyDietPlanDateFoodItemsArray={resultArr} firebaseBMIData={firebaseBMIData} />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}
