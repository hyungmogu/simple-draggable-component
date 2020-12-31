import './App.css';
import React from  'react';

// class Draggable() {
//     return (
//         <div>

//         </div>
//     );
// }

class Box extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dragStart: [0,0],
            style: {
                left: '0px',
                top: '0px'
            }
        }
    }

    handleDragStart = (e) => {
        // Store the position of mouse drag to state variable 'dragStart' when drag starts

        this.setState((state, props) => {
            return {
                start: [e.clientX, e.clientY]
            }
        });
    }

    handleDragEnd = (e) => {
        // On dropping the box, find the position of mouse drop (clientX, clientY)
        // Find change in box's position
        let diffX = e.clientX - this.state.start[0];
        let diffY = e.clientY - this.state.start[1];

        // Calculate box's new position
        // Apply new left position
        // Apply new top position
        this.setState((state, props) => {
            let newLeft = `${parseFloat(state.style.left) + diffX}px`;
            let newTop = `${parseFloat(state.style.top) + diffY}px`;

            return {
                style: {
                    left: newLeft,
                    top: newTop
                }
            }
        });
    }

    render() {
        return (
            <div style={this.state.style} className="box" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}></div>
        );
    }
}

function App() {
    return (
        <Box/>
    );
}

export default App;
