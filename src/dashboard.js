import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { getUsers } from "./service/user-service";

export default function DashBoard() {
  const [getUserData, setGetUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUsers();
        setGetUserData(userDetails);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); 

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Link to={`/user-details/${params.row.id}`}>
          <img
            src={params.row.avatar_url}
            alt="Avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </Link>
      ),
    },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "username", headerName: "Username", width: 130 },
  ];

  const rows = getUserData.map((user, index) => ({
    id: user.id,
    avatar_url: user.avatar_url,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  return (
    <div className="pt-5">
      <div className="text-center candiSideHeading pt-5"> USER LIST </div>
      <div style={{ height: "100%", width: "100%" }} className="pt-5 px-5">
        <DataGrid rows={rows} columns={columns} pageSize={5} pagination />
      </div>
    </div>
  );
}
