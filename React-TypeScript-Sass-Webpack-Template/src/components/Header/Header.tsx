import * as React from "react";
import "./Header.scss";

interface IProps {
	name: string;
	count : number
}
interface IState{
	name: string,
	count : number
}

export default class Header extends React.Component<IProps, IState> {
	constructor(props : IProps){
		super(props);

    	this.state = {
			name : props.name,
			count : props.count
		};
	}
  	public render() {
    	return (
        	<header>
            	Hello {this.state.name}
				<div className="count">{this.state.count}</div>
				<button onClick={this.ButtonClickHandler}>+1</button>
        	</header>
		);
	}
	private ButtonClickHandler = async () => {
		this.setState({
			count : this.state.count + 1
		})
	}
}