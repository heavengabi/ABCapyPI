import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorMiddleware = (
  error: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Imprime o erro completo com stack trace no terminal do VS Code
  console.error(">>> ERRO DETALHADO NO BACKEND:", error);

  const statusCode = error.statusCode ?? 500;
  const message = error.message || "Erro interno do servidor";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    stack: error.stack, // Retorna o rastro do erro no Insomnia para diagnóstico rápido
  });
};