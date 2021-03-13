import { AdminResource } from "./Admin/admin-resource";
import axios from "./axios";
import { UserResource } from "./User/user-resource";

export const api = {
    admin: new AdminResource(axios),
    user: new UserResource(axios),
};
