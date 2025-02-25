const getMostCommonComplaints = (reviews) => {
  const complaintsCount = {};

  reviews.forEach(({ complaints }) => {
    complaints.forEach((complaint) => {
      complaintsCount[complaint] = (complaintsCount[complaint] || 0) + 1;
    });
  });

  return Object.keys(complaintsCount).map((complaint) => ({
    complaint,
    count: complaintsCount[complaint],
  }));
};
export default getMostCommonComplaints;
