import './App.css';
import ResponsiveDrawer from './components/ResponsiveDrawer'
import Container from '@material-ui/core/Container';
import FullWidthTabs from './components/FullWidthTabs'
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
        {/* <Container maxWidth="false">
          <FullWidthTabs />
        </Container> */}
        <ResponsiveDrawer />

      </ThemeProvider>
    </div>
  );
}

export default App;
