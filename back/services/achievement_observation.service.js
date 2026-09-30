import { db } from "../prisma/db.ts";

const AchievementObservationService = {
    async getAll() {
        return await db.orm.public.AchievementObservation.all();
    },

    async getById(id) {
        const observation = await db.orm.public.AchievementObservation.where({ id }).first();
        if (!observation) throw new Error("Observation d'achievement introuvable");
        return observation;
    },

    async getByEnfant(enfantId) {
        return await db.orm.public.AchievementObservation.where({ enfantId }).all();
    },

    async create(data) {
        return await db.orm.public.AchievementObservation.create(data);
    },

    async update(id, data) {
        return await db.orm.public.AchievementObservation.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.AchievementObservation.delete(id);
    },
};

export default AchievementObservationService;
