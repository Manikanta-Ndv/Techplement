const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize for MySQL
const sequelize = new Sequelize('quotes_db', 'root', 'root', {
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

// Sync the model with the database and add initial quotes
sequelize.sync().then(async () => {
    await Quote.bulkCreate([
        { text: 'To live is the rarest thing in the world. Most people exist, that is all.', author: 'Oscar' },
        { text: 'That it will never come again is what makes life so sweet.' , author: 'Emily Dickinson' },
        { text: 'It is never too late to be what you might have been.' , author: 'George Eliot' },
        { text: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', author: 'Ralph Waldo Emerson' },
        { text: 'Pain is inevitable. Suffering is optional.', author: 'Haruki Murakami' },
        { text: 'All the worlds a stage, and all the men and women merely players.' , author: 'William Shakespeare' },
        { text: 'Be kind, for everyone you meet is fighting a hard battle.' , author: 'Plato' },
        { text: 'Unable are the loved to die for love is immortality.' , author: 'OEmily Dickinson' },
        { text: 'Let me live, love, and say it well in good sentences.' , author: 'Sylvia Plath' },
        // Add more quotes as needed
    ]);

    console.log('Quotes have been added.');
    sequelize.close();
});
