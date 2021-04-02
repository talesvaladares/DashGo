import { useDisclosure, UseDisclosureProps } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import { createContext , ReactNode, useContext, useEffect} from "react";


interface SiderbarDrawerContextData {
    disclosure: UseDisclosureProps;
}

const SidebarDrawerContext = createContext({} as SiderbarDrawerContextData);

interface SideBarDrawerProviderProps {
    children: ReactNode;
}

export function SidebarDrawerProvider ({children}: SideBarDrawerProviderProps) {

    //recebe todas as propriedades e funçoes de uma janela aberta
    //função de abrir e fechar
    //e o estado aberto/fechado
    const disclosure = useDisclosure();

    const router = useRouter();


    //faz com que a janela do menu seja fechada quando 
    //o usuario clicar em cima de um link e ser redirecionando para outra pagina
    //router.asPath contem a rota atual da aplicação
    useEffect(() => {disclosure.onClose()},[router.asPath]);

    return (
        <SidebarDrawerContext.Provider value={{disclosure}}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => {
    return useContext(SidebarDrawerContext);
}

