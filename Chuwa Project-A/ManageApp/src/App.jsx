import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthContext';
import SignIn from './login/login'; 
import SignUp from './sign up/SignUp';
import Products from './products/Products';
import ResetPassword from './reset password/reset password';
import Header from './header/Header';
import Footer from './footer/Footer';
import Confirmation from './reset password/confirmation';
import Cart from './products/Cart';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
