import { PrismaClient } from '@prisma/client';
import { Criptografia } from '../Utils/Criptografia.js';
const prisma = new PrismaClient();
const criptografar = new Criptografia();

async function cadastrarAdminSeNaoExistir() {
  try {
    // Verifica se o admin já existe
    const adminExistente = await prisma.usuario.findUnique({
      where: {
        email: `${process.env.ADMIN}`, // Substitua com o email do administrador
      },
    });
  

    const senha = await criptografar.criptografar("senha_forte");
    // Se o admin não existir, cria um novo
    if (!adminExistente) {
      await prisma.usuario.create({
        data:{
          email:`${process.env.ADMIN}`,
          senha
        },
      });
       
      console.log('Administrador criado com sucesso!');
    } else {
      console.log('Administrador já existe.');
    }
  } catch (error) {
    console.error('Erro ao cadastrar o administrador:', error);
  }
}

async function testarConexao() {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados bem-sucedida');

    // Chama a função para cadastrar o admin se necessário
    await cadastrarAdminSeNaoExistir();
  } catch (error) {
    console.error('Falha na conexão com o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testarConexao();

export { prisma };
