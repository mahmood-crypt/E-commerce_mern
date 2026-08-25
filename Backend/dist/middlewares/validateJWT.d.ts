import type { Request, Response, NextFunction } from "express";
export interface globalRequest extends Request {
    user?: any;
}
declare const validateJWT: (req: globalRequest, res: Response, next: NextFunction) => void;
export default validateJWT;
//# sourceMappingURL=validateJWT.d.ts.map