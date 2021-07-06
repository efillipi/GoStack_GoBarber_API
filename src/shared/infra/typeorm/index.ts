/* eslint-disable no-console */
import { createConnections } from 'typeorm';

createConnections().then(() => console.log(' 🗄 Conexão com DB estabelecida'));
