// Global variables and functions

const climbSelector = document.getElementById("climb-selector")

const climbSelectionButton = document.getElementById("climb-selector-submit")
console.log(climbSelectionButton)

const baseUrl = "http://127.0.0.1:3000/climbs"

const currentClimbContainer = document.getElementById("current-climb-container")

const currentSendsContainer = document.getElementById("current-sends-container")

const sendsFormContainer = document.querySelector(".sends-form-container");

const displaySendFormButton = document.getElementById("show-send-form-button")
console.log(displaySendFormButton)

function fetchClimbs(climbId) {
    fetch(`${baseUrl}/${climbId}`)
    .then( function(res) {
        return res.json();
    })
    .then( function(climbJSONObj) {
            myClimb = new Climb(climbJSONObj)
            myClimb.addToClimbsContainer;
        }
    )
};

function fetchSends(climbId) {
    fetch(`${baseUrl}/${climbId}/sends`)
        .then( function(res) {
            return res.json();
        })
        .then( function(sendsArray) {
            for ( const sendJSONObj of sendsArray) {
                mySend = new Send(sendJSONObj)
                mySend.addToSendsContainer;
                }
            }
        );
}

function watchSumbitButton () {
    
    climbSelectionButton.addEventListener("click", function(event) {

        event.preventDefault();

        console.log(event);

        console.log(climbSelector.selectedIndex)

        let climbId = climbSelector.selectedIndex + 1

        fetchClimbs(climbId);
        fetchSends(climbId);    

    })
}

function watchSendFormButton () {
    displaySendFormButton.addEventListener("click", e => {
        e.preventDefault();

        console.log(e)

        if (sendsFormContainer.childElementCount < 1) {
            Send.appendForm(sendsFormContainer);
        }
        else {
            sendsFormContainer.innerHTML = "";
        }
    })
}


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
        const container = document.createElement('div');
        container.innerHTML = ` <h3> ${this.nickname} </h3>
        <h5> ${this.color}: ${this.grade} </h5>
        <h5> ${this.climb_type} </h5>
        <h5> ${this.location} </h5>
        <p> ${this.notes} </p>
        `;
        return container

    };

    get addToClimbsContainer () {
        if (currentClimbContainer.childElementCount != 0) {
        currentClimbContainer.replaceChild( this._htmlTemplate, currentClimbContainer.lastElementChild)}
        else {
        currentClimbContainer.appendChild(this._htmlTemplate)
        }
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
        const container = document.createElement('div');
        container.id = `Send-${this.date}`;
        container.innerHTML = `<h3> ${this.climber} </h3>
        <h5> Completed on: ${this.date} </h5>
        <p> ${this.notes} </p>
        `;
        return container

    };

    get addToSendsContainer () {
        if (currentSendsContainer.childElementCount != 0) {
            currentSendsContainer.replaceChild( this._htmlTemplate, currentSendsContainer.lastElementChild)}
        else {
            currentSendsContainer.appendChild(this._htmlTemplate)
            }
    }

    static newForm() {

        // ===== create form container and input elements ======//

        const sendFormContainer = document.createElement('form');

        const sendClimberLabel = document.createElement('label');
        const sendClimberInput = document.createElement('input');

        const sendDateLabel = document.createElement('label');
        const sendDateInput = document.createElement('input');

        const sendNotesLabel = document.createElement('label');
        const sendNotesInput = document.createElement('textarea');

        const sendFormButton = document.createElement('button');

        // ===== format element attributes ======//

        sendClimberLabel.innerText = `Climber: `
        sendClimberInput.className = `send-climber-input`
        sendClimberInput.setAttribute("type", "text")

        sendDateLabel.innerText = `Date: `
        sendDateInput.className = `send-date-input`
        sendDateInput.setAttribute("type", "date")

        sendNotesLabel.innerText = `Notes: `
        sendNotesInput.className = `send-notes-input`

        sendFormButton.innerText = `Yeah I Sent it!`

        // ===== append to send form container ======//

        sendFormContainer.appendChild(sendClimberLabel);
        sendFormContainer.appendChild(sendClimberInput);
        
        sendFormContainer.appendChild(sendDateLabel);
        sendFormContainer.appendChild(sendDateInput);
        
        sendFormContainer.appendChild(sendNotesLabel);
        sendFormContainer.appendChild(sendNotesInput);

        sendFormContainer.appendChild(sendFormButton);
        
        //====== return form container=====//

        return sendFormContainer
    }

    static appendForm(containerElement) {
        containerElement.append(this.newForm());
    }

}

// Stuff that actually runs the web app front-end 

document.addEventListener("DOMContentLoaded", function() {

    console.log("test");

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

    watchSumbitButton();

    watchSendFormButton();

})


