import * as React from "react";
import * as ReactDOM from "react-dom";
// import Header from "./components/Header/Header";
import "./styles/global.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App";

const initialState = [
	'Radioactive'
]

const reducer = (state = initialState, action) => {
	if (action.type === 'ADD_TRACK'){
		return [
			...state,
			action.payload
		]
	}
	return state; 
}

let store = createStore(reducer)



const Header = () => <div>Header</div>
const Content = () => <div>Content</div>

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

  	document.getElementById("app"),
);