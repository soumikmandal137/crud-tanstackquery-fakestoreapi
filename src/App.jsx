// import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import Route from "./routes/Route"
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Toaster } from 'sonner'
import Theme from "./Theme/Theme"

function App() {
const queryClient = new QueryClient();

  return (
    <>
    <ThemeProvider theme={Theme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <Toaster position='top-right'/>
        <RouterProvider router={Route}/>
      </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
