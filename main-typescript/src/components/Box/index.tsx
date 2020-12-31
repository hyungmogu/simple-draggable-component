import './style.css';
import React from  'react';
import { AppConsumer, AppContextInterface } from '../Context';

interface Props {
    appContext?: AppContextInterface
};

interface Style {
    left: string,
    top: string
};

interface State {
    dragStart: number[],
    style: Style
};

class Box extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dragStart: [0,0],
            style: {
                left: '0px',
                top: '0px'
            }
        }
    }

    public handleDragStart = (e: any) => {
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
        let newLeft: number = parseFloat(this.state.style.left) + diffX;
        let newTop: number = parseFloat(this.state.style.top) + diffY;

        // Stop if new posit    ion is out of bound
        if ((newLeft < 0) ||
            (newTop < 0) ||
            ((newLeft + boxWidth) > boardWidth) ||
            ((newTop + boxHeight) > boardHeight))
        {
            return;
        }

        this.setState({
            style: {
                left: `${newLeft}px`,
                top: `${newTop}px`
            }
        });
    }

    public render() {
        return (
            <div style={this.state.style} className="box" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}></div>
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
