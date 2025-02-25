const getTopAndBottomAgents = (reviews) => {
  const agentRatings = {};

  reviews.forEach(({ agentName, rating }) => {
    if (!agentRatings[agentName])
      agentRatings[agentName] = { total: 0, count: 0 };
    agentRatings[agentName].total += rating;
    agentRatings[agentName].count += 1;
  });

  const sortedAgents = Object.keys(agentRatings)
    .map((agentName) => ({
      agentName,
      avgRating: (
        agentRatings[agentName].total / agentRatings[agentName].count
      ).toFixed(1),
    }))
    .sort((a, b) => b.avgRating - a.avgRating);

  return {
    topAgents: sortedAgents.slice(0, 5),
    bottomAgents: sortedAgents.slice(-5),
  };
};
export default getTopAndBottomAgents;
