import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext';
import { logoutAction } from '../auth/authActions';
import './Header.css';



function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const handleSign = () => {
        if (isAuthenticated) {
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
                    <button onClick={handleSign}>{
                        isAuthenticated ? 'Sign Out' : 'Sign In'
                    }</button>
                    <a href="/cart">Cart</a>
                </nav>
            </header>
    );
}

export default Header;
