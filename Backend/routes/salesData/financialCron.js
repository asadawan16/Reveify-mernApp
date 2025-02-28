const cron = require("node-cron");
const POSModel = require("../../models/PointofSales");
const deliverySalesModel = require("../../models/WebsiteDeliverySales");

// Create reusable function
const fetchAndLogCombinedData = async () => {
  try {
    const posData = await POSModel.findOne().sort({ createdAt: -1 });
    const deliveryData = await deliverySalesModel
      .findOne()
      .sort({ createdAt: -1 });

    if (!posData || !deliveryData) {
      console.log("[Cron] Data not found in database");
      return;
    }

    const combinedData = [
      // ... (same calculation logic as your route)
      {
        category: "Espèces",
        total: posData.caisseEspeces.total + deliveryData.totalEspeces,
        details: {
          pos: posData.caisseEspeces,
          delivery: deliveryData.paiementsEspeces,
        },
      },
      // ... rest of your categories
    ];

    console.log("[Cron] Latest combined data:", {
      timestamp: new Date().toISOString(),
      data: combinedData,
    });
  } catch (error) {
    console.error("[Cron Error]", error.message);
  }
};

// Schedule cron job to run every 20 seconds
cron.schedule("*/20 * * * * *", () => {
  console.log(
    `[Cron] Running scheduled job at ${new Date().toLocaleTimeString()}`
  );
  fetchAndLogCombinedData();
});

// For immediate testing on server start
fetchAndLogCombinedData();
