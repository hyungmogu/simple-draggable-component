import './App.css';

import { AppProvider, AppContextInterface } from './components/Context';
import Draggable from './components/Draggable';
import Box from './components/Box';


const appContext: AppContextInterface = {
  boardWidth: '500px',
  boardHeight: '500px',
  boxWidth: '100px',
  boxHeight: '100px'
};


const App = () => (
    <AppProvider value={appContext}>
        <main>
            <Draggable>
                <Box/>
                <Box/>
                <Box/>
            </Draggable>
        </main>
    </AppProvider>
);


export default App;
