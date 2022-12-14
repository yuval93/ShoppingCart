
const mongoose = require("mongoose");
const config = require("../01-utils/config.js");
mongoose.set('strictQuery', true);


function connectToMongoDB() {
    return new Promise((resolve, reject) => {

        // Connect options - prevent console warnings:
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        // Connect to MongoDB:
        mongoose.connect(config.mongoConnectionString, options, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

connectToMongoDB()
    .then(db => console.log("We're connected to MongoDB." + db.connections[0].name))
    .catch(err => console.log(err));

module.exports = {
    connectToMongoDB
};



// const mongoose = require("mongoose");
// const config = require("../01-utils/config.js");

// async function connectToMongoDB() {
//     try {
//         const db = await mongoose.connect(config.mongoConnectionString);
//         console.log("We're connected to " + db.connections[0].name);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// module.exports = {
//     connectToMongoDB
// };
