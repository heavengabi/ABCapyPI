<<<<<<< HEAD
import { Request, Response } from "express";
import { ChildrenService } from "../services/ChildrenService";

export const ChildrenController = {

    async findAll(req: Request, res: Response) {
        try {

            const children = await ChildrenService.findAll();

            return res.json(children);

        } catch (error) {

            return res.status(500).json({
                message: "Error finding children",
            });

        }
    },

    async findById(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);

            const child = await ChildrenService.findById(id);

            if (!child) {
                return res.status(404).json({
                    message: "Child not found",
                });
            }

            return res.json(child);

        } catch (error) {

            return res.status(500).json({
                message: "Error finding child",
            });

        }
    },

    async create(req: Request, res: Response) {
        try {

            const child = await ChildrenService.create(req.body);

            return res.status(201).json(child);

        } catch (error) {

            return res.status(500).json({
                message: "Error creating child",
            });

        }
    },

    async update(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);

            const child =
                await ChildrenService.update(id, req.body);

            if (!child) {
                return res.status(404).json({
                    message: "Child not found",
                });
            }

            return res.json(child);

        } catch (error) {

            return res.status(500).json({
                message: "Error updating child",
            });

        }
    },

    async delete(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);

            const result =
                await ChildrenService.delete(id);

            if (result.affected === 0) {
                return res.status(404).json({
                    message: "Child not found",
                });
            }

            return res.status(204).send();

        } catch (error) {

            return res.status(500).json({
                message: "Error deleting child",
            });

        }
    },
};
=======
import { NextFunction, Request, Response } from "express";
import { ChildrenService } from "../services/ChildrenService";

export class ChildrenController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { childName, capy, stars } = req.body;
      const child = await ChildrenService.create(userId, { childName, capy, stars });
      return res.status(201).json(child);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const child = await ChildrenService.getByUserId(userId);
      return res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const child = await ChildrenService.update(userId, req.body);
      return res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }

  async addStars(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { amount } = req.body;
      const child = await ChildrenService.addStars(userId, Number(amount));
      return res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }
}
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
