import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "../common/table";
import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: {
      path: "profession.name",
      name: "Профессия"
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: {
      path: "rate",
      name: "Оценка"
    },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          id={user._id}
          onToggleBookmark={onToggleBookmark}
          status={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          delete
        </button>
      )
    }
  };

  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
