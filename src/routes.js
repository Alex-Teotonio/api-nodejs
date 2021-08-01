const userController = require('./controllers/userController');

module.exports = [
    {
        endpoint : '/users',
        method: 'GET',
        handler: userController.handle    
    },

    {
        endpoint : '/users/:id',
        method: 'GET',
        handler: userController.findByIdOne    
    },

    {
        endpoint: '/users',
        method: 'POST',
        handler: userController.createUsers    
    },

    {
        endpoint: '/users/:id',
        method: 'PUT',
        handler: userController.updateUsers 
    },

    {
        endpoint: '/users/:id',
        method: 'DELETE',
        handler: userController.deleteUSers 
    }
]