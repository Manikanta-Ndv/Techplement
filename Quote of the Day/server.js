const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Initialize Sequelize for MySQL
var sequelize = new Sequelize('quotes_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
// Define the Quote model
const Quote = sequelize.define('Quote', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'quotes'
});

// Sync the model with the database
sequelize.sync();

// Get a random quote from the database
app.get('/api/quote', async (req, res) => {
    const quote = await Quote.findOne({ order: sequelize.random() });
    res.json(quote);
});

// Search quotes by author
app.get('/api/quotes', async (req, res) => {
    const { author } = req.query;
    const quotes = await Quote.findAll({ where: { author } });
    res.json(quotes);
});

// Fetch and store a new quote from the API
app.post('/api/quote', async (req, res) => {
    const response = await axios.get('https://api.quotable.io/random');
    const { content, author } = response.data;

    const newQuote = await Quote.create({ text: content, author });
    res.json(newQuote);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
