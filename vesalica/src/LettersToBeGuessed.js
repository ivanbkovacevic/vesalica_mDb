import React, { Component } from 'react';

class LettersToBeGuessed extends Component {

    render() {
        let isUsed=this.props.isUsed;
        let classUsed='';
        if(isUsed){
            classUsed='-used';
        }
        return (
            <button onClick={this.props.clicked} disabled={isUsed} className={`btnmoj-slova${classUsed}`}>{this.props.value}</button>
        );
    }
}

export default LettersToBeGuessed;