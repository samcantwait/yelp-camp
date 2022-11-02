const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("connection error:")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63580dcc2f24268e3f15334c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, doloribus praesentium, officia itaque neque et tenetur deleniti pariatur minima in dignissimos eligendi iste deserunt illo inventore nisi voluptate, minus numquam!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drj5gdgjx/image/upload/v1660767588/YelpCamp/olx5puvyps5fp045hr63.jpg',
                    filename: 'YelpCamp/olx5puvyps5fp045hr63',
                }
            ],
            // image: 'https://source.unsplash.com/collection/11649432',
        })
        await camp.save();
    }
}

seedDB().then(() => mongoose.connection.close());