import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (column.component) {
      const component = column.component;

      if (typeof component === "function") {
        return component(item);
      }

      return component;
    }

    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.values(columns).map((column) => (
            <td key={JSON.stringify(column)}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
