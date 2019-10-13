var express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var campGrounds = [
    { 
        name: "Salmon Creek", 
        image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg", 
        description: "This is a small creek area, lots of salmons"
    },
    { 
        name: "Granite Hill", 
        image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg",
        description:"This is a huge granite hill. No bathrooms. No water. Beautiful granite"
    }
    // { name: "Mountain Goat's Rest", image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=640%2C420" }
];


//  Schema Setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// campGrounds.forEach(function(campground) {
//     Campground.create(campground, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(campground);
//         }
//     });
// })


app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:campgrounds})
        }
    })
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var dcr = req.body.description;
    var newCampground = {name : name, image : image, description : dcr}
    Campground.create(newCampground, function(err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// Show the campground creation form
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.get("/campgrounds/:id", function(req, res) {
    // Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //Render the show page with the selected campground
            res.render("show", {campground:foundCampground});
        }
    })
});

app.listen("3000", function() {
    console.log("YelpCamp server has started");
});