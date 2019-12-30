import * as insights from 'insights-js';
import { INSIGHTS_ID } from '../constants';

export const init = (): void => {
  insights.init(INSIGHTS_ID);
  insights.trackPages();
};

export const track = (payload: insights.TrackEventPayload): void => {
  payload.parameters = Object.assign(payload.parameters, {
    locale: insights.parameters.locale(),
    screenType: insights.parameters.screenType(),
  });
  insights.track(payload);
};
