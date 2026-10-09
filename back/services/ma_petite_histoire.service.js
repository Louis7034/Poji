import { db } from "../prisma/db.ts";

const MaPetiteHistoireService = {
    async getAll() {
        return await db.orm.public.MaPetiteHistoire.all();
    },

    async getById(id) {
        const fiche = await db.orm.public.MaPetiteHistoire.where({ id }).first();
        if (!fiche) throw new Error("Fiche de l'enfant introuvable");
        return fiche;
    },

    async create(data) {
        return await db.orm.public.MaPetiteHistoire.create(data);
    },

    async update(id, data) {
        await this.getById(id);
        return await db.orm.public.MaPetiteHistoire
            .where({ id })
            .update(data);
    },

    async delete(id) {
        await this.getById(id);
        return await db.orm.public.MaPetiteHistoire.where({ id }).delete();
    },
};

export default MaPetiteHistoireService;