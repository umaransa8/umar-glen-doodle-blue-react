import logo from './logo.svg';
import './App.css';
import MiniDrawer from './components/Drawer';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import storeValue from './store/store';
import { Provider } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';


function App() {
  const theme = createTheme();


  return (
    <ThemeProvider theme={theme}>
      <Provider store={storeValue}>
        <ConfirmProvider>
           <MiniDrawer />
          </ConfirmProvider>
       </Provider>
    </ThemeProvider>
  );
}

export default App;
