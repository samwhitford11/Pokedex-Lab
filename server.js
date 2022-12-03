require("dotenv").config() 
const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const pokemon = require("./models/pokemon")
const morgan = require("morgan") //import morgan

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

// Index Route
app.get('/pokemon', (req, res) => {
    
    res.render(
        'index.ejs',
        {
            allPokemon: pokemon
        }
    );
});
// Destroy Route
app.delete("/pokemon/:id", (req, res) => {
    console.log('delete')
    //splice the item out of the array
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon")

});

// Show Route
app.get('/pokemon/:id', (req,res) => {
    res.render('show.ejs', 
    {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    });
});

// New Route
app.get('/pokemon/add/new', (req,res) =>{
    res.render('new.ejs',{
        stats: {
            hp: "",
            attack: "",
            defense: "",
            spattack: "",
            spdefense: "",
            speed: ""
          }// model of stats based on pokemon js
    })
});

// Create Route
app.post('/pokemon', (req,res) => {
    // use the spread operater to save the rest of the keys for stats
    const { name , type, ...rest }= req.body//deconstructed req.body into keys
    
    const body = {
        name,
        type,
        stats: rest
    }
    pokemon.push(body)
    res.redirect('/pokemon')
});



// Update Route
app.put('/pokemon/:id', (req, res) => {
    const { name , type, img, ...rest }= req.body//deconstructed req.body into keys
    
    const body = {
        name,
        type,
        img,
        stats: rest
    }
    pokemon[req.params.id] = body
    res.redirect('/pokemon')
});





// Edit Route
app.get("/pokemon/:id/edit", (req,res)=>{
    res.render("edit.ejs", 
    {
        pokemon: pokemon[req.params.id],
        index:req.params.id
    })

});




























// Listening Route
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
})