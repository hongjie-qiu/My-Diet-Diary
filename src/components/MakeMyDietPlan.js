import React, { useState } from 'react';
import { FoodTable } from './FoodTable.js';
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';


export function MakeMyDietPlan(props) {

    // state variable to track search query, set search query to empty string
    const [queryValue, setQueryValue] = useState("");
    // state variable to track food category, set food category to empty string
    const [selectedFoodCategory, setSelectedFoodCategory] = useState("");

    // callback function to handle queryValue change
    const getSearchInputValue = function (event) {
        const enteredQueryValue = event.target.value;
        setQueryValue(enteredQueryValue);
    }

    // callback function to handle changes to the <select> element
    const handleSelectFoodCategoryChange = function (event) {
        const selectedValue = event.target.value;
        setSelectedFoodCategory(selectedValue);
    }

    // for displaying filtered common food data
    const displayedData = props.foodData.filter((row) => {
        let result = false;
        if (queryValue === '') {
            if (row.Category === selectedFoodCategory) {
                result = true;
            } else if (selectedFoodCategory === "") {
                result = true;
            }
        } else if (selectedFoodCategory !== "") {
            if (row.Food.toLowerCase().includes(queryValue.toLowerCase()) && row.Category === selectedFoodCategory) {
                result = true;
            }
        } else if (selectedFoodCategory === "") {
            if (row.Food.toLowerCase().includes(queryValue.toLowerCase())) {
                result = true;
            }
        }
        return result;
    });

    // get food category names for options
    const uniqueCategories = [...new Set(props.foodData.map(food => food.Category))]

    const optionElems = uniqueCategories.map((category) => {
        return <option key={category} value={category}>{category}</option>
    })

    // date picker useState
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <section id="make-my-diet-plan" className="subsection-2">
                <h1>Make My Diet Plan</h1>
                <div className="center">
                    <div className="flex-container-make">

                        {/* Set date and filter */}
                        <div className="flex-item-card-make">
                            <form className="form-inline my-2 my-lg-0">
                                <ul className="make-my-diet-plan-ul">
                                    <li className="make-my-diet-plan-li">
                                        <label htmlFor="make-plan-date">Select Date: &nbsp; </label>
                                        <DatePicker className='datepicker' selected={date} onChange={(date) => setDate(date)} />
                                    </li>
                                    <li className="make-my-diet-plan-li">
                                        <label htmlFor="food-item-search">Search For a Food Item:</label>
                                        <input className="form-control mr-sm-2"
                                            onChange={getSearchInputValue}
                                            type="search"
                                            aria-label="Search" />
                                    </li>
                                    <li className="make-my-diet-plan-li">
                                        <label htmlFor="food_category">Select Food Category: </label>
                                        <select className="form-control mr-sm-2" id="food_category" name="food_category"
                                            value={selectedFoodCategory}
                                            onChange={handleSelectFoodCategoryChange}>
                                            <option value="">All</option>
                                            {optionElems}
                                        </select>
                                    </li>
                                </ul>
                            </form>
                        </div>

                        {/* Displaying results */}
                        <div className="flex-item-card-make">
                            <h1>Results</h1>
                            <div className='foodtable'>
                                <FoodTable data={displayedData} date={date} />
                            </div>
                        </div>

                        {/* Adding to database */}
                        <div className="flex-item-card-make">
                            <div className='addFood'>
                                <p className="center">Didn't Find The Food Item You Want?</p>
                                <NavLink to="/add-food-to-database">
                                    <button id="submitButton" type="submit" className="btn btn-outline-success my-2 my-sm-0">Add Food to Database</button>
                                </NavLink>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <footer>
                <p>Common food data collected from <a href="https://www.kaggle.com/datasets/niharika41298/nutrition-details-for-most-common-foods">here</a>.</p>
                <p>&copy; MyDietPlan 2022</p>
            </footer>
        </div>
    )
}
