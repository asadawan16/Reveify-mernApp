const mongoose = require("mongoose");

const PointOfSalesSchema = new mongoose.Schema(
  {
    caisseEspeces: {
      billets50: Number,
      billets20: Number,
      billets10: Number,
      billets5: Number,
      monnaie: Number,
      total: Number,
    },
    caisseCheques: {
      client: String,
      montant: Number,
      total: Number,
    },
    caisseCB: {
      client: String,
      montant: Number,
      total: Number,
    },
    fondDeCaisse: Number,
    differenceFondCaisse: Number,
  },
  { timestamps: true }
);

const POSModel = mongoose.model("pos", PointOfSalesSchema);
module.exports = POSModel;
