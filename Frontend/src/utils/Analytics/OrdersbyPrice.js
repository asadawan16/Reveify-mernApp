const getOrdersByPriceRange = (reviews) => {
  let lowPriceOrders = 0,
    highPriceOrders = 0;

  reviews.forEach(({ orderPrice }) => {
    if (orderPrice < 100) lowPriceOrders += 1;
    else highPriceOrders += 1;
  });

  return [
    { name: "Low Price Orders", value: lowPriceOrders },
    { name: "High Price Orders", value: highPriceOrders },
  ];
};
export default getOrdersByPriceRange;
