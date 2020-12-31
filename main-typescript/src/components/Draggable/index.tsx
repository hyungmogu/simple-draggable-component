import './style.css';
import React from 'react';

type Props = {
    children: React.ReactNode
  }


class Draggable extends React.Component<Props> {
    constructor(props: Props) {
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
