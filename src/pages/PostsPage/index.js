import React from "react";
import { Grid, Box } from "@mui/material";
import DataTable from "../../components/DataTable.js";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../store/api/posts";
import useSearchParams from "../../hooks/useSearchParams";
import { useState } from "react";

const columns = [
  {
    header: "ID",
    accessorKey: "post_id",
  },
  {
    header: "Title",
    accessorKey: "post_title",
  },
  {
    header: "Description",
    accessorKey: "post_description",
  },
  {
    header: "Resident",
    accessorKey: "resident_name",
    onClick: true,
  },
  {
    header: "Apartment",
    accessorKey: "apartment_name",
    onClick: true,
  },
];

function App(props) {
  const { history } = props;
  const searchParams = useSearchParams();

  const [resident, SetResident] = useState(searchParams.get("resident") || "");
  const [apartment, SetApartment] = useState(
    searchParams.get("apartment") || ""
  );

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", resident, apartment],
    queryFn: ({ queryKey }) => fetchUsers(queryKey),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleClickColumn = (cell) => {
    const {
      column: { id },
      row: {
        original: { resident_id, apartment_id },
      },
    } = cell;

    if (id === "resident_name") {
      history.push({
        pathname: "/feed",
        search: `?resident=${resident_id}`,
      });
      SetResident(resident_id);
    } else if (id === "apartment_name") {
      history.push({
        pathname: "/feed",
        search: `?apartment=${apartment_id}`,
      });
      SetApartment(apartment_id);
    }
  };

  return (
    <div className="App">
      <h2>Posts</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} padding={2}>
          <Grid item md={12} xs={12}>
            <DataTable
              data={data}
              columns={columns}
              onClickColumn={handleClickColumn}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
