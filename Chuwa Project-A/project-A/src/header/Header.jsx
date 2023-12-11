import { useState } from 'react';
import './Header.css';



function Header() {
    const {searchTerm, setSearchTerm} = useState('');

    return (
        <header className="header">
            <h1>Management</h1>
            <form className="search-class" action="/search" method="GET">
                <input 
                    type="search" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    name="query"
                />
                <button type="sumbit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
            <nav>
            <a href="/signin">Sign In</a>
            <a href="/cart">Cart</a>
            </nav>
        </header>
    );
}

export default Header;
