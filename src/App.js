import { Route, Switch } from 'react-router-dom';
import './App.css';
import Detail from './pages/Detail/Detail';
import FormRecipe from './pages/FormRecipe/FormRecipe';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/formRecipe'><FormRecipe /> </Route>
        <Route exact path='/detail/:idRecipe'><Detail /></Route>
        <Route path='*' render={()=><NotFound />} />
      </Switch>
      
    </div>
  );
}

export default App;
