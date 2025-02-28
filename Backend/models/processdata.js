// Updated processWorkbook.js
const XLSX = require("xlsx");
const fs = require("fs");

// Custom processor for Point of Sales data
const processPOSSheet = (sheet) => {
  const posData = {
    caisseEspeces: {
      billets50: sheet["B9"]?.v || 0,
      billets20: sheet["B10"]?.v || 0,
      billets10: sheet["B11"]?.v || 0,
      billets5: sheet["B12"]?.v || 0,
      monnaie: sheet["B13"]?.v || 0,
      total: sheet["B15"]?.v || 0,
    },
    caisseCheques: {
      client: sheet["D10"]?.v || "",
      montant: sheet["D11"]?.v || 0,
      total: sheet["D15"]?.v || 0,
    },
    caisseCB: {
      client: sheet["F10"]?.v || "",
      montant: sheet["F11"]?.v || 0,
      total: sheet["F15"]?.v || 0,
    },
    fondDeCaisse: sheet["B16"]?.v || 0,
    differenceFondCaisse: sheet["K16"]?.v || 0,
  };
  return posData;
};

// Custom processor for Delivery Sales data
const processDeliverySheet = (sheet) => {
  const sections = [
    "Paiements Chèques",
    "Paiements Espèces",
    "Paiements CB Site",
    "Paiements CB Téléphone",
    "Virements",
    "Livraisons non payées",
  ];

  const deliveryData = {};
  let currentSection = null;

  const range = XLSX.utils.decode_range(sheet["!ref"]);
  for (let row = range.s.r; row <= range.e.r; row++) {
    const sectionCell = XLSX.utils.encode_cell({ r: row, c: 0 });
    const cellValue = sheet[sectionCell]?.v;

    if (sections.includes(cellValue)) {
      currentSection = cellValue;
      deliveryData[currentSection] = [];
      continue;
    }

    if (currentSection && row > 0) {
      const entry = {
        name: sheet[XLSX.utils.encode_cell({ r: row, c: 0 })]?.v || "",
        amount: sheet[XLSX.utils.encode_cell({ r: row, c: 3 })]?.v || 0,
        banque: sheet[XLSX.utils.encode_cell({ r: row, c: 4 })]?.v || "",
        numero: sheet[XLSX.utils.encode_cell({ r: row, c: 5 })]?.v || "",
        remarques: sheet[XLSX.utils.encode_cell({ r: row, c: 6 })]?.v || "",
        sap: sheet[XLSX.utils.encode_cell({ r: row, c: 10 })]?.v || "",
      };
      deliveryData[currentSection].push(entry);
    }
  }

  // Process totals
  return {
    ...deliveryData,
    totalEspeces: sheet["D104"]?.v || 0,
    totalCheques: sheet["D103"]?.v || 0,
    totalCbInternetPhone: sheet["D105"]?.v || 0,
  };
};

// Main processing function
const processWorkbook = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const results = {
    pointOfSales: [],
    websiteDelivery: {},
  };

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];

    if (sheetName === "2") {
      // Process only the second sheet
      results.pointOfSales.push(processPOSSheet(sheet));
      results.websiteDelivery = processDeliverySheet(sheet);
    }
  });

  return results;
};

// Save processed data
const filePath = "./calcitetestfile.xlsx";
const processedData = processWorkbook(filePath);
fs.writeFileSync("processed-data.json", JSON.stringify(processedData, null, 2));
console.log("Data processing complete.");
