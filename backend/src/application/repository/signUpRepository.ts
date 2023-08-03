import User from "../../domain/entities/User";

export default interface signUpRepository{
    save(user: User):Promise<void>;
}