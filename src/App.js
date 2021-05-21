import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RootofEquation from './pages/RootofEquation';
import Bisection from './pages/Bisection';
import False_position from './pages/False_position';
import Onepoint from './pages/Onepoint';
import Newton from './pages/Newton';
import Secant from './pages/Secant';
import LinearAlgebra from './pages/LinearAlgebra';
import Cramer from './pages/Cramer';
import GaussElimination from './pages/GaussElimination';
import LuDecomposition from './pages/LuDecomposition';
import JacobiIteration from './pages/JacobiIteration';
import GaussSeidel from './pages/GaussSeidel';
import ConjugateGradient from './pages/ConjugateGradient';
import Interpolation from './pages/Interpolation';
import NewtonDiff from './pages/NewtonDiff';
import Largrange from './pages/Largrange';
import Splinex from './pages/Splinex';
import LeastSquares from './pages/LeastSquares';
import Linearregression from './pages/Linearregression';
import Polynomial from './pages/Polynomial';
import NewtonIterpolation from './pages/NewtonIterpolation';


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/RootofEquation' exact component={RootofEquation} />
        <Route path='/RootofEquation/Bisection' exact component={Bisection} />
        <Route path='/RootofEquation/False_position' exact component={False_position} />
        <Route path='/RootofEquation/Onepoint' exact component={Onepoint} />
        <Route path='/RootofEquation/Newton' exact component={Newton} />
        <Route path='/RootofEquation/Secant' exact component={Secant} />
        {/* Linear Algebra */}
        <Route path='/LinearAlgebra' exact component={LinearAlgebra} />
        <Route path='/LinearAlgebra/Cramer' exact component={Cramer} />
        <Route path='/LinearAlgebra/GaussElimination' exact component={GaussElimination} />
        <Route path='/LinearAlgebra/LuDecomposition' exact component={LuDecomposition} />
        <Route path='/LinearAlgebra/JacobiIteration' exact component={JacobiIteration} />
        <Route path='/LinearAlgebra/GaussSeidel' exact component={GaussSeidel} />
        <Route path='/LinearAlgebra/ConjugateGradient' exact component={ConjugateGradient} />
        {/* Interpolation */}
        <Route path='/Interpolation' exact component={Interpolation} />
        <Route path='/Interpolation/NewtonDiff' exact component={NewtonDiff} />
        <Route path='/Interpolation/Largrange' exact component={Largrange} />
        <Route path='/Interpolation/Splinex' exact component={Splinex} />
        {/* Least Squares */}
        <Route path='/LeastSquares' exact component={LeastSquares} />
        <Route path='/LeastSquares/Linearregression' exact component={Linearregression} />
        <Route path='/LeastSquares/Polynomial' exact component={Polynomial} />
        <Route path='/LeastSquares/NewtonIterpolation' exact component={NewtonIterpolation} />



      </Switch>
    </Router>
  );
}

export default App;
