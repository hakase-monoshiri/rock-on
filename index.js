console.log("test");

const climbsContainer = document.querySelector(".climbs-container");

console.log(climbsContainer);

class Climb {

    constructor (climb_type, grade, location, notes, color) {
        this.climb_type = climb_type;
        this.grade = grade;
        this.location = location;
        this.notes = notes;
        this.color = color;
    }
    
    get htmlTemplate() {
        return `<h3> ${this.color}: ${this.grade} </h3>`
    };

}

fetch("http://127.0.0.1:3000/climbs/1").then( function(res) {
    return res.json();}).then(
        function(climb) {
            const { climb_type, grade, location, notes, color } = climb;
            const myClimb = new Climb(climb_type, grade, location, notes, color);
            console.log(myClimb);
            climbsContainer.innerHTML += myClimb.toHtml;
        }
    );