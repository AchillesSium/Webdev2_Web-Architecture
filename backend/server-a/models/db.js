const mongoose = require('mongoose');
let Sandwich = require('../services/sandwich');
module.exports = function () {
  const db = 'mongodb://database:27017/sandwich_order';
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Connected to ${db}...`);
      let preDefinedSandwichList = [
        {
          name: "Texas Longhorn",
          toppings: [
              {
                  name: "Thinly-shaved roast beef",
              },
              {
                  name: "lettuce",
              },
          ],
          breadType: "oat",
          image: "images/sandwich-1.jpg"
        },
        {
          "name": "Big Katuna",
          "toppings": [
            {
                "name": "Tuna,lettuce,tomatoes",
                "order_id": 3
            },
            {
                "name": "peas & mint",
                "order_id": 4
            },
          ],
          "breadType": "wheat",
          "image": "images/sandwich-2.jpg"
        },
        {
          "name": "Pilgrim Pride",
          "toppings": [
              {
                  "name": "Roast turkey breast,alfalfa sprouts",
                  "order_id": 5
              }
          ],
          "breadType": "rye",
          "image": "images/sandwich-3.jpg"
        },
        {
          "name": "The Godfather",
          "toppings": [
              {
                  "name": "Capicola ham, genoa salami",
                  "order_id": 6
              },
              {
                  "name": "spinach",
                  "order_id": 7
              }
          ],
          "breadType": "oat",
          "image": "images/sandwich-4.jpg"
        },
        {
          "name": "Veggie Delite",
          "toppings": [
              {
                  "name": "Provolone cheese, guacamole, lettuce",
                  "order_id": 8
              },
          ],
          "breadType": "wheat",
          "image": "images/sandwich-5.jpg"
        },

        {
          "name": "American Favorite",
          "toppings": [
              {
                  "name": "Provolone cheese, Smoked ham",
                  "order_id": 9
              },
          ],
          "breadType": "wheat",
          "image": "images/sandwich-6.jpg"
        }
      ];

      // Get all toppings from db
      Sandwich.getSandwiches().then((sandwiches) => {
        let sandwich_list = sandwiches.map((item) => {
            return item.name;
        });

        preDefinedSandwichList.forEach((name) => {
          let temp_name = name.name;
          if(!sandwich_list.includes(temp_name)){
            Sandwich.addSandwich(name)
            .then((i) => {
                console.log('sandwich saved');
            }).catch((error) => {
                console.log(error);
            });
          }
        });
      }).catch();
    }).catch(err => console.log('Could not connect to MongooDB...', err));
};