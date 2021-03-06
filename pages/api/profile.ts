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
                // console.log("r______", req);

                const user = req.user;
                // let user = await User.findOne({
                //     username: req.user.username,
                // });
                // user.password = "";
                res.status(200).json({ data: { user: user } });
            } catch (e) {
                res.status(200).json({
                    data: {
                        message: e.message,
                    },
                });
            }
            break;
        }
        default:
            res.status(200).json({
                data: { message: "Method không được định nghĩa!" },
            });
            break;
    }
    return;
}
export default connectDB(checkToken(profile));
