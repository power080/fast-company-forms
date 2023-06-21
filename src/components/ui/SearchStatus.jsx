import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ userCount }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанут";
    return "человек тусанет";
  };

  return (
    <h2>
      <span className={"badge " + (userCount > 0 ? "bg-primary" : "bg-danger")}>
        {userCount > 0
          ? `${userCount + " " + renderPhrase(userCount)} с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  userCount: PropTypes.number.isRequired
};

export default SearchStatus;
