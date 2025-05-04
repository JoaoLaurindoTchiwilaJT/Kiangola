import { z } from 'zod';

// Schema principal para um job
export const jobSchema = z.object({
  id: z.number().int().positive(), // ID numérico autoincrementado
  title: z.string().min(1, "Título é obrigatório"),
  company: z.string().min(1, "Empresa é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  industry: z.string().min(1, "Indústria é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  
  // Requisitos como array de strings
  requisitos: z.array(z.string().transform((val) => String(val))).min(1, "Requisitos devem ser listados"),

  // Benefícios como array de strings
  beneficios: z.array(z.string().transform((val) => String(val))).min(1, "Benefícios devem ser listados"),
  
  // Tags como array de strings
  tags: z.array(z.string().transform((val) => String(val))).optional(),

  // Data com pre-processamento para garantir formato correto
  data_cadastro: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const parsedDate = new Date(arg);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    }
    return new Date();
  }, z.date()),

  status: z.enum(["ATIVO", "INATIVO", "EXPIRADO"]).default("ATIVO"),
});

// Schema para criação de um job com as transformações já aplicadas
export const jobCreateSchema = jobSchema.omit({ id: true }).extend({
  requisitos: z.array(z.string().transform((val) => String(val))).default([]),
  beneficios: z.array(z.string().transform((val) => String(val))).default([]),
  tags: z.array(z.string().transform((val) => String(val))).optional().default([]),
});

//Schema para login
export const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password : z.string().min(6,"Valor minimo para senha é 6")
});

// Tipos para input e criação
export type JobInputs = z.infer<typeof jobCreateSchema>;
export type JobInput = z.infer<typeof jobSchema>;
