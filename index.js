console.log("test");

const climbsContainer = document.querySelector(".climbs-container");

console.log(climbsContainer);

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
}


const baseUrl = "http://127.0.0.1:3000/climbs"

// fetch(`${baseUrl}/1`).then( function(res) {
//     return res.json();}).then(
//         function(climb) {
//             console.log(climb);
//             const { climb_type, grade, location, notes, color , nickname} = climb;
//             const myClimb = new Climb(climb_type, grade, location, notes, color, nickname) ;
//             console.log(myClimb);
//             climbsContainer.innerHTML += myClimb.htmlTemplate;
//         }
//     );

fetch(`${baseUrl}`).then( function(res) {
    return res.json();}).then(
        function(climbsArray) {
            console.log(climbsArray);
            for ( const climbJSONObj of climbsArray) {
                // const { climb_type, grade, location, notes, color , nickname} = climb;
                // const myClimb = new Climb(climb_type, grade, location, notes, color, nickname) ;
                myClimb = new Climb(climbJSONObj)
                console.log(myClimb);
                myClimb.addToClimbsContainer;
            }
        }
    );