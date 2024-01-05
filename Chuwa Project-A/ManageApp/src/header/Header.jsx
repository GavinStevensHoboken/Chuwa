import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction, loginAction } from '../auth/authActions';
import { jwtDecode } from 'jwt-decode';
import './Header.css';
import { addItem } from '../auth/cartActions';
import { setCartItems } from '../auth/cartActions';



function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    // const [cart, setCart] = useState({ items: [] });

    useEffect(() => {
        fetch('http://localhost:3000/login', {credentials: 'include'})
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    dispatch(loginAction());
                } else {
                }
            });
        const cookieArray = document.cookie.split('; ');
        const cookie = cookieArray.find(c => c.startsWith('token='));
        if (cookie) {
            const token = cookie.split('=')[1];
            const decoded = jwtDecode(token);
            const userId = decoded.user.id;
    
            fetch(`http://localhost:3000/api/getCart/${userId}`, {credentials: 'include'})
                .then(response => response.json())
                .then(cartData => {
                    // setCart(cartData); 
                    dispatch(setCartItems(cartData.items))
            });
        }
    }, []);
    
    const handleSign = () => {
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
                    <button onClick={handleSign}>{
                        isLoggedIn ? 'Sign Out' : 'Sign In'
                    }</button>
                    <a href="/cart">Cart 
                        {cart.items.length === 0 ? (
                        ''):(<strong> {cart.items.length}</strong>)}
                    </a>
                </nav>
            </header>
    );
}

export default Header;
