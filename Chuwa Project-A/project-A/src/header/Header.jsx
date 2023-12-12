import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../auth/authActions';
import './Header.css';



function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    
    const handleSignOut = () => {
        if (isLoggedIn) {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            dispatch(logoutAction());
        } else {
            navigate('/login');
        }
    };

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
                    {isLoggedIn ? (
                        <button onClick={handleSignOut}>Sign Out</button>
                    ):(
                        // <a href="/login">Sign In</a>
                        <button onClick={handleSignOut}>Sign in</button>
                    )
                    }
                    <a href="/cart">Cart</a>
                </nav>
            </header>
    );
}

export default Header;
