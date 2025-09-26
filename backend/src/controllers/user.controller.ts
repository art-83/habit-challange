import { UserRequest } from '../interfaces/user.request';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request<{}, {}, UserRequest>, res: Response): Promise<Response> {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(201).json({
                message: 'User created.',
                data: user,
            });
        } catch (error: any) {
            console.log(error);
            return res.status(409).json({
                message: 'Error creating user.',
                details: error.detail,
            });
        }
    }

    public async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.getUsers();
            return res.status(201).json({
                data: users,
            });
        } catch (error: any) {
            console.log(error);
            return res.status(409).json({
                message: 'Error getting user.',
                details: error.detail,
            });
        }
    }
}
