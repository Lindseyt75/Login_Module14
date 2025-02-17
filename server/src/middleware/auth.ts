import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  // Get token from headers (bearer token)
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err) {
      return res.status(403).json({ message: 'Access Denied: Invalid Token' });
    }

    req.user = decoded as JwtPayload;
    return next();
    next();
  });
};
