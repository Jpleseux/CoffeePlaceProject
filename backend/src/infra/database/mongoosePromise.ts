import mongoose from "mongoose";
import databaseConnection from "./databaseConnection";

export default class mongoosePromisse implements databaseConnection{
    async connect(): Promise<void> {
        try {
            await mongoose.set("strictQuery", true);

            await mongoose.connect("mongodb+srv://joaopleseux:mm24~~92H@cluster0.hq2z8.mongodb.net/")  ;
            console.log("Connection success");
        } catch (error) {
            console.log("Connection failed:"+ error);
        }
    }
}