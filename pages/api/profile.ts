import checkToken from "../../middlewares/auth";
import connectDB from "../../middlewares/mongodb";
// import User from "../../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequests } from "../../class/next";
async function profile(req: NextApiRequests, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "GET": {
            try {
                const user = req.user;
                // let user = await User.findOne({
                //     username: req.user.username,
                // });
                // user.password = "";
                res.status(200).json({ user: user });
            } catch (e) {
                res.status(400).json({
                    message: e.message,
                });
            }
            break;
        }
        default:
            res.status(400).json({ message: "Method không được định nghĩa!" });
            break;
    }
    return;
}
export default connectDB(checkToken(profile));
