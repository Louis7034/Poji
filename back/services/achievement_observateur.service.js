import { db } from "../prisma/db.ts";

const AchievementObservateurService = {
    async getAll() {
        return await db.orm.public.AchievementObservateur.all();
    },

    async getById(id) {
        const observateur = await db.orm.public.AchievementObservateur.where({ id }).first();
        if (!observateur) throw new Error("Observateur d'achievement introuvable");
        return observateur;
    },

    async create(data) {
        return await db.orm.public.AchievementObservateur.create(data);
    },

    async update(id, data) {
        return await db.orm.public.AchievementObservateur
            .where({ id })
            .update(data);
    },

    async delete(id) {
        return await db.orm.public.AchievementObservateur.where({ id }).delete();
    },
};

export default AchievementObservateurService;
