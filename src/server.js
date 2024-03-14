import jsonServer from 'json-server';
import db from './util/db';

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3030;

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
