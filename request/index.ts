import { Repositories } from "./interface";
import userRepository from "./repository/UserRespository";
const repositories: Repositories = {
    user: userRepository,
};

// export default function getFactory(name: string) {
//     return repositories[];
// }

export default repositories;
