export default defineEventHandler(async (event) => {
    const memoria = await prisma.memoria_list.findMany({
        take: 150
      })
    return memoria;
})