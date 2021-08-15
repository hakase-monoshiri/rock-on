class Climb {

    constructor (climbJSONObj) {
        this.nickname = climbJSONObj.nickname;
        this.climb_type = climbJSONObj.climb_type;
        this.grade = climbJSONObj.grade;
        this.location = climbJSONObj.location;
        this.notes = climbJSONObj.notes;
        this.color = climbJSONObj.color;
        this.id = climbJSONObj.id;
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
       climbOption.value = `climb-${this.id}`
       console.log(climbOption)
       climbSelector.appendChild(climbOption);
    }
}
