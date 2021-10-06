const express = require('express'); //chamando o express
const app = express() //instanciando o express
const data = require('./data.json'); //chamando o json

//resource é uma entidade(objeto) 

/* Verbos HTTP

 - GET - recebe dados de um resource
 
 - POST - envia dados ou informações para serem processadas por um resource
 
 - PUT - Atualizar dados de um resource
 
 - DELETE - deletar um resource

 */

 // https://localhost:3000/clients - esse /clients é o resource

 //usando os verbos

 //passar a função e vai pegar uma request(req) e devolver uma response(res)

 app.use(express.json()); //express precisa usar a anotação json

 app.get("/clients", function(req, res){
     res.json(data);
 });

 app.get("/clients/:id", function(req, res){ //vai pegar o ID do cliente
    const { id } = req.params //o id está dentro desse params assim como outros parametros como nome, descricao, etc
    const client = data.find(cli => cli.id == id) //procurar o cliente de id que for igual ao id que passei e jogue na variavel cliente e responda...

    if(!client) return res.status(204).json();

    res.json(client); //o client
 })

 
 //app.get("/clients", function(req, res){})
 app.post("/clients", function(req, res){
     const {name, email} = req.body;

     //salvar novo cliente

     res.json({name, email});
 });
 
 
 //app.post("/clients", function(req, res){});
 
 
 app.put("/clients/:id", function(req, res){
     const {id} = req.params;
     const client = data.find(cli => cli.id == id);

     if(!client) return res.status(204).json();

     const {name} = req.body;

     client.name = name; //novo name q peguei do body

     res.json(client);
 })
 
 
 
 //app.put("/clients", function(req, res){})



 app.delete("/clients/:id", function(req, res){
    const {id} = req.params;

    const clientsFiltered = data.filter(client => client.id != id) //filtrando os clientes e trazer todos os clientes q o id for diferente do id q está sendo passado

    res.json(clientsFiltered);
 })


 //app.delete("/clients", function(req, res){})


//iniciando o servidor app.listen()
//na porta 3000 e callback function só passando uma informação
app.listen(3000, function(){
    console.log('Server is running')
})