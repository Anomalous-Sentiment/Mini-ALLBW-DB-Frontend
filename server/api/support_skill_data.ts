export default defineEventHandler<{ query: { id: string } }>(async (event) => {
    const query = getQuery(event)
    var gvgMagData = []
    var id = null

    if (query)
    {
        id = query['id']
        id = Number.parseInt(id)
    }
    console.log(id)
    if (query && id)
    {
        // Get single element array if id specified
        gvgMagData = await prisma.gvg_support_magnification.findMany({
            where: {
                skill_mst_id: {
                  equals: id,
                },
            }
        })
    }
    else
    {
        // Get full list of no id specified
        gvgMagData = await prisma.gvg_support_magnification.findMany({})
    }

    return gvgMagData;
})