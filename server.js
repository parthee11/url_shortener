require('dotenv').config();
const express = require('express');
const app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortId = require('shortid');
const validUrl = require('valid-url');

const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())

// connect to db
const URI = process.env['MONGO_URI']
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established successfully"));

// mongoose model 
const URLSchema = new mongoose.Schema({
    original_url: {
        type: String
    },
    short_url: {
        type: String
    }
});
const URL = mongoose.model("URL", URLSchema);

// routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/api/shorturl/", async (req, res) => {
    const url = req.body.url;
    const urlShort = shortId.generate();
    if(!validUrl.isWebUri(url)) {
        res.status(400).send({
            error: "Invalid Url"
        })
    } else {
        let findUrl = await URL.findOne({ original_url: url });
        if(findUrl) {
            res.json(findUrl);
        } else {
            let newUrl = new URL({
                original_url: url,
                short_url: urlShort
            })
            await newUrl.save();
            res.json(newUrl);
        }
    }    
});

app.get("/api/shorturl/:url?", async (req, res) => {
    const url = req.params.url;
    const findUrl = await URL.findOne({ short_url: url })
    if(!findUrl) {
        return res.status(400).send({
            error: "URL not found!"
        })
    }
    res.redirect(findUrl.original_url)
})

// listen
app.listen(PORT, () => {
    console.log("App is listening on port: ", PORT)
})
