import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class TresureHuntApp extends Component { 
constructor(props) {
        super(props);
		this.findTresure = this.findTresure.bind(this);
        this.state = {inputArray: "",
			status:"", cellsVisisted:[],statusMessage:""};
      }
	
	handleChange = event => {
    this.setState({
      inputArray: event.target.value
    })
  }
   async componentDidMount() {
    const response = await fetch('/tresure-hunt');
    const body = await response.json();
    this.setState({tresure: body});
  }
  
  async findTresure(inputArray) {
    await fetch(`/tresure-hunt`, {
	  body: inputArray,	
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
	  .then(data => this.setState({status:data.status, cellsVisisted:data.cellsVisisted, statusMessage: data.statusMessage}));
    }

render() {
	
	const {tresure} = this.state;
    return (
	<>
		<div class="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
			 <h6>Please enter a valid array, elements of array should be separated with comma(,) </h6>
			 <label>Input Array:<textarea id="inputArray" name="inputArray" rows="10" cols="20" onChange={this.handleChange}></textarea></label>
		     <button type="submit" onClick={this.findTresure.bind(this,this.state.inputArray)}>Submit</button>
			 <table width="100%">
			  <tr>
			  <th width="20%">Status:</th>
			  <th width="60%">CellsVisited:</th>
			  <th width="20%">StausMessage:</th>
			  </tr>
			  <tr>
			  <td width="20%">{this.state.status}</td>
			  <td width="60%">{this.state.cellsVisisted}</td>
			  <td width="20%">{this.state.statusMessage}</td>
			  </tr>
			 </table>
		</div>
		</header>
		</div>
     </>
    );
  }
}
