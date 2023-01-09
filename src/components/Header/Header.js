import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <nav className='header'>
            <div><h1>Football Point Table Manager</h1></div>
            <div>
                <a href='user-guide'>User Guide</a>
                <a href='about'>About</a>
            </div>
        </nav>
    );
};

export default Header;