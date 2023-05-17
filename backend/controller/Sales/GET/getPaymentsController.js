const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const invoicesModel = require("../../../models/Sales/invoicesModel");
const packageModel = require("../../../models/Sales/packageModel");
const paymentModel = require("../../../models/Sales/paymentsModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getPaymentsController = async (req, res) => {
    try {
        const data = await paymentModel.find({}).populate([
            {
                path: 'invoice_id',
                model: invoicesModel,
                populate: {
                    path: 'delivery_id',
                    model: deliveredItemsModel,
                    populate: {
                        path: 'shipments_id',
                        model: shipmentModel,
                        populate: {
                            path: 'delivery_challans_id',
                            model: deliveryChallansModel,
                            populate: {
                                path: 'package_id',
                                model: packageModel,
                                populate: {
                                    path: 'order_id',
                                    model: salesOrderModel,
                                    populate: [
                                        {
                                            path: 'customer_id',
                                            model: customerModel,
                                        },
                                        {
                                            path: 'item_id',
                                            model: itemsModel,
                                            populate: {
                                                path: 'item_group_id',
                                                model: itemsGroupModel,
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        ]);
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getPaymentsController