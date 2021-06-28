import connectDB from "../../middlewares/mongodb";
// let UserModel = require("../../models/user");
import User from "../../models/user";
import { NextApiRequests } from "../../class/next";
import { NextApiResponse } from "next";
const bcrypt = require("bcrypt");

async function register(req: NextApiRequests, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "POST": {
            try {
                const value = req.body;
                const salt = bcrypt.genSaltSync(10);
                value.password = bcrypt.hashSync(value.password, salt);
                const user = await User.create(value);
                res.status(200).json({ message: "ok", data: user });
            } catch (e) {
                res.status(400).json({ message: "error" });
            }
            break;
        }
        default:
            res.status(400).json({ message: "error" });
            break;
    }
    return;
}
export default connectDB(register);
