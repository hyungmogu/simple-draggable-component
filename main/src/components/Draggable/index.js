import { Component } from 'react';


let componentStyle = {
    "width": "500px",
    "height": "500px",
    "position": "relative",
    "backgroundColor": "yellow"
};


class Draggable extends Component {
    render() {
        return (
            <div
                className="draggable-area"
                style={componentStyle}
                role="draggable-area"
            >
                {this.props.children}
            </div>
        );
    }
}


export default Draggable;
