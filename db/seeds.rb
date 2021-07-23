# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Climb.create( climb_type: "Boulder", grade:"V2", color:"Pink",  location: "PRG East Falls, Cube Face ", notes:"Starts at the arete and continues to the top of the middle of the wall")
Climb.create( climb_type: "Boulder", grade:"V1", color:"Blue",  location: "PRG East Falls, Shipwreck Starbord ", notes:"Lots of sloper holds. Keep hips low to keep from slipping off")
Climb.create( climb_type: "Boulder", grade:"V3", color:"Green",  location: "PRG East Falls, Mushroom Front ", notes:"Start is very crunched up, with a huge mantle move to finish it out. Watch for the heel hook")
Climb.create( climb_type: "Lead", grade:"5.9", color:"Purple",  location: "PRG East Falls, Route 12 ", notes:"Really short, but small crimps the whole way.")
Climb.create( climb_type: "Top-Rope", grade:"5.4", color:"Red",  location: "PRG East Falls, Route 6 ", notes:"Easily the easiest climb in the gym")



Send.create(climber: "Eben Eleazer", date:Date.today, notes: "Very techincal Slab", climb_id: 1)
Send.create(climber: "Eben Eleazer", date:Date.today, notes: "Not as hard the second time", climb_id: 1)
Send.create(climber: "Eben Eleazer", date:Date.today, notes: "Cakewalk", climb_id: 5)
Send.create(climber: "Eben Eleazer", date:Date.today, notes: "Hardest climb i've done so far.", climb_id: 3)
Send.create(climber: "Eben Eleazer", date:Date.today, notes: "My fingers hurt", climb_id: 4)
Send.create(climber: "Eben Eleazer", date:Date.today, notes: "Idk why I did it twice", climb_id: 5)