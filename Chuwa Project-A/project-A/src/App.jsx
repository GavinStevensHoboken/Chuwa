import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './login/login'; 
import SignUp from './sign up/Sign up';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
