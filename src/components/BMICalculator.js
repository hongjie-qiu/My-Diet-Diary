import React, { useState, useEffect } from 'react';
import { Footer } from './Footer.js';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database';


export function BMICalculator(props) {
    // state variable to track the weight in kg user entered from the number input
    const [weightkgEntered, setweightkgEntered] = useState(null);

    // state variable to track the height in cm user entered from the number input
    const [heightcmEntered, setheightcmEntered] = useState(null);

    // date picker
    const [date, setDate] = useState(new Date());

    // state variables for chart 
    const [labelArray, setLabelArray] = useState([]);
    const [chartData, setChartData] = useState([]);

    // callback function to handle weight change
    const handleWeightInputChange = function (event) {
        const enteredWeightValue = event.target.value;
        setweightkgEntered(enteredWeightValue);
    }

    // callback function to handle height change
    const handleHeightInputChange = function (event) {
        const enteredHeightValue = event.target.value;
        setheightcmEntered(enteredHeightValue);
    }

    // BMI calculator interactivity:
    // state variable to track calculated BMI result
    const [BMIResult, setBMIResult] = useState("");

    // a callback function called calculateBMI()
    // BMI formula: [weight (kg) / height (cm) / height (cm)] x 10,000
    const calculateBMI = function (weightkg, heightcm) {
        const calculatedBMIresult = ((weightkg / heightcm / heightcm) * 10000).toFixed(1);
        setBMIResult(calculatedBMIresult);
    }

    // a click event handler callback that will be called 
    // whenever the form's `Calculate BMI` <button> element is clicked.
    const handleCalculateClick = function (event) {
        calculateBMI(weightkgEntered, heightcmEntered);
        event.preventDefault();
    }


    // firebase AllBMIData state variable
    const [firebaseBMIData, setFirebaseBMIData] = useState(null);

    useEffect(() => {
        // what to do FIRST TIME the component loads

        // hook up listener for when a value changes
        const db = getDatabase();
        const bmiResultRef = ref(db, "allBMIData"); // refers to "allBMIData" in the database

        // onValue() returns how to turn it back off
        //returns a function that will "unregister" (turn off) the listener
        const unregisterFunction = onValue(bmiResultRef, (snapshot) => {
            const newBMIVal = snapshot.val();
            setFirebaseBMIData(newBMIVal); // keep a copy of firebase allBMIData


            // need to convert obj into array in order to setLabelArray() and setChartData()
            if (newBMIVal !== null) {
                const keys = Object.keys(newBMIVal);
                const newObjArray = keys.map((keyString) => {
                    return newBMIVal[keyString];
                })

                function dateComparison(a, b) {
                    const date1 = new Date(a)
                    const date2 = new Date(b)

                    return date1 - date2;
                }

                const labelArrayforChart = newObjArray.map((obj) => {
                    return obj.date;
                })
                const labelArrayforChartSorted = labelArrayforChart.sort(dateComparison);
                setLabelArray(labelArrayforChartSorted);


                // sort data array based on label (date) array
                const dataArrayforChart = [];
                for (let i = 0; i < labelArrayforChartSorted.length; i++) {
                    for (let j = 0; j < newObjArray.length; j++) {
                        if (newObjArray[j].date == labelArrayforChartSorted[i]) {
                            dataArrayforChart.push(newObjArray[j].bmiResult);
                        }
                    }

                }
                setChartData(dataArrayforChart);
            } else {
                setLabelArray([]);
                setChartData([]);
            }
        })

        //cleanup function for when component is removed
        function cleanup() {
            unregisterFunction(); //call the unregister function
        }
        return cleanup; //effect hook callback returns the cleanup function
    }, [])


    const handleSubmitSaveData = (event) => {
        event.preventDefault();
        const db = getDatabase();
        const newData = {
            bmiResult: BMIResult,
            date: date.toString().slice(0, 15)
        }
        const allBMIData = ref(db, "allBMIData");
        firebasePush(allBMIData, newData);
    }

    // callback function to remove bmi data from firebase realtime database
    const handleSubmitRemoveData = (event) => {
        event.preventDefault();
        const db = getDatabase();

        const buttonValue = event.target.value;
        const buttonDateVal = buttonValue.split("&")[0];
        const buttonBMIVal = buttonValue.split("&")[1];

        if (firebaseBMIData !== null) {
            const firebaseBMIDataNew = []
            for (const [key, value] of Object.entries(firebaseBMIData)) {
                let obj = { uniqueKey: key };
                for (const [k, v] of Object.entries(value)) {
                    if (k == "bmiResult") {
                        obj.bmi = v;
                    } else if (k == "date") {
                        obj.date = v;
                    }
                }
                firebaseBMIDataNew.push(obj);
            }


            for (let i = 0; i < firebaseBMIDataNew.length; i++) {
                if (buttonBMIVal == firebaseBMIDataNew[i].bmi & buttonDateVal == firebaseBMIDataNew[i].date) {
                    const delUniqueKey = firebaseBMIDataNew[i].uniqueKey;
                    const delRefString = "allBMIData/" + delUniqueKey;
                    const delRef = ref(db, delRefString);
                    firebaseSet(delRef, null);
                }
            }
        }
    }

    const sortedBMIDataArray = [];
    for (let i = 0; i < labelArray.length; i++) {
        sortedBMIDataArray.push({
            date: labelArray[i],
            bmi: chartData[i],
            dateID: i + labelArray[i],
            bmiID: i + chartData[i],
            id: i,
            dateBMI: labelArray[i] + "&" + chartData[i]
        })
    }

    // map BMI data into tr elements for display
    const BMIDataDateRow = sortedBMIDataArray.map((obj) => {
        let trElems = <tr key={obj.id}>
            <td key={obj.dateID}>{obj.date}</td>
            <td key={obj.bmiID}>{obj.bmi}</td>
            <td key={obj}>
                <button
                    className="btn btn-outline-danger my-2 my-sm-0"
                    value={obj.dateBMI}
                    onClick={handleSubmitRemoveData}>
                    Remove
                </button>
            </td>
        </tr>;
        return trElems;
    })

    return (
        <div>
        <section id="calculate-my-BMI" className="subsection-1">
            <h1>Calculate My BMI</h1>
            <div className="flex-container-BMI">
                <div className="flex-item-card-BMI">
                    <form className="center">

                        <div className="form-group">
                            <label htmlFor="weight_kg" className="margin-BMI-form">Weight (kg): </label>
                            <input type="number" id="weight_kg" placeholder="weight in kg"
                                className="form-control" onChange={handleWeightInputChange} />

                            <label htmlFor="height_cm" className="margin-BMI-form">Height (cm): </label>
                            <input type="number" id="height_cm" placeholder="height in cm"
                                className="form-control" onChange={handleHeightInputChange} />

                            <div className="center">
                                <button id="submitButton" type="submit" className="btn btn-warning"
                                    onClick={handleCalculateClick}>Calculate BMI</button>
                            </div>

                            <div className="margin-BMI-form margin-BMI-form-2">
                                <label htmlFor="your_bmi" className="margin-BMI-form">Your BMI: </label>
                                <input readOnly type="text" id="your_bmi"
                                    value={BMIResult}
                                    placeholder="Your BMI"
                                    className="form-control" />

                                <DatePicker
                                    className="margin-BMI-form"
                                    selected={date}
                                    onChange={(date) => setDate(date)} //only when value has changed
                                />

                                <div className="center">
                                    <button id="submitButton" type="submit" className="btn btn-warning"
                                        onClick={handleSubmitSaveData}>Save Data</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="flex-item-card-BMI">

                    <Line data={{
                        labels: labelArray,
                        datasets: [
                            {
                                label: 'My BMI line graph',
                                data: chartData,
                            },
                        ],
                    }}
                        height={400}
                        width={400}
                        options={{ maintainAspectRatio: false }} />

                </div>

                <div className="flex-item-card-BMI">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>BMI data</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BMIDataDateRow}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <Footer />
        </div>
    )
}