import * as React from "react";
import {
  DataGrid,
  GridOverlay,
  useGridApiContext,
  useGridState,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <Pagination
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function SizePaginationGrid() {
  const [pageSize, setPageSize] = React.useState(50);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });

  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "Tensangna",
      col2: "Adenta Housing",
      col3: "tensangna@gmail.com",
      col4: "0225244224",
      col5: "Teddy Moses",
      col6: "2-3-2022",
      col7: "Pending",
    },
    {
      id: 2,
      col1: "Tensangna",
      col2: "Adenta Housing",
      col3: "tensangna@gmail.com",
      col4: "0225244224",
      col5: "Teddy Moses",
      col6: "2-3-2022",
      col7: "Pending",
    },
    {
      id: 4,
      col1: "Tensangna",
      col2: "Adenta Housing",
      col3: "tensangna@gmail.com",
      col4: "0225244224",
      col5: "Teddy Moses",
      col6: "2-3-2022",
      col7: "Pending",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Full Name", minWidth: 180, editable: true },
    {
      field: "col2",
      headerName: "Home Address",
      minWidth: 180,
      editable: true,
    },
    { field: "col3", headerName: "Email", minWidth: 180, editable: true },
    { field: "col4", headerName: "Phone No.", minWidth: 180, editable: true },
    { field: "col5", headerName: "Created by", minWidth: 180, editable: true },
    { field: "col6", headerName: "Date", minWidth: 180, editable: true },
    {
      field: "col7",
      headerName: "status",
      minWidth: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Rejected", "Pending", "Completed"],

      renderCell: (params) => {
        if (params.value === "Completed") {
          return (
            <Button variant="outlined" color="success" size="small">
              {params.value}
            </Button>
          );
        } else if (params.value === "Pending") {
          return (
            <Button variant="outlined" color="warning" size="small">
              {params.value}
            </Button>
          );
        } else if (params.value === "Rejected") {
          return (
            <Button variant="outlined" color="error" size="small">
              {params.value}
            </Button>
          );
        }
      },
    },
    {
      field: "col8",
      headerName: "Action",
      minWidth: 120,
      type: "actions",
      getActions: (params: GridRowsParams) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Box sx={{ float: "" }}>
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>

      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[100, 10, 20]}
        pagination
        columns={columns}
        rows={rows}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Pagination: CustomPagination,
        }}
        loading
      />
    </div>
  );
}
