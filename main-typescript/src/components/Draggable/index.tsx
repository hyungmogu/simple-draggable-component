import React, { Component, CSSProperties } from 'react';

interface Props {
    children: React.ReactNode
};

let componentStyle: CSSProperties = {
    "width": "500px",
    "height": "500px",
    "position": "relative",
    "backgroundColor": "yellow"
};


class Draggable extends Component<Props> {
    render() {
        return (
            <div className="draggable-area"
                 style={componentStyle}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;
