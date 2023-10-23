import mongoose from "mongoose";
import databaseConnection from "./databaseConnection";

export default class mongoosePromisse implements databaseConnection{
    async connect(): Promise<void> {
        try {
            await mongoose.set("strictQuery", true);

            await mongoose.connect("mongodb://0.0.0.0:27017/Coffeeplace");

            console.log("conncetion success with localhost");
        } catch (error) {
            console.log(error)
        }
    }
}