import { prisma } from '../database/prisma-client.js';
import { FastifyRequest, FastifyReply } from 'fastify';
import { jobSchema, loginSchema, jobCreateSchema } from '../schemas/jobSchema.js';
import { Criptografia } from '../Utils/Criptografia.js';
import { error } from 'console';

// Inicialize o PrismaClient

const criptografar = new Criptografia();

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const dataUser = loginSchema.parse(request.body);

    // console.log(dataUser.password);
    const senha = await prisma.usuario.findFirst({
      where: {
        email : dataUser.email 
      },
      select:{
        senha: true
      }
    });
    
   if (senha) {
      const value = criptografar.descriptografar(dataUser.password,senha.senha);
      if (value === true) {
        return reply.status(202).send(" Logado com sucesso ! ");
      }
   } 
   
   return reply.status(400).send(" Senha ou email invalidos ! ");
  } catch (error) {
    
    return reply.status(500).send(" Erro ao logar " + error)
  }

}

export async function updateJob(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };  // Recebe o id como string
     // Exibe o valor de id antes da conversão
    
    const numericId = Number(id);  // Converte a string para número
    
    if (isNaN(numericId)) {
      // Lida com erro caso o id não seja um número válido
      // console.error('ID inválido');
      return error;
    }
    
    

    const jobData = jobSchema.partial().parse(request.body); // Validação parcial

    const { requisitos, beneficios, tags, ...jobMainData } = jobData;

    // Iniciar uma transação
    const transaction = await prisma.$transaction(async (prisma) => {
      // Atualizar o job principal
      const updatedJob = await prisma.job.update({
        where: { id: numericId },
        data: jobMainData,
      });

      // Atualizar requisitos, se fornecido
      if (requisitos) {
        const existingRequirements = await prisma.requirement.findMany({ where: { jobId: numericId } });
        const existingReqSet = new Set(existingRequirements.map(req => req.requisitos_job));
        const newReqSet = new Set(requisitos);

        // Verifica se houve alteração nos requisitos
        if (existingReqSet.size !== newReqSet.size || [...existingReqSet].some(req => !newReqSet.has(req))) {
          await prisma.requirement.deleteMany({ where: { jobId: numericId} });
          await Promise.all(
            requisitos.map((req) =>
              prisma.requirement.create({
                data: {
                  requisitos_job: req,
                  jobId: numericId,
                },
              })
            )
          );
        }
      }

      // Atualizar benefícios, se fornecido
      if (beneficios) {
        const existingBenefits = await prisma.benefit.findMany({ where: { jobId: numericId } });
        const existingBenSet = new Set(existingBenefits.map(ben => ben.beneficios_job));
        const newBenSet = new Set(beneficios);

        // Verifica se houve alteração nos benefícios
        if (existingBenSet.size !== newBenSet.size || [...existingBenSet].some(ben => !newBenSet.has(ben))) {
          await prisma.benefit.deleteMany({ where: { jobId: numericId} });
          await Promise.all(
            beneficios.map((ben) =>
              prisma.benefit.create({
                data: {
                  beneficios_job: ben,
                  jobId: numericId,
                },
              })
            )
          );
        }
      }

      // Atualizar tags, se fornecido
      if (tags) {
        const existingTags = await prisma.tags.findMany({ where: { jobId: numericId} });
        const existingTagSet = new Set(existingTags.map(tag => tag.tags_job));
        const newTagSet = new Set(tags);

        // Verifica se houve alteração nas tags
        if (existingTagSet.size !== newTagSet.size || [...existingTagSet].some(tag => !newTagSet.has(tag))) {
          await prisma.tags.deleteMany({ where: { jobId: numericId } });
          await Promise.all(
            tags.map((tag) =>
              prisma.tags.create({
                data: {
                  tags_job: tag,
                  jobId: numericId,
                },
              })
            )
          );
        }
      }

      return updatedJob;
    });

    // Recuperar o job atualizado com os relacionamentos
    const result = await prisma.job.findUnique({
      where: { id :numericId},
      include: {
        requisitos: true,
        beneficios: true,
        tags: true,
      },
    });

    return reply.send(result);
  } catch (error) {
    // console.error('Job Update Error:', error);
    return reply.code(400).send({ error: `Falha ao atualizar vaga: ${(error as Error).message}` });
  }
}

export async function createJob(request: FastifyRequest, reply: FastifyReply) {
  try {
    
    // Validação do corpo da requisição com Zod
    const jobData = jobCreateSchema.parse(request.body);

    // Criando o job no banco com Prisma
    const newJob = await prisma.job.create({
      data: {
        ...jobData,
        requisitos: jobData.requisitos.length
          ? { create: jobData.requisitos.map((req) => ({ requisitos_job: req })) }
          : undefined,
        beneficios: jobData.beneficios.length
          ? { create: jobData.beneficios.map((ben) => ({ beneficios_job: ben })) }
          : undefined,
        tags: jobData.tags.length
          ? { create: jobData.tags.map((tag) => ({ tags_job: tag })) }
          : undefined,
      },
      include: {
        requisitos: true,
        beneficios: true,
        tags: true,
      },
    });

    return reply.code(201).send({ message: "Vaga criada com sucesso!", job: newJob });
  } catch (error) {
    // console.error("Erro ao criar vaga:", error);
    return reply.code(400).send({ error: `Falha ao criar vaga: ${(error as Error).message}` });
  }
}

export async function getAllJobs(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { search, status, page = 1, limit = 10 } = request.query as {
      search?: string,
      status?: string,
      page?: number,
      limit?: number
    };
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Condição de pesquisa
    let whereCondition: any = {};
    
    if (search) {
      whereCondition.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      whereCondition.status = status;
    }
    
    const jobs = await prisma.job.findMany({
      where: whereCondition,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { data_cadastro: 'desc' },
      include: {
        requisitos: true,
        beneficios: true,
        tags: true
      }
    });
    
    const total = await prisma.job.count({
      where: whereCondition
    });
    
    return reply.send({jobs});
  } catch (error) {
    // console.error('Job Retrieval Error:', error);
    return reply.code(500).send({ error: `Falha ao buscar vagas: ${(error as Error).message}` });
  }
}

export async function getJobById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };  // Recebe o id como string
    // Exibe o valor de id antes da conversão
    
    const numericId = Number(id);  // Converte a string para número
    
    if (isNaN(numericId)) {
      // Lida com erro caso o id não seja um número válido
      console.error('ID inválido');
      return;
    }
    
    const job = await prisma.job.findUnique({
      where: { id: numericId },
      include: {
        requisitos: true,
        beneficios: true,
        tags: true
      }
    });
    
    console.log("vagas",job);  // Exibe o resultado da consulta
    

    
    if (!job) {
      return reply.code(404).send({ message: 'Vaga não encontrada' });
    }
    
    return reply.send(job);
  } catch (error) {
    console.error('Job Retrieval Error:', error);
    return reply.code(500).send({ error: `Falha ao buscar vaga: ${(error as Error).message}` });
  }
}

export async function deleteJob(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };  // Recebe o id como string
    console.log(id);  // Exibe o valor de id antes da conversão
    
    const numericId = Number(id); 
    // Deletar o job, os relacionamentos serão removidos devido ao 'onDelete: Cascade' no Prisma
    await prisma.job.delete({
      where: { id :numericId}
    });
    
    return reply.code(204).send();
  } catch (error) {
    console.error('Job Deletion Error:', error);
    return reply.code(500).send({ error: `Falha ao excluir vaga: ${(error as Error).message}` });
  }
}
