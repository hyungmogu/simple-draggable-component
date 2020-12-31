import './style.css';
import React from  'react';

let componentStyle = {
    "width": "500px",
    "height": "500px",
    "position": "relative",
    "backgroundColor": "yellow"
};

class Draggable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="draggable-area"
                style={componentStyle}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;
