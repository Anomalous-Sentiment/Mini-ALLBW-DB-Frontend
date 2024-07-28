import { usePacker } from "../utils/msgpacker";

export default defineEventHandler<{ query: { lang: string, unique_id: string } }>(async (event) => {
  const query = getQuery(event)
  console.log(query)
  const memoName = `${query.lang}_name`
  const questName = `quest_${query.lang}_name`
  const gvgName = `gvg_${query.lang}_name`
  const autoName = `auto_${query.lang}_name`
  const questDesc = `quest_${query.lang}_desc`
  const gvgDesc = `gvg_${query.lang}_desc`
  const autoDesc = `auto_${query.lang}_desc`

  var baseSelectParams: Record<string, any> = {
    unique_id: true,
    card_mst_id: true,
    rarity: true,
    card_type: true,
    attribute: true,
    quest_skill_mst_id: true,
    gvg_skill_mst_id: true,
    gvg_auto_skill_mst_id: true,
    max_phys_atk: true,
    max_phys_def: true,
    max_mag_atk: true,
    max_mag_def: true,
    awakened: true,
    super_awakened: true,
    row: true
  }
  baseSelectParams[memoName] = true
  baseSelectParams[questName] = true
  baseSelectParams[gvgName] = true
  baseSelectParams[autoName] = true
  baseSelectParams[questDesc] = true
  baseSelectParams[gvgDesc] = true
  baseSelectParams[autoDesc] = true

  const memoria = await prisma.combined_memoria_list.findMany(
    {
      select: baseSelectParams
    }
  )

  const packedData = usePacker(memoria)

  event.node.res.setHeader('content-type', 'application/octet-stream')
  event.node.res.end(packedData)
})