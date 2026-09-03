import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";



const repo =  AppDataSource.getRepository(User)
// Repositorio - 1

// Criamos o metodo para criar o usuario no banco 

export const userRepository = {
    // Criar usuario
    async create(data:{ nameUser : string, email: string, password: string} ){
            return repo.save(repo.create(data))
    },
    // Metodo para puxar todos os usuarios 
    async findAll(){
        return repo.find({ relations: ['users']})
    },
    // Puxar apenas por id 
    async findById(id: number){
        return repo.findOneBy({id})
    },
    // Puxar apenas por email
    async findByEmail(email: string){
        return repo.findOneBy({email})
    },
    // Deletar usuario
    async delete(id: number){
        return repo.delete(id)
    },
    async update(id: number, data: Partial<User>){
        await AppDataSource.getRepository(User).update(id,data)

        return await AppDataSource.getRepository(User).findOneBy({id})

    }
}