import { injectable } from 'tsyringe';
import https from 'https';
import IMailProvider from '../models/IOnesignalProvider';
import ISendDTO from '../dtos/ISendDTO';

@injectable()
export default class OnesignalProvider implements IMailProvider {
  constructor() {}

  public async send({ textSend, user_id }: ISendDTO): Promise<void> {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${process.env.ONESIGNAL_BEARER}`,
    };

    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers,
    };

    const sendNotification = https.request(options);

    sendNotification.write(
      JSON.stringify({
        app_id: process.env.ONESIGNAL_APP_ID,
        contents: { en: textSend },
        channel_for_external_user_ids: 'push',
        include_external_user_ids: [user_id],
      }),
    );
    sendNotification.end();
  }
}
