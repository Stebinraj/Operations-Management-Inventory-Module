const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('images'));

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
// bill payments route
const billPayments = require('./routes/Purchase/billPaymentsRoute');
// vendor credits route
const vendorCredits = require('./routes/Purchase/vendorCreditsRoute');
// inventory summary route
const inventorySummary = require('./routes/Dashboard/inventorySummaryRoute');
// orders summary route
const ordersSummary = require('./routes/Dashboard/ordersSummaryRoute');
// product sales summary route
const productSalesSummary = require('./routes/Dashboard/productSalesSummaryRoute');
// customer count route
const customerCountSummary = require('./routes/Dashboard/customersCountRoute');
// vendors count route
const vendorsCountSummary = require('./routes/Dashboard/vendorsCountRoute');
// packed items summary route
const packedItemsSummary = require('./routes/Dashboard/packedItemsSummaryRoute');
// shipped items summary route
const shippedItemsSummary = require('./routes/Dashboard/shippedItemsSummaryRoute');
// delivered items summary
const deliveredItemsSummary = require('./routes/Dashboard/deliveredItemsSummaryRoute');
// returned items summary
const returnedItemsSummary = require('./routes/Dashboard/returnedItemsSummaryRoute');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(path.join(__dirname,'/build')));
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
app.use(billPayments);
app.use(vendorCredits);
app.use(inventorySummary);
app.use(ordersSummary);
app.use(productSalesSummary);
app.use(customerCountSummary);
app.use(vendorsCountSummary);
app.use(packedItemsSummary);
app.use(shippedItemsSummary);
app.use(deliveredItemsSummary);
app.use(returnedItemsSummary);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})