-- CreateTable
CREATE TABLE "card_types" (
    "card_type" SMALLINT NOT NULL,
    "card_type_name" VARCHAR,

    CONSTRAINT "card_types_pkey" PRIMARY KEY ("card_type")
);

-- CreateTable
CREATE TABLE "memoria" (
    "card_mst_id" INTEGER NOT NULL,
    "unique_id" INTEGER,
    "card_type" SMALLINT,
    "rarity" SMALLINT,
    "attribute" SMALLINT,
    "quest_skill_mst_id" INTEGER,
    "gvg_skill_mst_id" INTEGER,
    "gvg_auto_skill_mst_id" INTEGER,
    "limit_break_bonus_mst_id" INTEGER,
    "base_phys_atk" INTEGER,
    "base_phys_def" INTEGER,
    "base_mag_atk" INTEGER,
    "base_mag_def" INTEGER,
    "max_phys_atk" INTEGER,
    "max_phys_def" INTEGER,
    "max_mag_atk" INTEGER,
    "max_mag_def" INTEGER,
    "deck_cost" SMALLINT,
    "is_emoria" BOOLEAN,
    "awakened_card_type" INTEGER,
    "awaken_add_phys_atk" INTEGER,
    "awaken_add_mag_atk" INTEGER,
    "awaken_add_phys_def" INTEGER,
    "awaken_add_mag_def" INTEGER,
    "awaken_quest_skill_mst_id" INTEGER,
    "awaken_gvg_skill_mst_id" INTEGER,
    "awaken_gvg_auto_skill_mst_id" INTEGER,
    "new_awaken_quest_skill_mst_id" INTEGER,
    "new_awaken_gvg_skill_mst_id" INTEGER,
    "new_awaken_gvg_auto_skill_mst_id" INTEGER,

    CONSTRAINT "memoria_pkey" PRIMARY KEY ("card_mst_id")
);

-- CreateTable
CREATE TABLE "skill_types" (
    "skill_type" SMALLINT NOT NULL,
    "skill_type_desc" VARCHAR,

    CONSTRAINT "skill_types_pkey" PRIMARY KEY ("skill_type")
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_mst_id" INTEGER NOT NULL,
    "jp_name" VARCHAR,
    "en_name" VARCHAR,
    "cn_name" VARCHAR,
    "kr_name" VARCHAR,
    "tw_name" VARCHAR,
    "jp_description" VARCHAR,
    "en_description" VARCHAR,
    "cn_description" VARCHAR,
    "kr_description" VARCHAR,
    "tw_description" VARCHAR,
    "sp" SMALLINT,
    "min_range" SMALLINT,
    "max_range" SMALLINT,
    "skill_type" SMALLINT,
    "effect_time" SMALLINT,
    "attack_type" SMALLINT,
    "target_num_min" SMALLINT,
    "target_num_max" SMALLINT,
    "attack_magnification" REAL,
    "attack_up_magnification" REAL,
    "buffer_magical_attack_magnification" REAL,
    "buffer_magical_defense_magnification" REAL,
    "buffer_physical_attack_magnification" REAL,
    "buffer_physical_defense_magnification" REAL,
    "debuffer_magical_attack_magnification" REAL,
    "debuffer_magical_defense_magnification" REAL,
    "debuffer_physical_attack_magnification" REAL,
    "debuffer_physical_defense_magnification" REAL,
    "recovery_magnification" REAL,
    "buffer_up_magnification" REAL,
    "recovery_up_magnification" REAL,
    "use_sp_reduce_magnification" REAL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_mst_id")
);

-- CreateTable
CREATE TABLE "unique_memoria" (
    "unique_id" INTEGER NOT NULL,
    "jp_name" VARCHAR(100),
    "en_name" VARCHAR(100),
    "cn_name" VARCHAR(100),
    "kr_name" VARCHAR(100),
    "tw_name" VARCHAR(100),

    CONSTRAINT "unique_memoria_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "super_awakened_memoria" (
    "card_mst_id" INTEGER NOT NULL,
    "card_type" SMALLINT NOT NULL,
    "quest_skill_mst_id" INTEGER,
    "gvg_skill_mst_id" INTEGER,
    "gvg_auto_skill_mst_id" INTEGER,
    "limit_break_bonus_mst_id" INTEGER,
    "base_phys_atk" INTEGER,
    "base_phys_def" INTEGER,
    "base_mag_atk" INTEGER,
    "base_mag_def" INTEGER,
    "max_phys_atk" INTEGER,
    "max_phys_def" INTEGER,
    "max_mag_atk" INTEGER,
    "max_mag_def" INTEGER,

    CONSTRAINT "super_awakened_memoria_pkey" PRIMARY KEY ("card_mst_id","card_type")
);
