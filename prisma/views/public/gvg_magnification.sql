SELECT
  mem.unique_id,
  gvg_sk.skill_mst_id,
  gvg_sk.attack_magnification,
  gvg_sk.buffer_magical_attack_magnification,
  gvg_sk.buffer_magical_defense_magnification,
  gvg_sk.buffer_physical_attack_magnification,
  gvg_sk.buffer_physical_defense_magnification,
  gvg_sk.debuffer_magical_attack_magnification,
  gvg_sk.debuffer_magical_defense_magnification,
  gvg_sk.debuffer_physical_attack_magnification,
  gvg_sk.debuffer_physical_defense_magnification,
  gvg_sk.recovery_magnification
FROM
  (
    (
      skills gvg_sk
      JOIN memoria mem ON ((mem.gvg_skill_mst_id = gvg_sk.skill_mst_id))
    )
    JOIN unique_memoria u_mem ON ((u_mem.unique_id = mem.unique_id))
  );