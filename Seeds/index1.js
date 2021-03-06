const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
require('dotenv').config();


// // old connection 
// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });
 

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

//database connection
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


// I'm going to seed all of these campgrounds with an author of my pre-chosen ID. In the real thing, this would not be the case (neither would the seeding itself, in all likelihood)

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '601ad24c33c8f9021f328249', // here is my author ID, for the 'bob' account, password - ALSO 'bob'. (NOTE: This is not actually-consequential information, though obviously it would be for a real app)
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
            ]
            },
            images: [{
                 url: 'https://res.cloudinary.com/dfixksb6g/image/upload/v1614689007/YelpCamp/photo-1525811902-f2342640856e_f3ebh5.jpg',
                 filename: 'YelpCamp/photo-1525811902-f2342640856e_f3ebh5'
            }]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});