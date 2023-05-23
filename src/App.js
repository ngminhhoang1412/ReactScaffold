import { useState } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import SetupInterceptors from './services/interceptor';
import {useNavigate} from "react-router-dom";

// ==============================|| APP ||============================== //

const App = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  if (!isLoaded) {
    setIsLoaded(true);
    SetupInterceptors(navigate);
  }

  return (
      <StyledEngineProvider injectFirst>
          <CssBaseline />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes />
      </StyledEngineProvider>
  );
};

export default App;

