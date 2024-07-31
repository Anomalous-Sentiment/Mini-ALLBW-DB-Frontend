SELECT
  u_mem.unique_id,
  mem.card_mst_id,
  mem.rarity,
  awk_mem.card_type,
  mem.attribute,
  awk_mem.quest_skill_mst_id,
  awk_mem.gvg_skill_mst_id,
  awk_mem.gvg_auto_skill_mst_id,
  (mem.max_phys_atk + awk_mem.max_phys_atk) AS max_phys_atk,
  (mem.max_phys_def + awk_mem.max_phys_def) AS max_phys_def,
  (mem.max_mag_atk + awk_mem.max_mag_atk) AS max_mag_atk,
  (mem.max_mag_def + awk_mem.max_mag_def) AS max_mag_def,
  TRUE AS awakened,
  TRUE AS super_awakened
FROM
  (
    (
      memoria mem
      JOIN unique_memoria u_mem ON ((mem.unique_id = u_mem.unique_id))
    )
    JOIN super_awakened_memoria awk_mem ON ((awk_mem.card_mst_id = mem.card_mst_id))
  );