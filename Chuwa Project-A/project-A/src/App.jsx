import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './login/login'; // 假设您的登录页面组件名为 SignIn
import SignUp from './sign up/Sign up'; // 您新创建的注册页面组件

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

export default App
