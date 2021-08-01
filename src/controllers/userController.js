const  bodyParser  = require('../helpers/bodyParser');
let users  = require('../mocks');

module.exports = {
   
    handle(request,response){
        const sortUsers = users.sort((a,b) => {
            if(request.query.order === 'desc'){
                return a.id < b.id ? 1 : -1
            } else {
                return a.id > b.id ? 1 : -1
            }
        }); 
        response.send(200,sortUsers);
    },

    findByIdOne(request, response) {
        const {id} = request.params;
        const user  = users.find((us) => us.id === Number(id));

        if(user){
            return response.send(200, user);
        }

        response.send(400, {error : 'User not found'});

    },

    createUsers(request, response) {
        
        const {body} = request;
        
        bodyParser(request);
        const lastUserId = users[users.length-1].id;

            const newUSer = {
                id: lastUserId+1,
                name: body.name
            }

            users.push(newUSer);
            response.send(200,newUSer);
    },

    updateUsers(request, response) {
        let {id} = request.params;
        const {name} = request.body;


        id = Number(id);
        const userExists = users.find((user)=> user.id === id);

        if(!userExists) {
            return response.send(400, {error: "User not found"});
        }

        users.map((user) => {
            if(user.id === id) {
                return {
                    ...user,
                    name
                }
            }

            return user;
        });

        response.send(200, {id, name});

    },

    deleteUSers(request, response) {
        let {id} = request.params;

        id = Number(id);

        const userExists = users.find((user)=> user.id === id);

        if(!userExists) {
            return response.send(400, {error: "User not found"});
        }

        users = users.filter((user) => user.id !== id);
        response.send(200, {deleted: true});



    }
}
