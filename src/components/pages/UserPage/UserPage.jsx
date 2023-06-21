import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/QualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUserInfo(data));
  }, []);

  const history = useHistory();

  return userInfo ? (
    <>
      <h1>{userInfo.name}</h1>
      <h2>Профессия: {userInfo.profession.name}</h2>
      <QualitiesList qualities={userInfo.qualities} />
      <div>completedMeetings: {userInfo.completedMeetings}</div>
      <h2>Rate: {userInfo.rate}</h2>
      <button onClick={() => history.push(`/users/${userId}/edit`)}>
        Редактировать
      </button>
    </>
  ) : (
    "loading..."
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
