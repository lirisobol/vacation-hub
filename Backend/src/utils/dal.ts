import { appConfig } from "./app-config";
import mongoose from "mongoose";
// DAL = Data Access Layer - The only layer accessing the database.
class DAL {

    public async connect (): Promise<void> {
        try {
            const db = await mongoose.connect(appConfig.mongodbConnectionString);
            console.log(`MongoDB Connected, database: ${db.connections[0].name}`);
        }
        catch (err:any) {
            console.log(err);
        }
    }
}
export const dal = new DAL();
