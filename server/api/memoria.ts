export default defineEventHandler(async (event) => {
    const memoria = await prisma.memoria_list.findMany({
        take: 10
      })
    return memoria;
})