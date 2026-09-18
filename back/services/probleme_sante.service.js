import { db } from "../prisma/db.ts";

const ProblemeSanteService = {
    async getAll() {
        return await db.orm.public.ProblemeSante.all();
    },

    async getById(id) {
        const probleme = await db.orm.public.ProblemeSante.where({ id }).first();
        if (!probleme) throw new Error("Problème de santé introuvable");
        return probleme;
    },

    async create(data) {
        return await db.orm.public.ProblemeSante.create(data);
    },

    async update(id, data) {
        return await db.orm.public.ProblemeSante.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.ProblemeSante.delete(id);
    },
};

export default ProblemeSanteService;