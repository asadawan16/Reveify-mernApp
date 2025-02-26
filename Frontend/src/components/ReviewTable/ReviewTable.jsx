import { Fragment, useEffect, useState } from "react";
import classes from "./ReviewTable.module.css";
import { useSelector } from "react-redux";
import Header from "../header/header";
import ReviewDataFiltering from "./ReviewDataFiltering";
const ReviewTable = () => {
  // Assigning local States for pagination and filtered reviews
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const reviews = useSelector((state) => state.review.reviews);
  const filteredReviews = useSelector((state) => state.review.filteredReviews);
  const [displayedReviews, setDisplayedReviews] = useState(reviews);

  useEffect(() => {
    if (filteredReviews.length > 0) {
      setDisplayedReviews(filteredReviews);
    } else {
      setDisplayedReviews(reviews);
    }
  }, [filteredReviews, reviews]);
  const totalPages = Math.ceil(displayedReviews.length / itemsPerPage);

  // Pagination logic
  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = displayedReviews.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page selection from dropdown
  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
  };

  return (
    <>
      <Header />
      <div className={classes["Data-Table"]}>
        <h1>Reviews</h1>
        <>
          <ReviewDataFiltering />
          <table className={classes.table}>
            <thead className={classes.tableheader}>
              <tr>
                <th>S.no</th>
                <th>agentId</th>
                <th>agentName</th>
                <th>customerId</th>
                <th>location</th>
                <th>discountApplied</th>
                <th>orderPrice</th>
                <th>rating</th>
                <th>Review</th>
                <th>sentiment, performance ,accuracy</th>
              </tr>
            </thead>
            <tbody className={classes.tablebody}>
              {currentData.map((review, index) => (
                <Fragment key={index}>
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{review.agentId}</td>
                    <td>{review.agentName}</td>
                    <td>{review.customerId}</td>
                    <td>{review.location}</td>
                    <td>{review.discountApplied}</td>
                    <td>{review.orderPrice}</td>
                    <td>{review.rating}</td>
                    <td>{review.reviewText}</td>
                    <td>
                      {`${review.tags.sentiment}, ${review.tags.performance}, ${review.tags.accuracy}`}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className={classes.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page Selection Dropdown */}
            <select
              value={currentPage}
              className={classes["page-info"]}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default ReviewTable;
