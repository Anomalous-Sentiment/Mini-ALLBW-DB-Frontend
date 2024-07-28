SELECT
  DISTINCT ON (u_mem.unique_id) u_mem.unique_id,
  mem.card_mst_id,
  mem.rarity,
  mem.card_type,
  mem.attribute,
  mem.quest_skill_mst_id,
  mem.gvg_skill_mst_id,
  mem.gvg_auto_skill_mst_id,
  mem.max_phys_atk,
  mem.max_phys_def,
  mem.max_mag_atk,
  mem.max_mag_def,
  false AS awakened,
  false AS super_awakened
FROM
  (
    memoria mem
    JOIN unique_memoria u_mem ON ((mem.unique_id = u_mem.unique_id))
  )
ORDER BY
  u_mem.unique_id,
  mem.rarity DESC,
  mem.card_mst_id;