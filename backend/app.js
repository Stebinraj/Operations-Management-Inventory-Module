const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// items route
const items = require('./routes/Inventory/itemsRoutes');
// inventory routes
const inventoryAdjustment = require('./routes/Inventory/inventoryAdjustmentsRoute');
// item groups route
const itemGroups = require('./routes/Inventory/itemGroupRoutes');
// customers route
const customers = require('./routes/Sales/customersRoute');
// sales order routes
const salesOrder = require('./routes/Sales/salesOrderRoutes');
// cart routes
const cart = require('./routes/Sales/cartRoutes');
// package route
const package = require('./routes/Sales/packageRoute');
// delivery challans route
const deliveryChallans = require('./routes/Sales/deliveryChallansRoute');
// shipment route
const shipment = require('./routes/Sales/shipmentRoutes');
// delivered items route
const deliveredItems = require('./routes/Sales/deliveredItemsRoute');
// invoices route
const invoices = require('./routes/Sales/invoicesRoute');
// payments route
const payments = require('./routes/Sales/paymentsRoute');
// return processed items route
const returnsProcessedItems = require('./routes/Sales/returnsProcessedItemsRoute');
// returned items route
const returnedItems = require('./routes/Sales/returnedItemsRoute');
// credit notes route
const creditNotes = require('./routes/Sales/creditNotesRoute');
// vendors route
const vendors = require('./routes/Purchase/vendorsRoute');
// purchase cart routes
const purchaseCart = require('./routes/Purchase/purchaseCartRoute');
// purchase orders route
const purchaseOrders = require('./routes/Purchase/purchaseOrdersRoute');
// received purchase orders route
const receivedPurchaseOrders = require('./routes/Purchase/receivedPurchaseOrdersRoute');
// bills route
const bills = require('./routes/Purchase/billsRoute');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(items);
app.use(inventoryAdjustment);
app.use(itemGroups);
app.use(customers);
app.use(salesOrder);
app.use(cart);
app.use(package);
app.use(deliveryChallans);
app.use(shipment);
app.use(deliveredItems);
app.use(invoices)
app.use(payments)
app.use(returnsProcessedItems);
app.use(returnedItems);
app.use(creditNotes);
app.use(vendors);
app.use(purchaseCart);
app.use(purchaseOrders);
app.use(receivedPurchaseOrders);
app.use(bills);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})