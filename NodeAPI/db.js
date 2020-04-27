const mongoose = require('mongoose');
const config = {
    autoIndex: false,
    useNewUrlParser: true,
};

const uri = 'mongodb://localhost:27017/crudDB';

mongoose.connect(uri, { config }, (err) => {
    if (!err)
        console.log('MongoDB connection successful...')
    else {
        console.log('Error in DB Connection:' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;