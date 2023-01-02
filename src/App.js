import Table from './components/Table.js';
import './App.css';
import './components/Table.js'
import { Component, useState } from 'react';

function makeTableGroup(data, name){
  let list = {};
  data.forEach(element => {
    if(element[name] in list){
      list[element[name]] += element.amount;
    }else{
      list[element[name]] = element.amount;
    }
  });
  list = Object.entries(list);
  return (
    <table className="table-group">
      <caption>{name + " Table"}</caption>
      <thead>
        <tr>
          <th>{name}</th><th>amount</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((value) => 
            <tr key={value[0]}>
              <td>{value[0]}</td><td>{value[1]}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      list: [],
      isLoading: true
    }
  }

  componentDidMount(){
    fetch("https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json")
    .then((res) => res.json())
    .then(
      (data) => {
          this.setState({
            list: data.list.map(el => {
              let dmy = el.date.split("-");
              return {
                ...el,
                year: dmy[0],
                month: dmy[1],
                day: dmy[2],
              }
            }),
            isLoading: false
          })
      }
    )
  }
  
  render(){
    if(!this.state.isLoading){
      return (
        <div className="App">
        {makeTableGroup(this.state.list, "month")}
        {makeTableGroup(this.state.list, "year")}
        {makeTableGroup(this.state.list, "date")}
        </div>
      );
    }
    return (
      <h2>Loading...</h2>
    )
  }
}

export default App;
