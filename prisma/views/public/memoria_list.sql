SELECT
  u_mem.unique_id,
  mem.card_mst_id,
  u_mem.en_name AS name,
  mem.rarity,
  mem.card_type,
  mem.attribute,
  quest_sk.en_name AS quest_sk,
  quest_sk.en_description AS quest_desc,
  gvg_sk.en_name AS gvg_sk,
  gvg_sk.en_description AS gvg_desc,
  auto_sk.en_name AS auto_sk,
  auto_sk.en_description AS support_desc,
  mem.max_phys_atk,
  mem.max_phys_def,
  mem.max_mag_atk,
  mem.max_mag_def
FROM
  (
    (
      (
        (
          memoria mem
          JOIN unique_memoria u_mem ON ((mem.unique_id = u_mem.unique_id))
        )
        JOIN skills quest_sk ON ((quest_sk.skill_mst_id = mem.quest_skill_mst_id))
      )
      JOIN skills gvg_sk ON ((gvg_sk.skill_mst_id = mem.gvg_skill_mst_id))
    )
    JOIN skills auto_sk ON (
      (auto_sk.skill_mst_id = mem.gvg_auto_skill_mst_id)
    )
  );