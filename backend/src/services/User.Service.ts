import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt"
import { ommitPassword } from "../utils/ommitPassword"
import { User } from "../models/User";

export class NotFoundError extends Error  {}

export const UserService = {
    async create(data: { nameUser : string, email: string, password: string}){

        if(!data.nameUser || !data.email || !data.password ){
            throw new NotFoundError("Os campos são obrigatórios!")
        }   
        const hash = await bcrypt.hash(data.password, 10)
        const user = await userRepository.create({
            nameUser: data.nameUser,
            email: data.email,
            password: hash,
    
        }) 
        return ommitPassword(user)
    },
    async delete(id: number){
        const user  = await userRepository.delete(id)

        if(user.affected === 0){
            throw new NotFoundError("Usuário não existe!")
        }
    },
    async listAll(){
        return userRepository.findAll()
    },
    async getById(id: number){
        const user  = await userRepository.findById(id)
        if(!user){
            throw new NotFoundError("Usuário não econtrado!")
        }
        return  ommitPassword(user);
    },
    async login(data: {email: string, password: string}){


        const user = await userRepository.findByEmail(data.email)
        if(!user){
            throw new NotFoundError("E-mail ou senha inváido!")
        }
        const isValidPassword =  await bcrypt.compare(
            data.password, 
            user.password
         )
         if(!isValidPassword){
            throw new NotFoundError("E-mail ou senha inválidos")
         }
         return ommitPassword(user)

    },
    // Atributos opcionais ? ?
    async update(id: number, data : {nameUser?: string, email?: string, password?: string}) {
        const user = await userRepository.findById(id)

        if(!user){
            throw new NotFoundError("Usuário não encontrado!")
        }
        if(data.nameUser) user.nameUser = data.nameUser
        if(data.email) user.email = data.email
        if(data.password) user.password = await bcrypt.hash(data.password,10)

        const updateUser = await userRepository.update(id,user)
        if (!updateUser) {
         throw new NotFoundError("Falha ao atualizar o usuário!");
         }
        return  ommitPassword(updateUser)
    }


}