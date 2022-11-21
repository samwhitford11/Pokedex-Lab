require("dotenv").config() 
const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const pokemon = require("./models/pokemon")

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
app.get('/pokemon/', (req, res) => {
    // const image = pokemon[req.params].img
    // const png = image.slice(0, image.length - 3) + 'png' 
    // console.log(png);

    res.render(
        'index.ejs',
        {
            allPokemon: pokemon
        }
    );
});

// New Route
app.get('/pokemon/new', (req,res) =>{
    res.render('new.ejs');
});

// Create Route
app.post('/pokemon', (req,res) => {
    pokemon.push(req.body)
    res.redirect('/pokemon')
});

// Edit Route
app.get("/pokemon/:id/edit", (req,res)=>{
    res.render("edit.ejs", 
    {
        pokemons: pokemon[req.params.id],
        index:req.params.id
    })

});

// Update Route
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect('/pokemon')
});

// Destroy Route
app.delete("/pokemon/:id", (req, res) => {
    //splice the item out of the array
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon")

});

// Show Route
app.get('/pokemon/:id', (req,res) => {
    res.render('show.ejs', 
    {
        pokemons: pokemon[req.body.id],
        index: req.params.id
    });
});




























// Listening Route
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
})