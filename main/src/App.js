import './App.css';
import React from  'react';

import { AppProvider } from './components/Context';
import Draggable from './components/Draggable';
import Box from './components/Box';

function App() {
    return (
        <AppProvider value={{
            boardWidth: '500px',
            boardHeight: '500px',
            boxWidth: '100px',
            boxHeight: '100px'}}
        >
            <main>
                <Draggable>
                    <Box key={1}/>
                    <Box key={2}/>
                    <Box key={3}/>
                </Draggable>
            </main>
        </AppProvider>
    );
}

export default App;
