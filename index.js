console.log("test");

const climbsContainer = document.querySelector(".climbs-container");

console.log(climbsContainer);

fetch("http://127.0.0.1:3000/climbs").then( function(res) {
    console.log(res.json())
});