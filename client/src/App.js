import './App.css';
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


function App() {

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ResponsiveDrawer />
      </ThemeProvider>
    </div>
  );
}

export default App;
