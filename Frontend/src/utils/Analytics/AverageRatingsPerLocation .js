const getAverageRatingsPerLocation = (reviews) => {
  const locationRatings = {};

  reviews.forEach(({ location, rating }) => {
    if (!locationRatings[location])
      locationRatings[location] = { total: 0, count: 0 };
    locationRatings[location].total += rating;
    locationRatings[location].count += 1;
  });

  return Object.keys(locationRatings).map((location) => ({
    location,
    avgRating: (
      locationRatings[location].total / locationRatings[location].count
    ).toFixed(1),
  }));
};
export default getAverageRatingsPerLocation;
