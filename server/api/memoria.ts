export default defineEventHandler(async (event) => {
    return {
      memoria: await prisma.memoria.findFirst(),
    };
  });