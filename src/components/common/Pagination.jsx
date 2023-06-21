import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, itemsOnPage, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / itemsOnPage);

  if (pageCount < 2) {
    return null;
  }

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={"page-" + p}
            className={"page-item" + (p === currentPage ? " active" : "")}
          >
            <button onClick={() => onPageChange(p)} className="page-link">
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsOnPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
