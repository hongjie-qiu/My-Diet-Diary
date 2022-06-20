import React from 'react';

export function Header() {
    return (
        <header>
            <h1 className="pageHeader">MyDietDiary</h1>
            <div className="intro flex-container-intro">
                <div className="flex-item-card-intro">
                    <div className="greetings">
                        <h1>Hi, Wen Chen!</h1>
                        <h2>What would you like to do?</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}