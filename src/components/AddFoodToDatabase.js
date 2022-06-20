import { React, useState } from 'react';
import { getDatabase, ref, push as firebasePush } from 'firebase/database';

/*
const EXAMPLE_FOODS = [
    { "Food": "Cows' milk", "Measure": "1 qt.", "Grams": "976", "Calories": "660", "Protein": "32", "Fat": "40", "Sat.Fat": "36", "Fiber": "0", "Carbs": "48", "Category": "Dairy products" },
    { "Food": "Milk skim", "Measure": "1 qt.", "Grams": "984", "Calories": "360", "Protein": "36", "Fat": "t", "Sat.Fat": "t", "Fiber": "0", "Carbs": "52", "Category": "Dairy products" },
];
*/

export function AddFoodToDatabase(props) {

    // state variable to track food item info user entered
    const [foodEntered, setFoodEntered] = useState(null);
    const [measureEntered, setMeasureEntered] = useState(null);
    const [gramsEntered, setGramsEntered] = useState(null);
    const [caloriesEntered, setCaloriesEntered] = useState(null);
    const [carbsEntered, setCarbsEntered] = useState(null);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);


    // callback function to handle Food change
    const handleFoodInputChange = function (event) {
        const enteredFoodValue = event.target.value;

        // disable button and display validation error message
        if (enteredFoodValue == null || enteredFoodValue == "" || enteredFoodValue == undefined) {
            event.target.setCustomValidity("Food item name cannot be empty.");
            setIsDisabled(true);
        } else {
            event.target.setCustomValidity("");
            setIsDisabled(false);
        }
        setErrorMessage(event.target.validationMessage);

        setFoodEntered(enteredFoodValue);
    }

    // callback function to handle Measure change
    const handleMeasureInputChange = function (event) {
        const enteredMeasureValue = event.target.value;
        setMeasureEntered(enteredMeasureValue);
    }

    // callback function to handle Calories change
    const handleCaloriesInputChange = function (event) {
        const enteredCaloriesValue = event.target.value;
        setCaloriesEntered(enteredCaloriesValue);
    }

    // callback function to handle Carbs change
    const handleCarbsInputChange = function (event) {
        const enteredCarbsValue = event.target.value;
        setCarbsEntered(enteredCarbsValue);
    }

    // callback function to handle Grams change
    const handleGramsInputChange = function (event) {
        const enteredGramsValue = event.target.value;
        setGramsEntered(enteredGramsValue);
    }

    // callback function to handle changes to the <select> element
    const handleSelectFoodCategoryChange = function (event) {
        const selectedValue = event.target.value;
        setSelectedFoodCategory(selectedValue);
    }

    // get food category names for options
    const uniqueCategories = [...new Set(props.foodData.map(food => food.Category))]

    const optionElems = uniqueCategories.map((category) => {
        return <option key={category} value={category}>{category}</option>
    })




    // save food item data to firebase realtime database
    const handleAddtoDatabaseClick = (event) => {
        event.preventDefault();

        const db = getDatabase();
        const newCustomizedFoodItemData = {
            Food: foodEntered,
            Measure: measureEntered,
            Grams: gramsEntered,
            Calories: caloriesEntered,
            Carbs: carbsEntered,
            Category: selectedFoodCategory
        }

         // cannot push to firebase if food name entered is empty
         if (foodEntered !== null || foodEntered !== "") {
            const allAddedCustomizedFoodData = ref(db, "allAddedCustomizedFoodData");
            firebasePush(allAddedCustomizedFoodData, newCustomizedFoodItemData);
        }
    }

    return (
        <div>
            <div className="flex-container-BMI">

                {/* Demo for adding food into database */}
                <div className="flex-item-card-BMI">

                    <h2>How to add customized food items to our database?</h2>
                    <h5 className="margin-BMI-form">Example Food Item Data Entry:</h5>
                    <label htmlFor="Food" className="margin-BMI-form">Food: </label>
                    <input readOnly type="text" id="Food" placeholder="Korean Bibimbap"
                        className="form-control" />

                    <label htmlFor="Measure" className="margin-BMI-form">Measure: </label>
                    <input readOnly type="text" id="Measure" placeholder="1 bowl"
                        className="form-control" />

                    <label htmlFor="Grams" className="margin-BMI-form">Grams: </label>
                    <input readOnly type="number" id="Grams" placeholder="864"
                        className="form-control" />

                    <label htmlFor="Calories" className="margin-BMI-form">Calories: </label>
                    <input readOnly type="number" id="Calories" placeholder="350"
                        className="form-control" />

                    <label htmlFor="Carbs" className="margin-BMI-form">Carbs: </label>
                    <input readOnly type="number" id="Carbs" placeholder="68"
                        className="form-control" />

                    <label htmlFor="food_category" className="margin-BMI-form">Food Category: </label>
                    <input readOnly type="number" id="Carbs" placeholder="Other"
                        className="form-control" />
                </div>

                {/* User input for adding food into database */}
                <div className="flex-item-card-BMI">
                    <form className="center">

                        <div className="form-group">
                            <label htmlFor="Food" className="margin-BMI-form">Food: </label>
                            <input type="text" id="Food" placeholder="Food Name"
                                className="form-control" onChange={handleFoodInputChange} />
                            <div className="error-message">{errorMessage}</div>

                            <label htmlFor="Measure" className="margin-BMI-form">Measure: </label>
                            <input type="text" id="Measure" placeholder="Measure"
                                className="form-control" onChange={handleMeasureInputChange} />

                            <label htmlFor="Grams" className="margin-BMI-form">Grams: </label>
                            <input type="number" id="Grams" placeholder="Grams"
                                className="form-control" onChange={handleGramsInputChange} />

                            <label htmlFor="Calories" className="margin-BMI-form">Calories: </label>
                            <input type="number" id="Calories" placeholder="Calories"
                                className="form-control" onChange={handleCaloriesInputChange} />

                            <label htmlFor="Carbs" className="margin-BMI-form">Carbs: </label>
                            <input type="number" id="Carbs" placeholder="Carbs"
                                className="form-control" onChange={handleCarbsInputChange} />

                            <label htmlFor="food_category" className="margin-BMI-form">Food Category: </label>
                            <select id="food_category" name="food_category"
                                value={selectedFoodCategory}
                                onChange={handleSelectFoodCategoryChange}>
                                <option value="">Show all food categories</option>
                                {optionElems}
                            </select>

                            <div className="center">
                                <button id="submitButton" type="submit" className="btn btn-warning"
                                    disabled={isDisabled}
                                    onClick={handleAddtoDatabaseClick}>Add This Food Item to Database</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

    )
}