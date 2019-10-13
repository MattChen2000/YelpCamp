var express = require("express");
var app = express();
var campGrounds = [
    { name: "Salmon Creek", image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg" },
    { name: "Salmon Creek", image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg" },
    { name: "Salmon Creek", image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg" },
    { name: "Granite Hill", image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg" },
    { name: "Granite Hill", image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg" },
    { name: "Granite Hill", image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg" },
    { name: "Mountain Goat's Rest", image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=640%2C420" },
    { name: "Mountain Goat's Rest", image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=640%2C420" },
    { name: "Mountain Goat's Rest", image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=640%2C420" }
];
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campGrounds:campGrounds});
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name : name, image : image}
    campGrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen("3000", function() {
    console.log("YelpCamp server has started");
});