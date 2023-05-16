const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const packageModel = require("../../../models/Sales/packageModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getDeliveredItemsController = async (req, res) => {
    try {
        const data = await deliveredItemsModel.find({}).populate([
            {
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
                                    model: customerModel
                                },
                                {
                                    path: 'item_id',
                                    model: itemsModel,
                                    populate: {
                                        path: 'item_group_id',
                                        model: itemsGroupModel
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ])
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getDeliveredItemsController