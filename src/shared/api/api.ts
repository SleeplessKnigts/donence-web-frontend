import {AdminResource} from './Admin/admin-resource';
import axios from './axios';

export const api = {
    admin: new AdminResource(axios),
};