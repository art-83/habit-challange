import { Router, Request, Response} from "express";
import { RequestBodyMiddleware } from "../middlewares/request-body.middleware";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
    private readonly router: Router;
    private readonly userController: UserController;
    private readonly requestBodyMiddleware: RequestBodyMiddleware;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.requestBodyMiddleware = new RequestBodyMiddleware();
    }

    public initializeRoutes(): Router {
        this.createUser();
        this.getUsers();
        return this.router;
    }

    private createUser(): void {
        this.router.post(
            '/', 
            this.requestBodyMiddleware.validateUserRequest(),
            (req: Request, res: Response) => this.userController.createUser(req, res)
        )
    }

    private getUsers(): void {
        this.router.get(
            '/', 
            (req: Request, res: Response) => this.userController.getUsers(req, res)
        )
    }
}