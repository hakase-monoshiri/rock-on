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
        ).then( (sendsArray) => {
            populateSendSelector(currentSends);
            return sendsArray;
        });
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

        console.log(climbSelector.value);
        let climbId = parseInt(climbSelector.value);

        
        fetchSingleClimb(climbId);
        fetchSends(climbId);

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
        climb_id: parseInt(climbSelector.value)
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
          fetchSends(climbId);
          const send = new Send(object) 
          return send
        })
        .then( (send) => {
            displaySend(send);
        
        })
        .catch(function(error) {
          alert("Sorry, that send isn't valid. Try checking you filled in all the info");
          console.log(error.message);
        });
  
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
          fetchSends(climbId);
          displaySend();
        })
        .catch(function(error) {
          alert("Bad things! Didn't work");
          console.log(error.message);
        });

}

function watchSendDeleteButton (sendToDelete) {

    console.log(sendToDelete);

    const sendDeleteButton = document.querySelector(".send-delete-button")

    sendDeleteButton.addEventListener("click", e => {
        e.preventDefault();

        deleteSend(sendToDelete);
    })
}


// Stuff that actually runs the web app front-end 

document.addEventListener("DOMContentLoaded", function() {

    console.log("test");

    fetchForClimbsSelector();

    watchClimbSelection();

    watchSendSelection();

    watchDisplaySendFormButton();

})

