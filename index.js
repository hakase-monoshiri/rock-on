// Global variables and functions

const climbsContainer = document.querySelector(".climbs-container");
console.log(climbsContainer);

const sendsContainer = document.querySelector(".sends-container");
console.log(sendsContainer);

const climbSelector = document.getElementById("climb-selector")

// Class Declarations

class Climb {

    constructor (climbJSONObj) {
        this.nickname = climbJSONObj.nickname;
        this.climb_type = climbJSONObj.climb_type;
        this.grade = climbJSONObj.grade;
        this.location = climbJSONObj.location;
        this.notes = climbJSONObj.notes;
        this.color = climbJSONObj.color;
    }
    
    get _htmlTemplate() {
        return ` <h3> ${this.nickname} </h3>
        <h5> ${this.color}: ${this.grade} </h5>
        <h5> ${this.climb_type} </h5>
        <h5> ${this.location} </h5>
        <p> ${this.notes} </p>
        `

    };

    get addToClimbsContainer () {
        climbsContainer.innerHTML += this._htmlTemplate
    }

    get addToClimbSelector () {
       const climbOption = document.createElement('option');
       climbOption.innerText = `${this. nickname}, ${this.color}: ${this.grade}`;
       console.log(climbOption)
       climbSelector.appendChild(climbOption);
    }
}

class Send {

    constructor (sendJSONObj) {
        this.climber = sendJSONObj.climber;
        this.date = sendJSONObj.date;
        this.notes = sendJSONObj.notes;
    }
    
    get _htmlTemplate() {
        return ` <h3> ${this.climber} </h3>
        <h5> Completed on: ${this.date} </h5>
        <p> ${this.notes} </p>
        `

    };

    get addToSendsContainer () {
        sendsContainer.innerHTML += this._htmlTemplate
    }
}

// Stuff that actually runs the web app front-end 

document.addEventListener("DOMContentLoaded", function() {

    console.log("test");
    


    const baseUrl = "http://127.0.0.1:3000/climbs"

    // fetch(`${baseUrl}/1`).then( function(res) {
    //     return res.json();}).then(
    //         function(climbJSONobj) {
    //             console.log(climb);
    //             myClimb = new Climb(climbJSONObj)
    //             console.log(myClimb);
    //             climbsContainer.innerHTML += myClimb.htmlTemplate;
    //         }
    //     );

    fetch(`${baseUrl}`).then( function(res) {
        return res.json();}).then(
            function(climbsArray) {
                console.log(climbsArray);
                for ( const climbJSONObj of climbsArray) {
                    myClimb = new Climb(climbJSONObj)
                    myClimb.addToClimbSelector ;
                }
            }
        );

        
    fetch(`${baseUrl}/1/sends`).then( function(res) {
        return res.json();}).then(
            function(sendsArray) {
                console.log(sendsArray);
                for ( const sendJSONObj of sendsArray) {
                    mySend = new Send(sendJSONObj)
                    console.log(mySend);
                    mySend.addToSendsContainer;
                }
            }
        );


})