const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// items route
const items = require('./routes/itemsRoutes');
// inventory routes
const inventoryAdjustment = require('./routes/inventoryAdjustmentsRoute');
// item groups route
const itemGroups = require('./routes/itemGroupRoutes');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(items);
app.use(inventoryAdjustment);
app.use(itemGroups);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})