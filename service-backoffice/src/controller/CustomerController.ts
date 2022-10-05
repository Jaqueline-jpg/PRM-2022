import { Customer } from './../entity/Customer';
import { Product } from './../entity/Product';
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";

class CustomerController {

    //metodo sincrono: async
    public async index(request: Request, response: Response){

        //tratativa de erro
        try {
            //Busca todos os registros do banco
            // precisa do async -> await = aguardar
            const customer = await Customer.find();

            //Retorno da lista
            return response.json(customer);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response){

        //tratativa de erro
        try {
            //Salvo no banco  a entidade que veio na requisição
            // precisa do async -> await = aguardar
            const customer = await Customer.save(request.body);

            //Retorno o objeto inserido
            return response.status(201).json(customer);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }

    }

    public async show(request: Request, response: Response){

        //tratativa de erro
        try {
            //Pego o ID que foi enviado por request parametro
            const {id} = request.params;

            //verifico se veio paramentro ID
            if (!id) {
                return response.status(400).json({message: 'Parâmetro ID não informado'})
            }

            //Busco a entity no baco pelo ID
            const found = await Customer.findOneBy({
                id: Number(id)
            });
            
            //verifico se encontrou a product
            if (!found) {
                return response.status(404).json({message:'Recurso não encontrado'})
            }

            //Retorno a entidade econtrada
            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }

    }

    public async update(request: Request, response: Response){

        //tratativa de erro
        try {
            //Pego o ID que foi enviado por request parametro
            const {id} = request.params;

            //verifico se veio paramentro ID
            if (!id) {
                return response.status(400).json({message: 'Parâmetro ID não informado'})
            }

            //Busco a entity no baco pelo ID
            const found = await Product.findOneBy({
                id: Number(id)
            });
            
            if (!found) {
                return response.status(404).json({message:'Recurso não encontrado'})
            }

            //Atualizo com os novos dados
            const customer = await Customer.update(found.id, request.body);

            //Retorno a entidade econtrada
            return response.json(customer);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async remove(request: Request, response: Response){

        //tratativa de erro
        try {
            //Pego o ID que foi enviado por request parametro
            const {id} = request.params;

            //verifico se veio paramentro ID
            if (!id) {
                return response.status(400).json({message: 'Parâmetro ID não informado'})
            }

            //Busco a entity no baco pelo ID
            const found = await Customer.findOneBy({
                id: Number(id)
            });
            
            if (!found) {
                return response.status(404).json({message:'Recurso não encontrado'})
            }

            //removo o registro baseado no ID
            await found.remove();

            //Retorno status 204 que é sem retorno
            return response.status(204).json();
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }

    }

}
export default new CustomerController();