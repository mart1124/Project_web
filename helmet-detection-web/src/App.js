import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loginform from './pages/Loginform'
import Register from './pages/Register';
import Home from './pages/Home';
import Sorting from './componants/Sorting';
import PDFprint from './componants/PDFprint';
import Nevbar from './componants/Nevbar';


function App() {
  return (
  
    <Router>
      <Switch>
        <Route exact path="/" component= {Home} />
        <Route exact path="/admin/login" component={Loginform}/>
        <Route path="/admin/register" component= {Register} />
        <Route exact path="/api/filter" component= {Sorting} />
        <Route path="/print/:id/:namepic" component= {PDFprint} />
      </Switch>
    </Router>
  );
}

export default App;
