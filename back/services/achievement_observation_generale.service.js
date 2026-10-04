import { db } from "../prisma/db.ts";

const AchievementObservationGeneraleService = {
    async getByEnfantAndCategorie(enfantId, categorie) {
        return await db.orm.public.AchievementObservationGenerale
            .where({ enfantId, categorie })
            .first();
    },

    async create(data) {
        return await db.orm.public.AchievementObservationGenerale.create(data);
    },

    async update(id, data) {
        return await db.orm.public.AchievementObservationGenerale
            .where({ id })
            .update(data);
    },
};

export default AchievementObservationGeneraleService;
