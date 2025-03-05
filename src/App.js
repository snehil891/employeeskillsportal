import './App.css';
import HeaderNav from './Pages/HeaderNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginAndSignUp from './LoginAndSignUp/LoginAndSignUp';
import PageNotFound from './LoginAndSignUp/PageNotFound';
import Dashboard from './EmployeeSkillCrud/Dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderNav />
        <Routes>
          <Route path="/" element={<LoginAndSignUp />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
