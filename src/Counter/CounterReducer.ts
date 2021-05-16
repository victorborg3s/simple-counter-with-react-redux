import { AnyAction } from "redux";
import { NetworkStatus } from "../NetworkStatus";
import CounterActions from './CounterActions';

interface CounterState {
  status: NetworkStatus,
  value: number,
}

const initialState: CounterState = {
  status: NetworkStatus.idle,
  value: 0,
};

const mapActionTypeToReducer = {
  [CounterActions.UPDATE_CURRENT_STATUS]: (state: CounterState, payload: { status: NetworkStatus }): CounterState => {
    return {
      ...state,
      status: payload.status,
    };
  },
  [CounterActions.UPDATE_VALUE]: (state: CounterState, payload: { value: number }): CounterState => {
    return {
      ...state,
      value: payload.value,
    };
  },
};

export default function CounterReducer(state = initialState, action: AnyAction) {
  const actionReducer = mapActionTypeToReducer[action.type];
  if (actionReducer == null) {
    return state;
  } else {
    return actionReducer(state, action.payload);
  }
}
