// Base Url to connect to Rails API //
const baseUrl = "http://127.0.0.1:3000/climbs";


// DOM Element Selectors 
const climbSelector = document.getElementById("climb-selector");
const sendSelector = document.getElementById("send-selector");
const climbSelectionButton = document.getElementById("climb-selector-submit");


const currentClimbContainer = document.getElementById("current-climb-container");
const currentSendsContainer = document.getElementById("current-send-container");
const sendsFormContainer = document.querySelector(".sends-form-container");
const displaySendFormButton = document.getElementById("show-send-form-button")

// global variables that are used later //
let newSendForm;
let currentClimbs;
let currentSends;


// App-wide/Global Function Definitions //

function fetchForClimbsSelector () {
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
}

function fetchSingleClimb(climbId) {
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
    currentSends = [];
    
    fetch(`${baseUrl}/${climbId}/sends`)
        .then( function(res) {
            return res.json();
        })
        .then( function(sendsArray) {
            currentSends = sendsArray.map( (sendJSONObj) => {
                mySend = new Send(sendJSONObj)
                return mySend;
                }
            )}
        );
}

function populateSendSelector (sendList) {
    if (sendSelector.childElementCount > 0) {
        sendSelector.innerHTML = ''
    }
  
    for (const send of sendList) {
        console.log(send);
        send.addToSendsSelector;
    }
}

function displaySend(send) {
    let sendToDisplay = send;

    if (sendToDisplay) {
   sendToDisplay.addToSendsContainer;
   watchSendDeleteButton(sendToDisplay);
    }
    else {
        currentSendsContainer.innerHTML = ''
    }
}

function watchClimbSelection () {
    
    climbSelector.addEventListener("click", function(event) {

        event.preventDefault();

        console.log(event);

        console.log(climbSelector.selectedIndex);
        let climbId = climbSelector.selectedIndex + 1;

        
        fetchSingleClimb(climbId);
        fetchSends(climbId);

        setTimeout(() => populateSendSelector(currentSends), 100);
        displaySend();
    })
}

function watchSendSelection () {
    
    sendSelector.addEventListener("click", function(event) {

        event.preventDefault();

        console.log(event);

        let selectedSend = currentSends[sendSelector.selectedIndex];
        displaySend(selectedSend);

    })
}

function watchDisplaySendFormButton () {

    displaySendFormButton.addEventListener("click", e => {
        e.preventDefault();

        console.log(e)

        if (sendsFormContainer.childElementCount < 1) {
            newSendForm = Send.appendForm(sendsFormContainer);
            watchSendFormSubmitButton (newSendForm);
        }
        else {
            sendsFormContainer.innerHTML = "";
        }
    })
}

function createSendFromForm (form) {

    const sendJSONObj = {
        climber: form.elements["send-form-climber-input"].value,
        date: form.elements["send-form-date-input"].value,
        notes: form.elements["send-form-notes-input"].value,
        climb_id: climbSelector.selectedIndex + 1
    }

    const newSend = new Send(sendJSONObj);
    console.log(newSend);

    return newSend
}


function submitNewSend (send) {
    
    let sendJSONObj = send;
    let climbId = send.climb_id;

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({send: sendJSONObj})
      };
      
   fetch(`${baseUrl}/${climbId}/sends`, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object);
        })
        .catch(function(error) {
          alert("Sorry, that send isn't valid. Try checking you filled in all the info");
          console.log(error.message);
        });

    
    setTimeout( () => fetchSends(climbId), 100);
    setTimeout( () => {
        populateSendSelector(currentSends);
        displaySend(currentSends[currentSends.length - 1]);
    }, 200);

}

function watchSendFormSubmitButton (form) {

    form.elements["send-form-submit-button"].addEventListener("click", e => {
        e.preventDefault();

        const newSend = createSendFromForm(newSendForm);

        submitNewSend(newSend);
    })
}


function deleteSend (send) {

    let sendJSONObj = send;
    let climbId = send.climb_id;

      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({send: sendJSONObj})
      };
      
    fetch(`${baseUrl}/${climbId}/sends/${sendJSONObj.id}`, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object);
        })
        .catch(function(error) {
          alert("Bad things! Didn't work");
          console.log(error.message);
        });

    setTimeout( () => fetchSends(climbId), 100);
    setTimeout( () => {
        populateSendSelector(currentSends);
        displaySend()
    }, 200);


}

function watchSendDeleteButton (sendToDelete) {

    console.log(sendToDelete);

    const sendDeleteButton = document.querySelector(".send-delete-button")

    sendDeleteButton.addEventListener("click", e => {
        e.preventDefault();

        deleteSend(sendToDelete);
    })
}


// Class Declarations

// class Climb {

//     constructor (climbJSONObj) {
//         this.nickname = climbJSONObj.nickname;
//         this.climb_type = climbJSONObj.climb_type;
//         this.grade = climbJSONObj.grade;
//         this.location = climbJSONObj.location;
//         this.notes = climbJSONObj.notes;
//         this.color = climbJSONObj.color;
//     }
    
//     get _htmlTemplate() {
//         const container = document.createElement('div');
//         container.innerHTML = ` <h3> ${this.nickname} </h3>
//         <h5> ${this.color}: ${this.grade} </h5>
//         <h5> ${this.climb_type} </h5>
//         <h5> ${this.location} </h5>
//         <p> ${this.notes} </p>
//         `;
//         return container

//     };

//     get addToClimbsContainer () {
//         if (currentClimbContainer.childElementCount != 0) {
//         currentClimbContainer.replaceChild( this._htmlTemplate, currentClimbContainer.lastElementChild)}
//         else {
//         currentClimbContainer.appendChild(this._htmlTemplate)
//         }
//     }


//     get addToClimbSelector () {
//        const climbOption = document.createElement('option');
//        climbOption.innerText = `${this. nickname}, ${this.color}: ${this.grade}`;
//        console.log(climbOption)
//        climbSelector.appendChild(climbOption);
//     }
// }

// class Send {

//     constructor (sendJSONObj) {
//         this.climber = sendJSONObj.climber;
//         this.date = sendJSONObj.date;
//         this.notes = sendJSONObj.notes;
//         this.climb_id = sendJSONObj.climb_id;
//         this.id = sendJSONObj.id;
//     }
//     get displayDate () {
//         const dateArray = this.date.split(/\D/);
//         return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`
//     }

//     get deleteButton () {
//         const button = document.createElement('button');
//         button.setAttribute('type', 'button');
//         button.className = 'send-delete-button';
//         button.id = `send-${this.id}-delete-button`;
//         button.innerText = 'Delete'
//         return button
//     }
    
//     get _htmlTemplate() {
//         const container = document.createElement('div');
//         container.id = `Send-${this.id}`;
//         container.innerHTML = `<h3> Climbed By: ${this.climber} </h3>
//         <h5> Completed on: ${this.displayDate} </h5>
//         <p> Notes: ${this.notes} </p>
//         `;
//         container.append(this.deleteButton);

//         return container

//     };

//     get addToSendsContainer () {
//         if (currentSendsContainer.childElementCount != 0) {
//             currentSendsContainer.replaceChild( this._htmlTemplate, currentSendsContainer.lastElementChild)
//         }
//         else {
//             currentSendsContainer.appendChild(this._htmlTemplate)
//         }
//     }

//     get addToSendsSelector () {
//         const sendOption = document.createElement('option');
//         sendOption.innerText = `${this.climber}: ${this.displayDate}`;
//         sendOption.id = `send-option-${this.id}`;
//         console.log(sendOption)
//         sendSelector.appendChild(sendOption);
//      }
 

//     static newForm() {

//         // ===== create form container and input elements ======//

//         const sendFormContainer = document.createElement('form');

//         const sendClimberLabel = document.createElement('label');
//         const sendClimberInput = document.createElement('input');

//         const sendDateLabel = document.createElement('label');
//         const sendDateInput = document.createElement('input');

//         const sendNotesLabel = document.createElement('label');
//         const sendNotesInput = document.createElement('textarea');

//         const sendFormButton = document.createElement('button');
//         // ===== format element attributes ======//

//         sendFormContainer.classList.add("send-form");

//         sendClimberLabel.innerText = `Climber: `;
//         sendClimberInput.id = `send-form-climber-input`;
//         sendClimberInput.setAttribute("type", "text");

//         sendDateLabel.innerText = `Date: `;
//         sendDateInput.id = `send-form-date-input`;
//         sendDateInput.setAttribute("type", "date");

//         sendNotesLabel.innerText = `Notes: `;
//         sendNotesInput.id = `send-form-notes-input`;

//         sendFormButton.innerText = `Yeah I Sent it!`;
//         sendFormButton.id = `send-form-submit-button`;

//         // ===== append to send form container ======//

//         sendFormContainer.appendChild(sendClimberLabel);
//         sendClimberLabel.append(sendClimberInput);
        
//         sendFormContainer.appendChild(sendDateLabel);
//         sendDateLabel.append(sendDateInput);

        
//         sendFormContainer.appendChild(sendNotesLabel);
//         sendNotesLabel.append(sendNotesInput);

//         sendFormContainer.appendChild(sendFormButton);
        
//         //====== return form container=====//

//         return sendFormContainer
//     }

//     static appendForm(containerElement) {
//         const sendForm = this.newForm();
//         containerElement.append(sendForm);
//         return sendForm;
//     }

// }

// Stuff that actually runs the web app front-end 

document.addEventListener("DOMContentLoaded", function() {

    console.log("test");

    fetchForClimbsSelector();

    watchClimbSelection();

    watchSendSelection();

    watchDisplaySendFormButton();

})

