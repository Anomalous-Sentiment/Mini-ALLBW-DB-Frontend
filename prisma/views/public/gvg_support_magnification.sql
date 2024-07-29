SELECT
  gvg_sk.skill_mst_id,
  gvg_sk.buffer_magical_attack_magnification,
  gvg_sk.buffer_magical_defense_magnification,
  gvg_sk.buffer_physical_attack_magnification,
  gvg_sk.buffer_physical_defense_magnification,
  gvg_sk.debuffer_magical_attack_magnification,
  gvg_sk.debuffer_magical_defense_magnification,
  gvg_sk.debuffer_physical_attack_magnification,
  gvg_sk.debuffer_physical_defense_magnification,
  gvg_sk.attack_up_magnification,
  gvg_sk.buffer_up_magnification,
  gvg_sk.recovery_up_magnification,
  gvg_sk.use_sp_reduce_magnification
FROM
  skills gvg_sk;