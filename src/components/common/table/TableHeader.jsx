import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.values(columns).map((column) => (
          <th
            key={JSON.stringify(column)}
            onClick={column.path ? () => handleSort(column.path) : undefined}
            scope="col"
            {...{ role: column.path && "button" }}
            rel={column.path}
          >
            {column.name}
            {selectedSort.path === column.path && (
              <i
                className={
                  "bi bi-caret" +
                  (selectedSort.order === "asc" ? "-up" : "-down") +
                  "-fill"
                }
              ></i>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
