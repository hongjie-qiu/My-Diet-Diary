import React from 'react';
import { getDatabase, ref, set as firebaseSet } from 'firebase/database';

/*
const EXAMPLE_FOODS = [
    { "Food": "Cows' milk", "Measure": "1 qt.", "Grams": "976", "Calories": "660", "Protein": "32", "Fat": "40", "Sat.Fat": "36", "Fiber": "0", "Carbs": "48", "Category": "Dairy products" },
    { "Food": "Milk skim", "Measure": "1 qt.", "Grams": "984", "Calories": "360", "Protein": "36", "Fat": "t", "Sat.Fat": "t", "Fiber": "0", "Carbs": "52", "Category": "Dairy products" },
];
*/

export function ViewMyDietPlanFoodTable(props) {
    const firebaseBMIData = props.firebaseBMIData;

    // callback function to remove bmi data from firebase realtime database
    const handleRemoveData = (event) => {
        event.preventDefault();
        const db = getDatabase();
        const buttonFoodNameValue = event.target.value;

        if (firebaseBMIData !== null) {
            const firebaseBMIDataNew = []
            for (const [key, value] of Object.entries(firebaseBMIData)) {
                let obj = { uniqueKey: key };
                for (const [k, v] of Object.entries(value)) {
                    if (k == "addedFoodItem") {
                        obj.foodName = v;
                    } else if (k == "date") {
                        obj.date = v;
                    }
                }
                firebaseBMIDataNew.push(obj);
            }

            for (let i = 0; i < firebaseBMIDataNew.length; i++) {
                if (buttonFoodNameValue == firebaseBMIDataNew[i].foodName) {
                    const delUniqueKey = firebaseBMIDataNew[i].uniqueKey;
                    const delRefString = "allAddedFoodData/" + delUniqueKey;
                    const delRef = ref(db, delRefString);
                    firebaseSet(delRef, null);
                }
            }
        }
    }

    // for displaying saved food item data
    const displayDataFunction = function () {
        const displayedData = props.foodData.filter((row) => {
            let result = false;
            if (props.viewMyDietPlanDateFoodItemsArray.includes(row.Food)) {
                result = true;
            }
            return result;
        });
        return displayedData;
    }

    const displayData = displayDataFunction();

    // convert data into rows
    const rows = displayData.map((food_item, index) => {
        return <FoodDataRow key={index}
            food={food_item}
            date={props.date}
            handleRemoveDataCallBack={handleRemoveData} />
    });

    let columnNamesArray = ['Food', 'Measure', 'Grams', 'Calories', 'Protein', 'Fat', 'Sat.Fat', 'Fiber', 'Carbs', 'Category'];

    return (
        <div>

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>{columnNamesArray[0]}</th>
                        <th>{columnNamesArray[1]}</th>
                        <th>{columnNamesArray[2]}</th>
                        <th>{columnNamesArray[3]}</th>
                        <th>{columnNamesArray[8]}</th>
                        <th className='category'>{columnNamesArray[9]}</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>

    )
}

function FoodDataRow({ food, handleRemoveDataCallBack }) { //food = props.food

    return (
        <tr>
            <td>{food.Food}</td>
            <td>{food.Measure}</td>
            <td>{food.Grams}</td>
            <td>{food.Calories}</td>
            <td>{food.Carbs}</td>
            <td className='category'>{food.Category}</td>
            <td>
                <div>
                    <button className="btn btn-outline-danger my-2 my-sm-0"
                        type="submit" value={food.Food} onClick={handleRemoveDataCallBack}>Remove</button>
                </div>
            </td>
        </tr>
    );
}
