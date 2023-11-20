import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme, Box } from '@mui/material'
import { useGetTransactionsQuery } from 'state/api'
import Header from 'components/Header'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Transactions = () => {
  const theme = useTheme()

  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  })

  const [searchInput, setSearchInput] = useState('')

  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User Id',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="75vh"
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
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[20, 50, 100]}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  )
}
export default Transactions
