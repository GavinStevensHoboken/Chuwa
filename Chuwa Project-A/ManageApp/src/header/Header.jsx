import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../firebase/AuthContext';
import { useHeader } from './HeaderContext';
import './Header.css';
import Cart from '../products/SidebarCart';

function Header() {
    const navigate = useNavigate();
    const {setUser, user} = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {setSearch} = useHeader();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleSign = () => {
        if (user) {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            setUser(null);
        }
        navigate('/login');

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(searchTerm);
    }

    return (
        <header className="header">
            <a href='/products'>Management</a>
            <form className="search-class" onSubmit={handleSubmit}>
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

                <button onClick={toggleCart}>Cart</button>
                <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
            </nav>
        </header>
    );
}

export default Header;
