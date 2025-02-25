import { Fragment, useState } from "react";
import "./DataTable.css";

const DataTable = ({ products, children, title, data, state }) => {
  return (
    <div className="Data-Table">
      <h1>{title}</h1>
      <div className="searchoption">
        <input
          type="text"
          placeholder="Search by name"
          // value={searchInput}
          // onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <table className="table">
        <thead className="tableheader">
          <tr>{children}</tr>
        </thead>
        <tbody className="tablebody">
          {state === "reviews" ? (
            <>
              {data.map((review, index) => (
                <Fragment key={index}>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.agentId}</td>
                    <td>{review.agentName}</td>
                    <td>{review.customerId}</td>
                    <td>{review.location}</td>
                    <td>{review.discountApplied}</td>
                    <td>{review.orderPrice}</td>
                    <td>{review.rating}</td>
                    <td>{review.reviewText}</td>
                    <td>{review.tags.sentiment}</td>
                    <td>{review.tags.performance}</td>
                    <td>{review.tags.accuracy}</td>
                  </tr>
                </Fragment>
              ))}
            </>
          ) : null}
          {state === "user" ? (
            <>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
