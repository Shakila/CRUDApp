import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ListCustomersComponent from './components/ListCustomersComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import configData from "./config.json";
import NavigationComponent from './components/NavigationComponent';

function App() {
  const addCustomerPath = configData.ADD_CUSTOMER + "/:id";
  const viewCustomerPath = configData.VIEW_CUSTOMER + "/:id";
  const loggedInUser = localStorage.getItem("user");
  return (
    <div>
      <Router>
        <div className='container'>
          <HeaderComponent/>
          <NavigationComponent/>
          <div className="container">
            <Routes>
              <Route path="signin" element={<SigninComponent/>}/>
              <Route path="/" element={loggedInUser ? <ListCustomersComponent/> : <SigninComponent/>}/>{/* login if not authorized */}
              <Route path={configData.SIGNUP} element={<SignupComponent/>}/>
              <Route path={configData.CUSTOMERS} element={loggedInUser ? <ListCustomersComponent/> : <SigninComponent/>}/>
              <Route path={addCustomerPath} element={loggedInUser ? <CreateCustomerComponent/> : <SigninComponent/>}/>
              <Route path={viewCustomerPath} element={loggedInUser ? <ViewCustomerComponent/> : <SigninComponent/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        <FooterComponent/>
      </div>
      </Router>
    </div>
  );
}

export default App;
