import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const server = fastify();

// CORS Configuration
server.register(fastifyCors, {
  origin: true, // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Register Routes
server.register(jobRoutes, { prefix: '/kiangola' });

const start = async () => {
  try {
    await server.listen({ 
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0'
    });
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();