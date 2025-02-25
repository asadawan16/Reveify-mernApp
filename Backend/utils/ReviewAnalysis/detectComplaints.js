function detectComplaints(text) {
  if (!text) return [];

  const complaintsList = {
    "Late Delivery": ["late", "delayed", "took too long", "waiting"],
    "Damaged Package": ["damaged", "broken", "cracked", "torn"],
    "Wrong Item": ["wrong item", "incorrect", "not what I ordered"],
    "Rude Behavior": ["rude", "impolite", "bad attitude"],
    "Missing Item": ["missing", "not included", "wasn't there"],
  };

  return Object.keys(complaintsList).filter((complaint) =>
    complaintsList[complaint].some((word) => text.toLowerCase().includes(word))
  );
}
module.exports = detectComplaints;
