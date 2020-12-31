import './style.css';
import React from  'react';

class Draggable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="draggable-area">
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;
