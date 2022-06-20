import React from 'react';
import { NavLink } from 'react-router-dom';

export function NavCards() {
    return (
        <div className="flex-container padding-nav-cards">

            {/* Navigation card for bmi calculator */}
            <div className="flex-item-card cards-color">    
                <NavLink className = "navlink" to="/bmicalculator">
                    <div>
                        <span className="material-icons md-48 center margin-card-title">calculate</span>
                    </div>
                    <p className="center">Calculate My BMI</p>
                </NavLink>
            </div>
            
            {/* Navigation card for make plan */}
            <div className="flex-item-card cards-color">
                <NavLink className = "navlink" to="/makeplan">
                    <div>
                        <span className="material-icons md-48 center margin-card-title">edit_calendar</span>
                    </div>
                    <p className="center">Make My Diet Plan</p>
                </NavLink>
            </div>

            {/* Navigation card for view plan */}
            <div className="flex-item-card cards-color">
                <NavLink className = "navlink" to="/viewplan">
                    <div>
                        <span className="material-icons md-48 center margin-card-title">calendar_month</span>
                    </div>
                    <p className="center">View My Diet Plan</p>
                </NavLink>
                </div>
            </div>
    )
}