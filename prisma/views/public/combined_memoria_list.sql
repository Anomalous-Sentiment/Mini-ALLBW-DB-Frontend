SELECT
  row_number() OVER () AS "row",
  u_mem.en_name,
  u_mem.jp_name,
  u_mem.kr_name,
  u_mem.cn_name,
  u_mem.tw_name,
  merged.unique_id,
  merged.card_mst_id,
  merged.rarity,
  merged.card_type,
  merged.attribute,
  merged.quest_skill_mst_id,
  merged.gvg_skill_mst_id,
  merged.gvg_auto_skill_mst_id,
  merged.max_phys_atk,
  merged.max_phys_def,
  merged.max_mag_atk,
  merged.max_mag_def,
  merged.awakened,
  merged.super_awakened,
  quest_sk.en_name AS quest_en_name,
  quest_sk.en_description AS quest_en_desc,
  gvg_sk.en_name AS gvg_en_name,
  gvg_sk.en_description AS gvg_en_desc,
  auto_sk.en_name AS auto_en_name,
  auto_sk.en_description AS auto_en_desc,
  quest_sk.jp_name AS quest_jp_name,
  quest_sk.jp_description AS quest_jp_desc,
  gvg_sk.jp_name AS gvg_jp_name,
  gvg_sk.jp_description AS gvg_jp_desc,
  auto_sk.jp_name AS auto_jp_name,
  auto_sk.jp_description AS auto_jp_desc,
  quest_sk.cn_name AS quest_cn_name,
  quest_sk.cn_description AS quest_cn_desc,
  gvg_sk.cn_name AS gvg_cn_name,
  gvg_sk.cn_description AS gvg_cn_desc,
  auto_sk.cn_name AS auto_cn_name,
  auto_sk.cn_description AS auto_cn_desc,
  quest_sk.kr_name AS quest_kr_name,
  quest_sk.kr_description AS quest_kr_desc,
  gvg_sk.kr_name AS gvg_kr_name,
  gvg_sk.kr_description AS gvg_kr_desc,
  auto_sk.kr_name AS auto_kr_name,
  auto_sk.kr_description AS auto_kr_desc,
  quest_sk.tw_name AS quest_tw_name,
  quest_sk.tw_description AS quest_tw_desc,
  gvg_sk.tw_name AS gvg_tw_name,
  gvg_sk.tw_description AS gvg_tw_desc,
  auto_sk.tw_name AS auto_tw_name,
  auto_sk.tw_description AS auto_tw_desc,
  quest_sk.attack_magnification AS quest_attack_magnification,
  quest_sk.recovery_magnification AS quest_recovery_magnification,
  quest_sk.buffer_magical_attack_magnification AS quest_buffer_magical_attack_magnification,
  quest_sk.buffer_magical_defense_magnification AS quest_buffer_magical_defense_magnification,
  quest_sk.buffer_physical_attack_magnification AS quest_buffer_physical_attack_magnification,
  quest_sk.buffer_physical_defense_magnification AS quest_buffer_physical_defense_magnification,
  quest_sk.debuffer_magical_attack_magnification AS quest_debuffer_magical_attack_magnification,
  quest_sk.debuffer_magical_defense_magnification AS quest_debuffer_magical_defense_magnification,
  quest_sk.debuffer_physical_attack_magnification AS quest_debuffer_physical_attack_magnification,
  quest_sk.debuffer_physical_defense_magnification AS quest_debuffer_physical_defense_magnification,
  quest_sk.attack_up_magnification AS quest_attack_up_magnification,
  quest_sk.recovery_up_magnification AS quest_recovery_up_magnification,
  quest_sk.buffer_up_magnification AS quest_buffer_up_magnification,
  quest_sk.use_sp_reduce_magnification AS quest_use_sp_reduce_magnification,
  gvg_sk.attack_magnification AS gvg_attack_magnification,
  gvg_sk.recovery_magnification AS gvg_recovery_magnification,
  gvg_sk.buffer_magical_attack_magnification AS gvg_buffer_magical_attack_magnification,
  gvg_sk.buffer_magical_defense_magnification AS gvg_buffer_magical_defense_magnification,
  gvg_sk.buffer_physical_attack_magnification AS gvg_buffer_physical_attack_magnification,
  gvg_sk.buffer_physical_defense_magnification AS gvg_buffer_physical_defense_magnification,
  gvg_sk.debuffer_magical_attack_magnification AS gvg_debuffer_magical_attack_magnification,
  gvg_sk.debuffer_magical_defense_magnification AS gvg_debuffer_magical_defense_magnification,
  gvg_sk.debuffer_physical_attack_magnification AS gvg_debuffer_physical_attack_magnification,
  gvg_sk.debuffer_physical_defense_magnification AS gvg_debuffer_physical_defense_magnification,
  gvg_sk.attack_up_magnification AS gvg_attack_up_magnification,
  gvg_sk.recovery_up_magnification AS gvg_recovery_up_magnification,
  gvg_sk.buffer_up_magnification AS gvg_buffer_up_magnification,
  gvg_sk.use_sp_reduce_magnification AS gvg_use_sp_reduce_magnification,
  auto_sk.attack_magnification AS auto_attack_magnification,
  auto_sk.recovery_magnification AS auto_recovery_magnification,
  auto_sk.buffer_magical_attack_magnification AS auto_buffer_magical_attack_magnification,
  auto_sk.buffer_magical_defense_magnification AS auto_buffer_magical_defense_magnification,
  auto_sk.buffer_physical_attack_magnification AS auto_buffer_physical_attack_magnification,
  auto_sk.buffer_physical_defense_magnification AS auto_buffer_physical_defense_magnification,
  auto_sk.debuffer_magical_attack_magnification AS auto_debuffer_magical_attack_magnification,
  auto_sk.debuffer_magical_defense_magnification AS auto_debuffer_magical_defense_magnification,
  auto_sk.debuffer_physical_attack_magnification AS auto_debuffer_physical_attack_magnification,
  auto_sk.debuffer_physical_defense_magnification AS auto_debuffer_physical_defense_magnification,
  auto_sk.attack_up_magnification AS auto_attack_up_magnification,
  auto_sk.recovery_up_magnification AS auto_recovery_up_magnification,
  auto_sk.buffer_up_magnification AS auto_buffer_up_magnification,
  auto_sk.use_sp_reduce_magnification AS auto_use_sp_reduce_magnification
FROM
  (
    (
      (
        (
          (
            SELECT
              evo_mem.unique_id,
              evo_mem.card_mst_id,
              evo_mem.rarity,
              evo_mem.card_type,
              evo_mem.attribute,
              evo_mem.quest_skill_mst_id,
              evo_mem.gvg_skill_mst_id,
              evo_mem.gvg_auto_skill_mst_id,
              evo_mem.max_phys_atk,
              evo_mem.max_phys_def,
              evo_mem.max_mag_atk,
              evo_mem.max_mag_def,
              evo_mem.awakened,
              evo_mem.super_awakened
            FROM
              evolved_memoria_list evo_mem
            UNION
            ALL
            SELECT
              awk_mem.unique_id,
              awk_mem.card_mst_id,
              awk_mem.rarity,
              awk_mem.card_type,
              awk_mem.attribute,
              awk_mem.quest_skill_mst_id,
              awk_mem.gvg_skill_mst_id,
              awk_mem.gvg_auto_skill_mst_id,
              awk_mem.max_phys_atk,
              awk_mem.max_phys_def,
              awk_mem.max_mag_atk,
              awk_mem.max_mag_def,
              awk_mem.awakened,
              awk_mem.super_awakened
            FROM
              awakened_memoria_list awk_mem
            UNION
            ALL
            SELECT
              super_mem.unique_id,
              super_mem.card_mst_id,
              super_mem.rarity,
              super_mem.card_type,
              super_mem.attribute,
              super_mem.quest_skill_mst_id,
              super_mem.gvg_skill_mst_id,
              super_mem.gvg_auto_skill_mst_id,
              super_mem.max_phys_atk,
              super_mem.max_phys_def,
              super_mem.max_mag_atk,
              super_mem.max_mag_def,
              super_mem.awakened,
              super_mem.super_awakened
            FROM
              super_awakened_memoria_list super_mem
          ) merged
          JOIN skills quest_sk ON (
            (
              quest_sk.skill_mst_id = merged.quest_skill_mst_id
            )
          )
        )
        JOIN skills gvg_sk ON ((gvg_sk.skill_mst_id = merged.gvg_skill_mst_id))
      )
      JOIN skills auto_sk ON (
        (
          auto_sk.skill_mst_id = merged.gvg_auto_skill_mst_id
        )
      )
    )
    JOIN unique_memoria u_mem ON ((u_mem.unique_id = merged.unique_id))
  );