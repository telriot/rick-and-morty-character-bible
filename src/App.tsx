import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from 'features/main/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/index.css';
import DetailView from 'features/detail/DetailView';
import NotFound from 'features/404/NotFound';
function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={MainView} />
					<Route path='/characters/:id' component={DetailView} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
