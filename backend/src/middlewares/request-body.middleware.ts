import z from 'zod';
import { Request, Response, NextFunction } from 'express';

export class RequestBodyMiddleware {
    private readonly userRequestSchema: z.ZodObject;

    constructor() {
        this.userRequestSchema = z.object({
            name: z.string().min(3).max(40),
        });
    }

    private createValidator(schema: z.ZodType) {
        return (req: Request, res: Response, next: NextFunction) => {
            const parseResult = schema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    message: 'Invalid request body.',
                    details: z.treeifyError(parseResult.error),
                });
            }
            next();
        };
    }

    public validateUserRequest() {
        return this.createValidator(this.userRequestSchema);
    }
}
