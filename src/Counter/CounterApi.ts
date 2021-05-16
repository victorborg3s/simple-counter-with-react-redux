let counter = 0;

export default class CounterApi {
  public static increment(): Promise<number> {
    return new Promise((resolve) => {
      counter += 1;
      setTimeout(() => resolve(counter), 500);
    });
  }

  public static decrement(): Promise<number> {
    return new Promise((resolve) => {
      counter -= 1;
      setTimeout(() => resolve(counter), 500);
    });
  }
}
