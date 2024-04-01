// db.js

const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        // Replace 'yourDatabaseName' with the name of your database
        const connection = await mongoose.connect('mongodb+srv://fizafaiz13:0fn7WLxcxDujwiuN@cluster0.thj5ohx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectToDatabase;
