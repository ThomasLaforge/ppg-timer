import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/index'
import Creator from './Pages/Creator/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Executor from './Pages/Executor';
import { mainColor } from './definitions';

import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD1nWhY6OLe_JJo1vVFP9bScyPDTDwDKyQ",
  authDomain: "ppg-timer-db.firebaseapp.com",
  projectId: "ppg-timer-db"
};
const app = initializeApp(firebaseConfig);

export const api = getFirestore(app);;
export const trainingsAPI = collection(api, "trainings")

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: mainColor
    },
    secondary: {
      main: '#fad936',
    },
  },
});

const router = createHashRouter([
  { path: '/', element: <Home/> },
  { path: '/creator', element: <Creator /> },
  { path: '/executor', element: <Executor /> },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;