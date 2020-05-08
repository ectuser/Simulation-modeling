import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'

const initialState = {
	shallRedicrectToNext : false,
	amountOfEvents : 0
}

const reducer = (state = initialState, action) => {
  	if (action.type === 'CHANGE_REDIRECT'){
    	return {
			shallRedicrectToNext : !state.shallRedicrectToNext,
			amountOfEvents : state.amountOfEvents
		}
	}
	else if (action.type === 'SET_AMOUNT_OF_EVENTS'){
		return {
			shallRedicrectToNext : state.shallRedicrectToNext,
			amountOfEvents : action.payload
		}
	}
  	return state;
}

const store = createStore(reducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
  	</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
