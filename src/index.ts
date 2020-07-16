import {Animations, RgbColor, routes, Time} from '7-segment-timer.contracts';

import {HttpClient} from './http-client';

export class SevenSegmentTimerClient {
  private httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.httpClient = new HttpClient(baseUrl);
  }

  public off(): Promise<void> {
    return this.httpClient.get('/off');
  }

  public showCurrentTime(colors?: RgbColor | Array<RgbColor>): Promise<void> {
    return this.httpClient.post(routes.Off, {color: colors});
  }

  public startTimer(time: Time, colors?: RgbColor | Array<RgbColor>): Promise<void> {
    return this.httpClient.post(routes.StartTimer, {time: time, color: colors});
  }

  public cancelTimer(): Promise<void> {
    return this.httpClient.post(routes.CancelTimer);
  }

  public changeColor(color: RgbColor): Promise<void> {
    return this.httpClient.post(routes.ChangeColor, {color: color});
  }

  public changeMultipleColors(colors: Array<RgbColor>): Promise<void> {
    return this.httpClient.post(routes.ChangeMultipleColors, {colors: colors});
  }

  public startAnimation(animation: Animations, colors: Array<RgbColor>): Promise<void> {
    return this.httpClient.post(routes.StartAnimation, {animation: animation, colors: colors});
  }

  public stopAnimation(): Promise<void> {
    return this.httpClient.post(routes.StopAnimation);
  }
}
