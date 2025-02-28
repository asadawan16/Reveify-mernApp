const mongoose = require("mongoose");

const WebsiteDeliverySalesSchema = new mongoose.Schema(
  {
    paiementsCheques: [
      {
        name: String,
        amount: Number,
        banque: String,
        numero: String,
        remarques: String,
        sap: String,
      },
    ],
    paiementsEspeces: [
      {
        name: String,
        amount: Number,
        remarques: String,
        sap: String,
      },
    ],
    paiementsCbSite: [
      {
        name: String,
        amount: Number,
        remarques: String,
        sap: String,
      },
    ],
    paiementsCbTelephone: [
      {
        name: String,
        amount: Number,
        remarques: String,
        sap: String,
      },
    ],
    virements: [
      {
        name: String,
        amount: Number,
        remarques: String,
        sap: String,
      },
    ],
    livraisonsNonPayees: [
      {
        name: String,
        amount: Number,
        remarques: String,
        sap: String,
      },
    ],
    totalEspeces: Number,
    totalCheques: Number,
    totalCbInternetPhone: Number,
  },
  { timestamps: true }
);

const deliverySalesModel = mongoose.model(
  "deliverySales",
  WebsiteDeliverySalesSchema
);
module.exports = deliverySalesModel;
