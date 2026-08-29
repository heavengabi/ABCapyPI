import e, { NextFunction, Response, Request } from "express";
import { UserService } from "../services/User.Service";



export class UserController {
    
    // Post / usuarios
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const { nameUser, email, password} = req.body
            const user = UserService.create({ nameUser ,email,password})
            return res.status(201).json(user)
        
        }catch(error){
            next(error)
    
        }
        }
        // Delete users/:id
        async delete(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.params)
                await UserService.delete(id)
                return res.status(204).send
            }catch(error){

            }
        }
        // Put users/:id
        async update(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.body)
                const {name, email, password } = req.body
                const user = await UserService.update(id,{nameUser, email, password} )
            }catch(error){

            }
        }
        //Get users/
        async list(req: Request, res: Response, next: NextFunction){
            try {

            }catch(error){

            }
        }

}