import { FastifyInstance } from 'fastify';
import { 
  login,
  createJob, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob 
} from '../controllers/jobController.js';

async function jobRoutes(fastify: FastifyInstance) {
  fastify.post('/login',login)
  fastify.post('/jobs', createJob);
  fastify.get('/jobs', getAllJobs);
  fastify.get('/jobs/:id', getJobById);
  fastify.put('/jobs/:id', updateJob);
  fastify.delete('/jobs/:id', deleteJob);
}

export default jobRoutes;