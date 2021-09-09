import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loginform from './componants/Loginform';
import Register from './componants/Register';
import Home from './componants/Home';
import Sorting from './componants/Sorting';


function App()  {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component= {Home} />
        <Route exact path="/admin/login" component={Loginform}/>
        <Route exact path="/admin/register" component= {Register} />
        <Route exact path="/api/filter" component= {Sorting} />
      </Switch>
    </Router>
  );
}

export default App;
