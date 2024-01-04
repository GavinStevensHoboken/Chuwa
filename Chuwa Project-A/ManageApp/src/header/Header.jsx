import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../firebase/AuthContext';
import './Header.css';


function Header() {
    const navigate = useNavigate();
    const {setUser, user} = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSign = () => {
        if (user) {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            setUser(null);
        }
        navigate('/login');

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
                <button onClick={handleSign}>
                    {user ? 'Sign Out' : 'Sign In'}
                </button>
                {user ? `${user.email}, ${user.vendor ? 'vendor' : 'regular'}` : ''}

                <a href="/cart">Cart</a>
            </nav>
        </header>
    );
}

export default Header;
