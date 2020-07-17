export default interface ICreateUserDTO {
  username: string;
  password: string;
  name: string;
  occupation: string;
  image_url?: string;
}
