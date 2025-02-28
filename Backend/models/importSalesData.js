// Updated importData.js
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const POSModel = require("./PointofSales");
const deliverySalesModel = require("./WebsiteDeliverySales");

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const rawData = fs.readFileSync("processed-data.json", "utf-8");
    const { pointOfSales, websiteDelivery } = JSON.parse(rawData);

    // Import Point of Sales
    await POSModel.deleteMany();
    if (pointOfSales.length) {
      await POSModel.insertMany(pointOfSales);
      console.log("POS data imported:", pointOfSales.length, "documents");
    }

    // Import Delivery Sales
    await deliverySalesModel.deleteMany();
    const deliveryDoc = new deliverySalesModel({
      paiementsCheques: websiteDelivery["Paiements Chèques"] || [],
      paiementsEspeces: websiteDelivery["Paiements Espèces"] || [],
      paiementsCbSite: websiteDelivery["Paiements CB Site"] || [],
      paiementsCbTelephone: websiteDelivery["Paiements CB Téléphone"] || [],
      virements: websiteDelivery["Virements"] || [],
      livraisonsNonPayees: websiteDelivery["Livraisons non payées"] || [],
      totalEspeces: websiteDelivery.totalEspeces,
      totalCheques: websiteDelivery.totalCheques,
      totalCbInternetPhone: websiteDelivery.totalCbInternetPhone,
    });

    await deliveryDoc.save();
    console.log("Delivery sales data imported");
  } catch (error) {
    console.error("Import error:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

importData();
