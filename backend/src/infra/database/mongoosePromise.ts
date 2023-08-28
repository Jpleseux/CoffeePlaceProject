import mongoose from "mongoose";
import databaseConnection from "./databaseConnection";

export default class mongoosePromisse implements databaseConnection{
    async connect(): Promise<void> {
        try {
            await mongoose.set("strictQuery", true);

            await mongoose.connect("mongodb://localhost:27017/Coffeeplace");

            console.log("conncetion success with localhost")
        } catch  {
            try {
                await mongoose.set("strictQuery", true);

                await mongoose.connect("mongodb+srv://joaopleseux:mm24~~92H@cluster0.hq2z8.mongodb.net/")  ;
            console.log("Connection success with atlas");
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
    }
}