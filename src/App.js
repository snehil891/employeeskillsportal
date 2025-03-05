import './App.css';
import HeaderNav from './Pages/HeaderNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginAndSignUp from './LoginAndSignUp/LoginAndSignUp';
import PageNotFound from './LoginAndSignUp/PageNotFound';
import Dashboard from './EmployeeSkillCrud/Dashboard';
import UpdateDetails from './EmployeeSkillCrud/UpdateDetails';
import AddSkills from './EmployeeSkillCrud/AddSkills';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAndSignUp />} />
          <Route path='/dashboard' element={<><HeaderNav /><Dashboard /></>} />
          <Route path="/dashboard/:id" element={<><HeaderNav /> <Dashboard /></>} />
          <Route path="*" element={<><PageNotFound /> <HeaderNav /></>} />
          <Route path='/update' element={<><HeaderNav /> <UpdateDetails /></>} />
          <Route path='/update/:id' element={<><HeaderNav /> <UpdateDetails /></>} />
          <Route path='/skills' element={<><HeaderNav/><AddSkills/></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
