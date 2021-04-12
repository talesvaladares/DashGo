import {createServer, Factory, Model, Response, ActiveModelSerializer} from 'miragejs';
import faker from 'faker';

type User = {
    nome: string;
    email: string;
    created_at: string;
}

export function makeServer(){
    const server = createServer({

        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            //Partial quer dizer que podemos usar apenas alguns campos de user
            //user precisa ser no singular
            user: Model.extend<Partial<User>>({})
        },

        //metodo para criar dados em massa para testar o backend
        factories: {
            //user precisa ser no singular
            user: Factory.extend({
                name(){
                    return (faker.name.firstName()+" "+faker.name.lastName());
                },
                email(){
                    return faker.internet.email().toLocaleLowerCase();
                },
                createdAt(){
                    return faker.date.recent(10)
                }
            })
        },

        seeds(server){
            //cria 30 usuarios no banco do mirage
            //user precisa ser no singular
            server.createList('user', 200);
        },

        routes(){
            this.namespace = 'api';
            //causa um delay nas requisiçoes para ficar mais real
            this.timing = 750; //milissegundos

            //rota com função de paginação
            this.get('/users', function (schema, request) {
                
                // try{
                    const {page = 1, per_page = 10} = request.queryParams;

                    const total = schema.all('user').length;

                    const pageStart = (Number(page) - 1) * Number(per_page);
                    const pageEnd = pageStart + Number(per_page);

                    const users = this.serialize(schema.all('user'))
                        .users.slice(pageStart, pageEnd);


                    return new Response(
                        200,
                        {'x-total-count': String(total)},
                        {users}
                        
                    );
                // }
                // catch(err){
                //     console.log("Erros:"+ err);
                // }

            });
            this.get('users/:id');
            
            this.post('/users');

            //reseta o namespace para não causar ambiguidade na api no next
            this.namespace = '';
            //faz com que as chamadas primeiro passem nas rodas do mirage
            //caso não for do mirage vai para outras rodas da aplicação
            //exemplo de alguma chamada externa para web
            this.passthrough();
        }
    });


    return server;
}