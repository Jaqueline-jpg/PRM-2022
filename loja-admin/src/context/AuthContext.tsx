import { createContext, ReactNode } from "react";
import { ICredential, IUser } from '@typesCustom';
import { useState } from "react";
import { signInAdmin } from "../services/server";
import { useRefEffect } from "@fluentui/react-hooks";

type AuthContextType = { 
    user: IUser | undefined ;
    signIn(credential: ICredential): void;
    signOut(): void;
}
export const AuthContext = createContext<AuthContextType>({} as 
AuthContextType);

type AuthContextProviderProp = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProp) {
    const [user, setUser] = useState<IUser>();

    //chaves da local Storade
    const keyUser = '@PRM:user'

    useRefEffect(() => {

        //leio o usuario da local Storage
        const storageUser = localStorage.getItem(keyUser);

        if (storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    async function signIn(credential: ICredential){
        try {
            
            const result = await signInAdmin(credential) as any;
            
            if (result) {
                setUser(result.user);

                //gravar na localstorade o usuário
                localStorage.setItem(keyUser, JSON.stringify(result.user));
            }

        } catch (error) {
            throw error;
        }
    }

    function signOut() {
        localStorage.removeItem(keyUser);
        setUser( {} as IUser);
    }
    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}