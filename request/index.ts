import UserRepository from "./repository/UserRespository";
const repositories: any = {
    user: UserRepository,
};

export default function getFactory(name: string) {
    return repositories[name];
}
