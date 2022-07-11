import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListCustomersComponent from './components/ListCustomersComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import SignupComponent from './components/SignupComponent';
import SigninComponent from './components/SigninComponent';
import configData from "./config.json";

function App() {
  const addCustomerPath = configData.ADD_CUSTOMER + "/:id";
  const viewCustomerPath = configData.VIEW_CUSTOMER + "/:id";
  return (
    <div>
      <Router>
        <div className='container'>
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<SigninComponent/>}></Route>
              <Route path={configData.SIGNUP} element={<SignupComponent/>}></Route>
              <Route path={configData.CUSTOMERS} element={<ListCustomersComponent/>}></Route>
              <Route path={addCustomerPath} element={<CreateCustomerComponent/>}></Route>
              <Route path={viewCustomerPath} element={<ViewCustomerComponent/>}></Route> 
            </Routes>
          </div>
        <FooterComponent/>
      </div>
      </Router>
    </div>
  );
}

export default App;
