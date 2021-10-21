import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loginform from './pages/Loginform'
import Register from './pages/Register';
import Home from './pages/Home';
import Usermanage from './pages/Usermanage';
import PDFprint from './componants/PDFprint';
import Nevbar from './componants/Nevbar';
import useToken  from './componants/validations/useToken';
import RecoverData from './pages/RecoverData';
import ProtectedRoute from './componants/validations/ProtectedRoute';
import Unauthorized from './componants/Unauthorized ';
import DisplayVideo from './componants/DisplayVideo';




function App() {

  const [token, setToken] = useToken('token', null);
  const [userRole, setUserRole] = useToken('userRole', null)
  
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/print/:id/:namepic" component= {PDFprint} />
          <Route exact path='/unauthorized' component={Unauthorized} />
          <Route exact path="/display/video/:videoname" component={DisplayVideo} />    
          <div>
            <Nevbar havetoken={token} />
            <Route exact path="/" >
              <Home user={userRole} /> 
            </Route>
            <Route exact path="/admin/login"> 
              <Loginform setToken={setToken}  setUserRole={setUserRole} />
            </Route>
            <ProtectedRoute exact path="/admin/register" user={userRole} component={Register} />
            <ProtectedRoute exact path="/admin/recoverdata" user={userRole} component={RecoverData} />
            <ProtectedRoute exact path="/admin/usermanage" user={userRole} component={Usermanage} /> 
          </div>
          
        </Switch>
      </Router>
      </div>
  );
}

export default App;
