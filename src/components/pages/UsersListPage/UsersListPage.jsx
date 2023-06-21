import React, { useEffect, useState } from "react";
import _ from "lodash";
import api from "../../../api";
import SearchStatus from "../../ui/SearchStatus";
import Pagination from "../../common/Pagination";
import UsersTable from "../../ui/UsersTable";
import Groups from "../../common/group";
import { paginate } from "../../../utils/paginate";

const UsersListPage = () => {
  const usersOnPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const [professions, setProfessions] = useState();

  const [selectedProf, setSelectedProf] = useState();

  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user._id === userId ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearch("");
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const [search, setSearch] = useState("");

  const handleSearch = ({ target }) => {
    const search = target.value;

    setSearch(search);

    setSelectedProf();
  };

  if (users) {
    const filteredUsers = search
      ? users.filter(
          (user) => user.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      : selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;

    const usersLength = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, usersOnPage);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <Groups
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus userCount={usersLength} />

          <input
            value={search}
            type="search"
            placeholder="Search"
            className="form-control"
            onChange={handleSearch}
          />

          {usersLength > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={usersLength}
              itemsOnPage={usersOnPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return "loading...";
  }
};

export default UsersListPage;
