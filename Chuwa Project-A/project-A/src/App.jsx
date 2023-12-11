import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './login/login'; 
import SignUp from './sign up/Sign up';
import ResetPassword from './reset password/reset password';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="resetPassword" element={<ResetPassword/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
