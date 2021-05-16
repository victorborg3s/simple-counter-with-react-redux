import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import type { AppState, AppDispatch } from '../';
import CounterActions from './CounterActions';

interface CounterProps {
  value: number,
  increment: () => void,
  decrement: () => void,
}

function Counter({ value, increment, decrement }: CounterProps) {
  return (
    <section>
      <header>
        <h1>Counter: {value}</h1>
      </header>
      <button onClick={() => decrement()}>
        decrement
      </button>
      <button onClick={() => increment()}>
        increment
      </button>
    </section>
  );
}
const mapStateToProps = (state: AppState) => state.CounterReducer;

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators({
    increment: CounterActions.increment,
    decrement: CounterActions.decrement,
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

