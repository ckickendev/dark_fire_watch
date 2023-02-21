const { UserController, AuthController } = require("./controllers");
const AppServer = require("./appServer");

const app = new AppServer([new UserController(), new AuthController()]);

app.startListening();
