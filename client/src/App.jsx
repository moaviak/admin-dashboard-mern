import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { themeSettings } from 'theme'
import Layout from 'scenes/layout'
import Dashboard from 'scenes/dashboard'
import Products from 'scenes/products'
import Customers from 'scenes/customers'
import Transactions from 'scenes/transactions'
import Geography from 'scenes/geography'
import Overview from 'scenes/overview'
import Daily from 'scenes/daily'
import Monthly from 'scenes/monthly'
import Breakdown from 'scenes/breakdown'
import Admin from 'scenes/admin'
import Performance from 'scenes/performance'

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <Box className="app" sx={{
      '& > .MuiBox-root::-webkit-scrollbar': {
        width: '10px',
        backgroundColor: 'transparent',
      },
      '& > .MuiBox-root::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary[400]
            : theme.palette.secondary[800],
      },
      '& > .MuiBox-root::-webkit-scrollbar-thumb': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary[800]
            : theme.palette.secondary[400],
      },
    }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  )
}
export default App
