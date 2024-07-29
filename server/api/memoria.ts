import Unique_id from "~/pages/card/[unique_id].vue";
import { usePacker } from "../utils/msgpacker";

export default defineEventHandler<{ query: { lang: string, unique_id: string } }>(async (event) => {
  const query = getQuery(event)

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
    row: true,
    quest_attack_magnification: true,
    quest_recovery_magnification: true,
    quest_buffer_magical_attack_magnification: true,
    quest_buffer_magical_defense_magnification: true,
    quest_buffer_physical_attack_magnification: true,
    quest_buffer_physical_defense_magnification: true,
    quest_debuffer_magical_attack_magnification: true,
    quest_debuffer_magical_defense_magnification: true,
    quest_debuffer_physical_attack_magnification: true,
    quest_debuffer_physical_defense_magnification: true,
    quest_attack_up_magnification: true,
    quest_recovery_up_magnification: true,
    quest_buffer_up_magnification: true,
    quest_use_sp_reduce_magnification: true,
    gvg_attack_magnification: true,
    gvg_recovery_magnification: true,
    gvg_buffer_magical_attack_magnification: true,
    gvg_buffer_magical_defense_magnification: true,
    gvg_buffer_physical_attack_magnification: true,
    gvg_buffer_physical_defense_magnification: true,
    gvg_debuffer_magical_attack_magnification: true,
    gvg_debuffer_magical_defense_magnification: true,
    gvg_debuffer_physical_attack_magnification: true,
    gvg_debuffer_physical_defense_magnification: true,
    gvg_attack_up_magnification: true,
    gvg_recovery_up_magnification: true,
    gvg_buffer_up_magnification: true,
    gvg_use_sp_reduce_magnification: true,
    auto_attack_magnification: true,
    auto_recovery_magnification: true,
    auto_buffer_magical_attack_magnification: true,
    auto_buffer_magical_defense_magnification: true,
    auto_buffer_physical_attack_magnification: true,
    auto_buffer_physical_defense_magnification: true,
    auto_debuffer_magical_attack_magnification: true,
    auto_debuffer_magical_defense_magnification: true,
    auto_debuffer_physical_attack_magnification: true,
    auto_debuffer_physical_defense_magnification: true,
    auto_attack_up_magnification: true,
    auto_recovery_up_magnification: true,
    auto_buffer_up_magnification: true,
    auto_use_sp_reduce_magnification: true,
  }
  baseSelectParams[memoName] = true
  baseSelectParams[questName] = true
  baseSelectParams[gvgName] = true
  baseSelectParams[autoName] = true
  baseSelectParams[questDesc] = true
  baseSelectParams[gvgDesc] = true
  baseSelectParams[autoDesc] = true

  // If id exists in route query params, use it to filter results
  var whereObj : Record<string, Object>= {}
  if (query.unique_id)
  {
    whereObj = {
      unique_id: {
        equals: parseInt(query['unique_id'])
      }
    }
  }


  const memoria = await prisma.combined_memoria_list.findMany(
    {
      select: baseSelectParams,
      where: whereObj
    }
  )

  const packedData = usePacker(memoria)

  event.node.res.setHeader('content-type', 'application/octet-stream')
  event.node.res.end(packedData)
})