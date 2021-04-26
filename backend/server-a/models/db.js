const mongoose = require('mongoose');
let Sandwich = require('../services/sandwich');

module.exports = function () {
  const db = 'mongodb://localhost:27017/sandwich_order';
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Connected to ${db}...`);

      let preDefinedSandwichList = [
        {
          name: "Beacon sandwich",
          toppings: [
              {
                  name: "Beacon",
              },
              {
                  name: "lettuce",
              },
          ],
          breadType: "oat"
        },
        {
          "name": "Beef sandwich",
          "toppings": [
            {
                "name": "Beef",
                "order_id": 3
            },
            {
                "name": "peas & mint",
                "order_id": 4
            },
          ],
          "breadType": "wheat"
        },
        {
          "name": "Cheese sandwich",
          "toppings": [
              {
                  "name": "Cheese",
                  "order_id": 5
              }
          ],
          "breadType": "rye"
        },
        {
          "name": "Chicken sandwich",
          "toppings": [
              {
                  "name": "Chicken",
                  "order_id": 6
              },
              {
                  "name": "spinach",
                  "order_id": 7
              }
          ],
          "breadType": "oat"
        },
        {
          "name": "Ham sandwich",
          "toppings": [
              {
                  "name": "Ham, grain mustard",
                  "order_id": 8
              },
          ],
          "breadType": "wheat"
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