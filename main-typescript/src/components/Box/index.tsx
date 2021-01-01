import React, { Component, CSSProperties } from 'react';
import { AppConsumer, AppContextInterface } from '../Context';

interface Props {
    appContext?: AppContextInterface
};

interface State {
    dragStart: number[],
    additionalStyles: {
        left: string,
        top: string
    }
};

let componentStyle: CSSProperties = {
    "width": "100px",
    "height": "100px",
    "backgroundColor": "blue",
    "display": "inline-block",
    "position": "absolute"
};


class Box extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dragStart: [0,0],
            additionalStyles: {
                left: '0px',
                top: '0px'
            }
        }
    }

    public handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // Store the position of mouse drag to state variable 'dragStart' when drag starts
        let clientX: number = e.clientX;
        let clientY: number = e.clientY;

        this.setState({
            dragStart: [clientX, clientY]
        });
    }

    public handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        if (!this.props.appContext) {
            return;
        }

        let boardWidth: number = parseFloat(this.props.appContext.boardWidth);
        let boardHeight: number = parseFloat(this.props.appContext.boardHeight);
        let boxWidth: number = parseFloat(this.props.appContext.boxWidth);
        let boxHeight: number = parseFloat(this.props.appContext.boxHeight);

        // On dropping the box, find the position of mouse drop (clientX, clientY)
        // Find change in box's position
        let diffX: number = e.clientX - this.state.dragStart[0];
        let diffY: number = e.clientY - this.state.dragStart[1];

        // Calculate box's new position
        // Apply new left position
        // Apply new top position
        let newLeft: number = parseFloat(this.state.additionalStyles.left) + diffX;
        let newTop: number = parseFloat(this.state.additionalStyles.top) + diffY;

        // Stop if new posit    ion is out of bound
        if ((newLeft < 0) ||
            (newTop < 0) ||
            ((newLeft + boxWidth) > boardWidth) ||
            ((newTop + boxHeight) > boardHeight))
        {
            return;
        }

        this.setState({
            additionalStyles: {
                left: `${newLeft}px`,
                top: `${newTop}px`
            }
        });
    }

    public render() {
        return (
            <div className="box"
                 style={{...componentStyle , ...this.state.additionalStyles}}
                 draggable="true"
                 onDragStart={this.handleDragStart}
                 onDragEnd={this.handleDragEnd}
            ></div>
        );
    }
}


export default React.forwardRef<Box,Props>((props, ref) => (
    <AppConsumer>
        { appContext =>
            <Box
                {...props}
                appContext={appContext as AppContextInterface}
                ref={ref}
            />
        }
    </AppConsumer>
));
