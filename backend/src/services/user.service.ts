import { userRepository } from '../database/pg-datasource.config';
import { UserRequest } from '../interfaces/user.request';
import { User } from '../models/user.entity';

export class UserService {
    public async createUser(userRequest: UserRequest) {
        try {
            const newUser = new User();

            newUser.name = userRequest.name;

            const user = await userRepository.save(newUser);

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async getUsers() {
        try {
            const users = await userRepository.find();

            return users;
        } catch (error) {
            throw error;
        }
    }
}
