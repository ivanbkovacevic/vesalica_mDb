import React, { Component } from 'react';

class Crtica extends Component {
state={
    message:''
}
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.msg !== prevProps.msg) {
          this.setState({message:'nema tog slova'});
        }
      }

    render() {
        return (
            <span> _{this.state.message} </span>
        );
    }
}

export default Crtica;