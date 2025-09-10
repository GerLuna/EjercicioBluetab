import 'dotenv/config';
import { Server } from './Server';

function main() {
  const server = Server.getInstance();
  server.start();
}

main();