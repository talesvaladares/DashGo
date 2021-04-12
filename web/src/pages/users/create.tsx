import {
    Box,
    Flex,
    Heading,
    Divider,
    VStack,
    SimpleGrid,
    HStack,
    Button,
   
} from "@chakra-ui/react";
import NextLink from "next/link";
import router from 'next/router';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm , SubmitHandler } from 'react-hook-form';

import { Input } from "../../components/Form/Input";
import Header from '../../components/Header';
import Sidebar from "../../components/Sidebar";

import {useMutation} from 'react-query';
import { api } from "../../services/api";
import { queryClient } from "../../services/react-query/queryClient";

type CreateUserFormData = {
   name: string;
   email: string;
   password: string;
   password_confirmation: string;
}

const createUserFormdata = yup.object().shape({
    name: yup.string().required("Nome obrigatório."),
    email: yup.string().required("E-mail obrigatório.").email("E-mail inválido."),
    password: yup.string().required("Senha obrigatória.").min(8, "A senha precisa ter pelo menos 8 caracteres.")
        .max(16, "A senha pode ter no máximo 16 caracteres."),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], "As senhas precisam ser iguais.")
});

export default function CreateUser() {

    const {register, handleSubmit, formState} = useForm<CreateUserFormData>({
        resolver : yupResolver(createUserFormdata)
    });

    const createUser = useMutation(async (user: CreateUserFormData ) => {
        const response = await api.post('/users',{
            user : {
                ...user,
                created_at: new Date()
            }
        });

        return response.data.user;

        //apos dar sucesso na criação de um novo usuario
        //invalidamos todas as queries ja feitas
        //para assim termos a lista novamente atualiazada
    },{onSuccess : () => {queryClient.invalidateQueries('users')}});

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data, event) => {

        event.preventDefault();

        await createUser.mutateAsync(data);

        router.push('/users');

    }
    return (
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar/>
               <Box
                  as="form"
                  flex="1"
                  borderRadius={8}
                  bg="gray.800"
                  p={["6","8"]}
                  onSubmit={handleSubmit(handleCreateUser)}
                >
                <Heading 
                    size="lg"
                    fontWeight="normal"
                
                >
                    Criar usuário
                </Heading>
                <Divider my="6" borderColor="gray.700"/>
                <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input
                                name="name"
                                label="Nome completo"
                                error={formState.errors.name}
                                {...register("name")}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register("email")}
                                
                            />
                            
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register("password")}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da senha"
                                error={formState.errors.password_confirmation}
                                {...register("password_confirmation")} 
                            />
                        </SimpleGrid>
                </VStack>

                <Flex mt="8" justifyContent="flex-end">
                        <HStack spacing="4">
                            <NextLink href="/users">
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </NextLink>
                        
                            <Button
                              colorScheme="pink"
                              type="submit"
                              isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>

                </Flex>
                </Box>
            </Flex>
        </Box>
    );
}