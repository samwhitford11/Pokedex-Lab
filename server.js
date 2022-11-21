require("dotenv").config() 
const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

const PORT = process.env.PORT
const app = express()

// DATABASE CONNECTION
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
// Establishing connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for connection status
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

//-------------------
// Models
//-------------------
const {Schema, model} = mongoose

//Animals Schema
const pokedexSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

// Make animal model
const Pokedex = model("Pokedex", pokedexSchema)

//-----------------
// Middleware
//-----------------
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


//-----------------
// Routes
//-----------------

app.get('/', (req,res) => {
    res.send("your server is running... better catch it.")
})




























// Listening Route
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
})