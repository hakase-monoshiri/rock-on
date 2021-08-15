class Send {

    constructor (sendJSONObj) {
        this.climber = sendJSONObj.climber;
        this.date = sendJSONObj.date;
        this.notes = sendJSONObj.notes;
        this.climb_id = sendJSONObj.climb_id;
        this.id = sendJSONObj.id;
    }
    get displayDate () {
        const dateArray = this.date.split(/\D/);
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`
    }

    get deleteButton () {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.className = 'send-delete-button';
        button.id = `send-${this.id}-delete-button`;
        button.innerText = 'Delete'
        return button
    }
    
    get _htmlTemplate() {
        const container = document.createElement('div');
        container.id = `Send-${this.id}`;
        container.innerHTML = `<h3> Climbed By: ${this.climber} </h3>
        <h5> Completed on: ${this.displayDate} </h5>
        <p> Notes: ${this.notes} </p>
        `;
        container.append(this.deleteButton);

        return container

    };

    get addToSendsContainer () {
        if (currentSendsContainer.childElementCount != 0) {
            currentSendsContainer.replaceChild( this._htmlTemplate, currentSendsContainer.lastElementChild)
        }
        else {
            currentSendsContainer.appendChild(this._htmlTemplate)
        }
    }

    get addToSendsSelector () {
        const sendOption = document.createElement('option');
        sendOption.innerText = `${this.climber}: ${this.displayDate}`;
        sendOption.id = `send-option-${this.id}`;
        console.log(sendOption)
        sendSelector.appendChild(sendOption);
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

        sendFormContainer.classList.add("send-form");

        sendClimberLabel.innerText = `Climber: `;
        sendClimberInput.id = `send-form-climber-input`;
        sendClimberInput.setAttribute("type", "text");

        sendDateLabel.innerText = `Date: `;
        sendDateInput.id = `send-form-date-input`;
        sendDateInput.setAttribute("type", "date");

        sendNotesLabel.innerText = `Notes: `;
        sendNotesInput.id = `send-form-notes-input`;

        sendFormButton.innerText = `Yeah I Sent it!`;
        sendFormButton.id = `send-form-submit-button`;

        // ===== append to send form container ======//

        sendFormContainer.appendChild(sendClimberLabel);
        sendClimberLabel.append(sendClimberInput);
        
        sendFormContainer.appendChild(sendDateLabel);
        sendDateLabel.append(sendDateInput);

        
        sendFormContainer.appendChild(sendNotesLabel);
        sendNotesLabel.append(sendNotesInput);

        sendFormContainer.appendChild(sendFormButton);
        
        //====== return form container=====//

        return sendFormContainer
    }

    static appendForm(containerElement) {
        const sendForm = this.newForm();
        containerElement.append(sendForm);
        return sendForm;
    }

}