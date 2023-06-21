import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/pages/UserPage";
import UsersListPage from "../components/pages/UsersListPage";
import UserEditPage from "../components/pages/UserEditPage/UserEditPage";

const Users = () => {
  const params = useParams();

  const { userId, edit } = params;

  return (
    <>
      {userId ? (
        edit ? (
          edit.toLowerCase() === "edit" ? (
            <UserEditPage userId={userId} />
          ) : (
            <Redirect to={`/users/${userId}`} />
          )
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
