import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import type { AppState, AppDispatch } from '../';
import CounterActions from './CounterActions';

function selectCounterPropsFromState(state: AppState) {
  return {
    value: state.counterSlice.value,
  };
}

interface CounterProps {
  value: number,
  increment: () => void,
  decrement: () => void,
  startUpdateDetection: () => void,
  clearUpdateDetection: () => void,
}

function Counter({
  value, increment, decrement, startUpdateDetection, clearUpdateDetection,
}: CounterProps) {
  React.useEffect(() => {
    startUpdateDetection();
    return clearUpdateDetection;
  }, [startUpdateDetection, clearUpdateDetection]);

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

const mapStateToProps = (state: AppState) => selectCounterPropsFromState(state);

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators({
    increment: CounterActions.increment,
    decrement: CounterActions.decrement,
    startUpdateDetection: CounterActions.startUpdateDetection,
    clearUpdateDetection: CounterActions.clearUpdateDetection,
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
