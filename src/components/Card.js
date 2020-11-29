import React from 'react';
export default class CardMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state={

        };
    }

    render() {
        console.log(this.props.id)
        return (
            <div>
                Card id : {this.props.id}
            </div>
        );
    }
}