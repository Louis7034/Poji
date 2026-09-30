import { db } from "../prisma/db.ts";

const AchievementService = {
    async getAll() {
        return await db.orm.public.Achievement.all();
    },

    async getById(id) {
        const achievement = await db.orm.public.Achievement.where({ id }).first();
        if (!achievement) throw new Error("Achievement introuvable");
        return achievement;
    },

    async create(data) {
        return await db.orm.public.Achievement.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Achievement
            .where({ id })
            .update(data);
    },

    async delete(id) {
        return await db.orm.public.Achievement.where({ id }).delete();
    },
};

export default AchievementService;
