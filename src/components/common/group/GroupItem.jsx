import React from "react";
import PropTypes from "prop-types";

const GroupItem = ({ item, valueProperty, selectedItem, onItemSelect }) => {
  return (
    <li
      className={"list-group-item" + (item === selectedItem ? " active" : "")}
      onClick={() => onItemSelect(item)}
      role="button"
    >
      {item[valueProperty]}
    </li>
  );
};

GroupItem.propTypes = {
  item: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired
};

export default GroupItem;
