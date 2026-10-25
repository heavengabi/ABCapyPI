import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/AppError";

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "chave_secreta_abcapy");
    const { id } = data as TokenPayload;

  (req as any).userId = id;
    return next();
  } catch {
    throw new UnauthorizedError("Token inválido ou expirado");
  }
};