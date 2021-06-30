// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { NextApiRequests } from "../../class/next";
import connectDB from "../../middlewares/mongodb";

type Data = {
    name: string;
};

function handler(req: NextApiRequests, res: NextApiResponse<Data>) {
    console.log("req", req);
    res.status(200).json({ name: "John Doe" });
}
export default connectDB(handler);
