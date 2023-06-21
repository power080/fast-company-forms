import React from "react";
import PropTypes from "prop-types";
import GroupItem from "./GroupItem";

const GroupList = ({
  items,
  keyProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => (
  <ul className="list-group">
    {Array.isArray(items)
      ? items.map((item) => (
          <GroupItem
            key={item[keyProperty]}
            item={item}
            keyProperty={keyProperty}
            valueProperty={valueProperty}
            selectedItem={selectedItem}
            onItemSelect={onItemSelect}
          />
        ))
      : Object.values(items).map((item) => (
          <GroupItem
            key={item[keyProperty]}
            item={item}
            keyProperty={keyProperty}
            valueProperty={valueProperty}
            selectedItem={selectedItem}
            onItemSelect={onItemSelect}
          />
        ))}
  </ul>
);

GroupList.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  keyProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default GroupList;
