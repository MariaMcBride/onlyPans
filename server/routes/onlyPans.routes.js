// const ProjectController = require('../controllers/projectManager.controllers')
const UserController = require("../controllers/user.controller");
const RecipeController = require('../controllers/onlyPans.controllers');
const { authenticate } = require("../config/jwt")

//replace names for current project
module.exports = app => {
    // app.post("/api/project/new", ProjectController.addProjectManager)
    // app.get("/api/project", ProjectController.showAllProjectManager)
    // // app.get("/api/project/:id" , ProjectController.showOneProject)
    // app.put("/api/project/update/:id" , ProjectController.updateExistingProject)
    // app.delete("/api/project/delete/:id" , ProjectController.deleteProject)

    // users
    app.post("/api/register", UserController.register);
    app.get('/api/users', UserController.findAllUsers)
    app.delete("/api/user/delete/:id", UserController.deleteUser)
    app.post("/api/login", UserController.login);
    app.get("/api/users/getloggedinuser", authenticate, UserController.getLoggedInUser);
    app.get("/api/logout", UserController.logout)
    app.get('/api/users/email/:email', UserController.findOneUserByEmail);

    // recipe
    app.get('/api/recipe', RecipeController.getRecipe);
    app.post('/api/recipe/new', RecipeController.createRecipe);
    app.get('/api/recipe/:id', RecipeController.getOneRecipe);
    app.put('/api/recipe/edit/:id', RecipeController.updateRecipe);
    app.delete('/api/recipe/:id', RecipeController.deleteRecipe);

    const YOUR_DOMAIN = 'http://localhost:8000'
    // subscriptions
}