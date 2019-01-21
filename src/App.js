import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './Item';
import { IoIosSearch } from 'react-icons/io';

const API='https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };

    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  queryData(query){
    fetch(API)
    .then( results => {
      return results.json();
    }).then(data => {
      var data_filter = data.filter(x => { return x.keywords.toLowerCase().includes(query) || x.title.toLowerCase().includes(query)});
      this.setState({
        data: data_filter
      });
    })
  }

  handleEventChange(e) {
    this.setState({value: e.target.value});
  }

  handleEventSubmit(e) {
    this.queryData(this.state.value.toLowerCase());
    e.preventDefault();
  }


  render() {
    const items = this.state.data.map(function(item){
      return <Item description={item.body} title={item.title}/>;
    });
    return (
      <div className="App">
        <div className="Header">
          <h1>Toronto Waste Lookup</h1>
        </div>
        <div className="Body">
        <form className="Form" onSubmit={this.handleEventSubmit}>
          <input className="SearchBar" type="text" value={this.state.value} onChange={this.handleEventChange} />
            <IoIosSearch className="SearchButton" />
        </form>
        {items}
        </div>
      </div>
    );
  }
}

export default App;
