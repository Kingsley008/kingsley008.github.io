import React from 'react';

export default class ControllerUnit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
    }

    render() {
        var self = this;
        var styleName = 'controller-unit';

        if (self.props.arrange.isCenter) {
            styleName += ' selected';
        }

        if (self.props.arrange.inverse) {
            styleName += ' inversed';
        }

        return (
            <span className={styleName} onClick={this.handleClick}> </span>
        )
    }
}


