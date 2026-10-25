import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorMiddleware = (
  error: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Erro interno do servidor";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};