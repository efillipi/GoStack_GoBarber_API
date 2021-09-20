import ISendDTO from '../dtos/ISendDTO';

export default interface IMailProvider {
  send(data: ISendDTO): Promise<void>;
}
