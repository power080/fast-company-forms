import React from "react";
import QualityItem from "./QualityItem";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((q) => (
        <QualityItem key={q._id} {...q} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default QualitiesList;
