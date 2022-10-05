import { Order } from './../entity/Order';
import { Customer } from './../entity/Customer';
import { Product } from './../entity/Product';
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";

class OrderController {

    //metodo sincrono: async
    public async index(request: Request, response: Response){

        //tratativa de erro
        try {
            //Busca todos os registros do banco
            // precisa do async -> await = aguardar
            const order = await Order.find();

            //Retorno da lista
            return response.json(order);
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
            const order = await Order.save(request.body);

            //Retorno o objeto inserido
            return response.status(201).json(order);
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
            const found = await Order.findOneBy({
                id: Number(id)
            });
            
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

        public async canceled(request: Request, response: Response){

            //tratativa de erro
            try {
                //Pego o ID que foi enviado por request parametro
                const {id} = request.params;
    
                //verifico se veio paramentro ID
                if (!id) {
                    return response.status(400).json({message: 'Parâmetro ID não informado'})
                }
    
                //Busco a entity no baco pelo ID
                const found = await Order.findOneBy({
                    id: Number(id)
                });
                
                //verifico se encontrou a product
                if (!found) {
                    return response.status(404).json({message:'Recurso não encontrado'})
                }

                found.canceledDate = new Date()
    
                //Atualizo com os novos dados
                const order = await Order.update(found.id, found);
    
                //Retorno a entidade econtrada
                return response.json(order);
            } catch (e) {
                const error = e as TypeORMError;
                return response.status(500).json({message: error.message});
            }
    
    }

}
export default new OrderController();