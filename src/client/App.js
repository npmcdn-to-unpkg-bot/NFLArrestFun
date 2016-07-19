import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';

import rest from "./rest";
import PlayerTable from "./components/PlayerTable";
import PlayerChart from "./components/PlayerChart";

const reducer = combineReducers(rest.reducers);
const store = createStore(reducer, applyMiddleware(thunk));


const select = (state) => {
  return {
    players: state.players
  };
};


const dispatchers = (dispatch) => {
  return {
    loadData: () => {
      dispatch(rest.actions.players.sync());
    }
  };
};


const SmartPlayerTable = connect(select, dispatchers)(PlayerTable);
const SmartPlayerChart = connect(select)(PlayerChart);

const App = () => {
  return (
    <div>
      <SmartPlayerChart/>
      <SmartPlayerTable/>
    </div>
  );
};


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#content')
);
