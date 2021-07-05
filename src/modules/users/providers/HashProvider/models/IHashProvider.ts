export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  comparreHash(payload: string, hashed: string): Promise<boolean>;
}
