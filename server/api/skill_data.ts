import Unique_id from "~/pages/card/[unique_id].vue"

export default defineEventHandler<{ query: { id: string } }>(async (event) => {
    const query = getQuery(event)
    var gvgMagData = []
    var id = null

    if (query)
    {
        id = query['id']
        id = Number.parseInt(id)
    }

    if (query && id)
    {
        // Get single element array if id specified
        gvgMagData = await prisma.gvg_magnification.findMany({
            where: {
                unique_id: {
                  equals: id,
                },
            }
        })
    }
    else
    {
        // Get full list of no id specified
        gvgMagData = await prisma.gvg_magnification.findMany({})
    }

    console.log(gvgMagData)

    return gvgMagData;
})