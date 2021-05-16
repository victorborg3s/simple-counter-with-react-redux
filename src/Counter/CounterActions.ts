import type { AppDispatch, AppState } from '../';
import { NetworkStatus } from '../NetworkStatus';
import CounterApi from './CounterApi';

export default class CounterActions {
  public static get UPDATE_CURRENT_STATUS(): string { return 'COUNTER_UPDATE_CURRENT_STATUS'};
  public static get UPDATE_VALUE(): string { return 'COUNTER_UPDATE_VALUE'};
  public static get UPDATE_DETECTION_INTERVAL(): string { return 'COUNTER_UPDATE_DETECTION_INTERVAL'};
  public static get NEW_DATA_DETECTED(): string { return 'COUNTER_NEW_DATA_DETECTED'};
  public static get ACCEPT_NEW_DATA(): string { return 'COUNTER_ACCEPT_NEW_DATA'};
  public static get DISCARD_NEW_DATA(): string { return 'COUNTER_DISCARD_NEW_DATA'};

  private static updateCurrentStatus = (status: NetworkStatus) => ({
    type: CounterActions.UPDATE_CURRENT_STATUS,
    payload: { status },
  });

  private static updateValue = (value: number) => ({
    type: CounterActions.UPDATE_VALUE,
    payload: { value },
  });

  private static updateDetectionInterval = (runningUpdateDetectionTimeout: NodeJS.Timeout | null) => ({
    type: CounterActions.UPDATE_DETECTION_INTERVAL,
    payload: { runningUpdateDetectionTimeout },
  });

  private static newDataDetected = (newValue: number) => ({
    type: CounterActions.NEW_DATA_DETECTED,
    payload: { newValue }
  });

  public static acceptNewData = () => ({
    type: CounterActions.ACCEPT_NEW_DATA,
  });

  public static discardNewData = () => ({
    type: CounterActions.DISCARD_NEW_DATA,
  });

  public static increment = () => (dispatch: AppDispatch) => {
    dispatch(CounterActions.updateCurrentStatus(NetworkStatus.loading));
    CounterApi.increment()
      .then((value) => {
        dispatch(CounterActions.updateValue(value));
        dispatch(CounterActions.updateCurrentStatus(NetworkStatus.idle));
      })
      .catch(() => NetworkStatus.error);
  };

  public static decrement = () => (dispatch: AppDispatch) => {
    dispatch(CounterActions.updateCurrentStatus(NetworkStatus.loading));
    CounterApi.decrement()
      .then((value) => {
        dispatch(CounterActions.updateValue(value));
        dispatch(CounterActions.updateCurrentStatus(NetworkStatus.idle));
      })
      .catch(() => NetworkStatus.error);
  };

  public static startUpdateDetection = () => (dispatch: AppDispatch, getState: () => AppState) => {
    const runningUpdateDetectionTimeout = setInterval(() => {
      CounterApi.queryValue().then((value) => {
        if (value !== getState().counterSlice.value) {
          dispatch(CounterActions.newDataDetected(value));
        }
      });
    }, 12000);
    dispatch(CounterActions.updateDetectionInterval(runningUpdateDetectionTimeout));
  };

  public static clearUpdateDetection = () => (dispatch: AppDispatch, getState: () => AppState) => {
    const runningUpdateDetectionTimeout = getState().counterSlice.runningUpdateDetectionTimeout;
    if (runningUpdateDetectionTimeout != null) {
      clearInterval(runningUpdateDetectionTimeout);
    }
    dispatch(CounterActions.updateDetectionInterval(null));
  };
}
