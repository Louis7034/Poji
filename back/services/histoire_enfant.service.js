import { db } from "../prisma/db.ts";

const HistoireEnfantService = {
    async getAll() {
        return await db.orm.public.HistoireEnfant.all();
    },

    async getById(id) {
        const histoire = await db.orm.public.HistoireEnfant.where({ id }).first();
        if (!histoire) throw new Error("Histoire de l'enfant introuvable");
        return histoire;
    },

    async create(data) {
        return await db.orm.public.HistoireEnfant.create(data);
    },

    async update(id, data) {
        return await db.orm.public.HistoireEnfant.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.HistoireEnfant.delete(id);
    },
};

export default HistoireEnfantService;