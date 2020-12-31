import './style.css';
import React from  'react';
import { AppConsumer } from '../Context';

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
        let boardWidth = parseFloat(this.props.appContext.boardWidth);
        let boardHeight = parseFloat(this.props.appContext.boardHeight);
        let boxWidth = parseFloat(this.props.appContext.boxWidth);
        let boxHeight = parseFloat(this.props.appContext.boxHeight);

        // On dropping the box, find the position of mouse drop (clientX, clientY)
        // Find change in box's position
        let diffX = e.clientX - this.state.start[0];
        let diffY = e.clientY - this.state.start[1];

        // Calculate box's new position
        // Apply new left position
        // Apply new top position
        this.setState((state, props) => {
            let newLeft = parseFloat(state.style.left) + diffX;
            let newTop = parseFloat(state.style.top) + diffY;

            // Stop if new position is out of bound
            if ((newLeft < 0) ||
                (newTop < 0) ||
                ((newLeft + boxWidth) > boardWidth) ||
                ((newTop + boxHeight) > boardHeight))
            {
                return {};
            }

            return {
                style: {
                    left: `${newLeft}px`,
                    top: `${newTop}px`
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

export default React.forwardRef((props, ref) => (
    <AppConsumer>
        { appContext =>
            <Box
                {...props}
                appContext={appContext}
                ref={ref}
            />
        }
    </AppConsumer>
));
