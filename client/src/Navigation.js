import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><NavLink to='/game'>Game</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                       
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navigation;