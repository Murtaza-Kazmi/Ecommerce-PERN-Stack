const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };

    //the code below was the code written from the tutorial
    //Look at file server/routes/dashboard.js to see the change code for this code

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };
    console.log("signing jwt, payload = ");
    console.log(payload);
    return jwt.sign(payload, "ourlittlesecret", {
        expiresIn: "1h"
    });
}

module.exports = jwtGenerator;
