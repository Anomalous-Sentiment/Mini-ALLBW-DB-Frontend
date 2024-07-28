import { usePacker } from "../utils/msgpacker";

export default defineEventHandler<{ query: { lang: string, unique_id: string } }>(async (event) => {
  const query = getQuery(event)
  console.log(query)

    const memoria = await prisma.memoria_list.findMany(
      {
        // take: 150
      }
    )

    const packedData = usePacker(memoria)

    event.node.res.setHeader('content-type', 'application/octet-stream')
    event.node.res.end(packedData)
})