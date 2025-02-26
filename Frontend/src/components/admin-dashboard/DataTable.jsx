import { Fragment, useEffect, useState } from "react";
import classes from "./DataTable.module.css";
import { Link } from "react-router-dom";
import UpdateTags from "./updateTags";
import ReviewDataFiltering from "../ReviewTable/ReviewDataFiltering";
import { useSelector } from "react-redux";

const DataTable = ({ children, title, reviewsdata, userdata, state }) => {
  const [updateTagsToggle, setToggle] = useState(false);
  const [tags, setTag] = useState({});
  const [Reviewid, setReviewid] = useState(null);
  const filteredReviews = useSelector((state) => state.review.filteredReviews);
  const [ReviewtableData, setReviewTableData] = useState(reviewsdata);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (state === "reviews") {
      setReviewTableData(
        filteredReviews.length > 0 ? filteredReviews : reviewsdata
      );
    }
  }, [filteredReviews, reviewsdata, state]);

  const totalPages = Math.ceil(
    (ReviewtableData && ReviewtableData.length
      ? ReviewtableData.length
      : userdata?.length) / itemsPerPage
  );

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData =
    state === "reviews"
      ? ReviewtableData?.length
        ? ReviewtableData.slice(indexOfFirstItem, indexOfLastItem)
        : []
      : userdata?.length
      ? userdata.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Handle page selection from dropdown
  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
  };

  return (
    <div className={classes["Data-Table"]}>
      <h1>{title}</h1>
      {state === "reviews" && <ReviewDataFiltering />}
      {!updateTagsToggle && (
        <>
          <table className={classes.table}>
            <thead className={classes.tableheader}>
              <tr>{children}</tr>
            </thead>
            <tbody className={classes.tablebody}>
              {state === "reviews" ? (
                <>
                  {currentData?.map((review, index) => (
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
                        <td>
                          <Link
                            className={classes.editbtn}
                            onClick={() => {
                              setToggle(true);
                              setTag(review.tags);
                              setReviewid(review._id);
                            }}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </>
              ) : null}
              {state === "user" ? (
                <>
                  {currentData.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </>
              ) : null}
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
      )}

      {updateTagsToggle && (
        <UpdateTags setToggle={setToggle} tags={tags} id={Reviewid} />
      )}
    </div>
  );
};

export default DataTable;
