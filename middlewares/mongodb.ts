import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextApiRequests } from "../class/next";
const connectDB =
    (handler: any) => async (req: NextApiRequests, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        try {
            await mongoose.connect(process.env.mongodburl as string, {
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true,
            });
        } catch (e) {
            console.log(e);
        }

        return handler(req, res);
    };

export default connectDB;
