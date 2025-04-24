import express from 'express';
import { PORT } from './config.js';
import gymRoutes from './routes/gym.routes.js';

const app = express();

try{
app.listen(PORT);
app.use(gymRoutes);
await ...
console.log(`Server listening on ${PORT}`);
}
catch (error) {
    console.error('There was an error on initialization');
}