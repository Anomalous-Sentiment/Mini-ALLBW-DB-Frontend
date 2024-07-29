(
  SELECT
    DISTINCT ON (u_mem.unique_id) u_mem.unique_id,
    mem.card_mst_id,
    mem.rarity,
    mem.awakened_card_type AS card_type,
    mem.attribute,
    mem.quest_skill_mst_id,
    mem.gvg_skill_mst_id,
    mem.gvg_auto_skill_mst_id,
    (mem.max_phys_atk + mem.awaken_add_phys_atk) AS max_phys_atk,
    (mem.max_phys_def + mem.awaken_add_phys_def) AS max_phys_def,
    (mem.max_mag_atk + mem.awaken_add_mag_atk) AS max_mag_atk,
    (mem.max_mag_def + mem.awaken_add_mag_def) AS max_mag_def,
    TRUE AS awakened,
    false AS super_awakened
  FROM
    (
      memoria mem
      JOIN unique_memoria u_mem ON ((mem.unique_id = u_mem.unique_id))
    )
  WHERE
    (mem.awakened_card_type <> 0)
  ORDER BY
    u_mem.unique_id,
    mem.rarity DESC,
    mem.card_mst_id
)
UNION
(
  SELECT
    DISTINCT ON (u_mem.unique_id) u_mem.unique_id,
    mem.card_mst_id,
    mem.rarity,
    mem.awakened_card_type AS card_type,
    mem.attribute,
    mem.new_awaken_quest_skill_mst_id AS quest_skill_mst_id,
    mem.new_awaken_gvg_skill_mst_id AS gvg_skill_mst_id,
    mem.new_awaken_gvg_auto_skill_mst_id AS gvg_auto_skill_mst_id,
    (mem.max_phys_atk + mem.awaken_add_phys_atk) AS max_phys_atk,
    (mem.max_phys_def + mem.awaken_add_phys_def) AS max_phys_def,
    (mem.max_mag_atk + mem.awaken_add_mag_atk) AS max_mag_atk,
    (mem.max_mag_def + mem.awaken_add_mag_def) AS max_mag_def,
    TRUE AS awakened,
    false AS super_awakened
  FROM
    (
      memoria mem
      JOIN unique_memoria u_mem ON ((mem.unique_id = u_mem.unique_id))
    )
  WHERE
    (mem.awakened_card_type <> 0)
  ORDER BY
    u_mem.unique_id,
    mem.rarity DESC,
    mem.card_mst_id
);