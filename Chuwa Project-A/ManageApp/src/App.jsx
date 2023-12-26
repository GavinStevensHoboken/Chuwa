import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './login/login'; 
import SignUp from './sign up/Sign up';
import Products from './products/Products';
import ResetPassword from './reset password/reset password';
import Header from './header/Header';
import Footer from './footer/Footer';
import Confirmation from './reset password/confirmation';

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/confirmation" element={<Confirmation/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
