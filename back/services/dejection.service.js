import { db } from "../prisma/db.ts";

export const dejectionService = {

    async getDejection(enfantId) {
        return await db.orm.public.Dejection
            .where({ enfantId })
            .all();
    },

    async getDejectionById(id) {
        const dejection = await db.orm.public.Dejection
            .where({ id })
            .first();

        if (!dejection) {
            throw new Error("Déjection introuvable");
        }

        return dejection;
    },

    async createDejection(data) {
        return await db.orm.public.Dejection.create(data);
    },

    async updateDejection(id, data) {
        return await db.orm.public.Dejection
            .where({ id })
            .update(data);
    },

    async deleteDejection(id) {
        return await db.orm.public.Dejection
            .where({ id })
            .delete();
    },
};