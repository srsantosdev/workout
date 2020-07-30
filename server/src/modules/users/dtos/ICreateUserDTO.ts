export default interface ICreateUserDTO {
  username: string;
  password: string;
  name: string;
  occupation: string;
  manager?: boolean;
}
