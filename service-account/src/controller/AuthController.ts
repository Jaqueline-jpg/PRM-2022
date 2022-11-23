import {IUser} from '@typesCustom';
import { Request, Response } from 'express';
import {FirebaseError, signInAdmin} from '../services/firebase'

class AuthController {

    public async signInAdmin(request: Request, response: Response) {
        const credential = request.body;

        try {
            
            const result = await signInAdmin(credential.email, credential.password);

            const user: IUser = {
                uid: result.user.uid,
                name: result.user.displayName || '',
                email: result.user.email || '',
            }

            //Preparar o cliente para ser enviado a fila
            customer.uid = result.uid;
            await sentToQueue(JSON.stringify{customer});

            //Retorno do objeto inserido 
            return response.status(201).json(newUser);
            
            const accessToken = await result.user.getIdToken()

            return response.json({user: user, token: accessToken})

        } catch (e) {
            const error = e as FirebaseError;

            if (error.code === 'auth/missing-email') {
                return response.status(400).json({message: 'É preciso informar um email'});
            }

            if (error.code === 'auth/user-not-found') {
                return response.status(401).json({message: 'Usuário não encontrado'});
            }

            if (error.code === 'auth/wrong-password') {
                return response.status(401).json({message: 'Senha incorreta'});
            }
            
            return response.status(500).json({message: error.message})
        }
    }
}
export default new AuthController();