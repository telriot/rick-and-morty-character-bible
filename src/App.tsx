import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from 'features/main/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/index.css'
import DetailView from 'features/detail/DetailView';
function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact>
						<MainView />
					</Route>
          <Route path='/characters/:id'>
						<DetailView />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
