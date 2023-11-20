import { Box, useTheme } from "@mui/material"
import { useGetUserPerformanceQuery } from "state/api"
import { useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import Header from "components/Header"

const Performance = () => {
    const theme = useTheme()
    const userId = useSelector(state => state.global.userId)
    const {data, isLoading} = useGetUserPerformanceQuery(userId)
    console.log(data)
    
    const columns = [
        {
          field: '_id',
          headerName: 'ID',
          flex: 1,
        },
        {
          field: 'userId',
          headerName: 'User ID',
          flex: 1,
        },
        {
          field: 'createdAt',
          headerName: 'Created At',
          flex: 1,
        },
        {
          field: 'products',
          headerName: '# of Prdoucts',  
          flex: 0.5,
          sortable: false,
          renderCell: (params) => params.value.length
        },
        {
          field: 'cost',
          headerName: 'Cost',
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
      ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here" />
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
          rows={(data && data.sales) || []}
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

export default Performance