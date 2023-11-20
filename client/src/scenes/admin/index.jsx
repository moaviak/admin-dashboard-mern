import { Box, useTheme } from "@mui/material"
import { useGetAdminsQuery } from "state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "components/Header"

const Admin = () => {
    const theme = useTheme()
    const {data, isLoading} = useGetAdminsQuery()
    
    const columns = [
        {
          field: '_id',
          headerName: 'ID',
          flex: 1,
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 0.5,
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          flex: 0.5,
          renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
          },
        },
        {
          field: 'country',
          headerName: 'Country',
          flex: 0.4,
        },
        {
          field: 'occupation',
          headerName: 'Occupation',
          flex: 1,
        },
        {
          field: 'role',
          headerName: 'Role',
          flex: 0.5,
        },
      ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="20px"
        height="70vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            width: '10px',
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[400]
                : theme.palette.secondary[800],
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[800]
                : theme.palette.secondary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20]}
        />
      </Box>
    </Box>
  )
}

export default Admin