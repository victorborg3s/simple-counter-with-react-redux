import type { AppDispatch } from '../';
import { NetworkStatus } from '../NetworkStatus';
import CounterApi from './CounterApi';

export default class CounterActions {
  public static get UPDATE_CURRENT_STATUS(): string { return 'COUNTER_UPDATE_CURRENT_STATUS'};
  public static get UPDATE_VALUE(): string { return 'COUNTER_UPDATE_VALUE'};

  private static updateCurrentStatus = (status: NetworkStatus) => ({
    type: CounterActions.UPDATE_CURRENT_STATUS,
    payload: { status },
  });
  private static updateValue = (value: number) => ({
    type: CounterActions.UPDATE_VALUE,
    payload: { value },
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
}
