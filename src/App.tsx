import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import type { AppState, AppDispatch } from '.';
import type { CounterState } from './Counter';
import UpdatedDataNotification from './UpdatedDataNotification';
import Counter, { CounterActions } from './Counter';
import './App.css';

function hasNewData(counterReducer: CounterState) {
  return counterReducer.hasNewData;
}

function selectAppPropsFromState(state: AppState) {
  return {
    hasNewData: hasNewData(state.counterSlice),
  }
}

interface AppProps {
  hasNewData: boolean,
  acceptNewData: () => void,
  discardNewData: () => void,
}

function App({ hasNewData, acceptNewData, discardNewData }: AppProps) {
  return (
    <article>
      <UpdatedDataNotification
        hasNewData={hasNewData}
        onAcceptNewData={acceptNewData}
        onDiscardNewData={discardNewData}
      >
        There were an update on the data. Want to retrive the updated data?
      </UpdatedDataNotification>
      <Counter />
    </article>
  );
}

const mapStateToProps = (state: AppState) => selectAppPropsFromState(state);

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators({
    acceptNewData: CounterActions.acceptNewData,
    discardNewData: CounterActions.discardNewData,
  }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
