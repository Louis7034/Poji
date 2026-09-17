import { db } from "../prisma/db.ts";

const EnfantService = {
    async getAll() {
        return await db.orm.public.Enfant.all();
    },

    async getById(id) {
        const enfant = await db.orm.public.Enfant
            .where({ id })
            .first();

        if (!enfant) {
            throw new Error("Enfant introuvable");
        }

        return enfant;
    },

    async create(req) {
        return await db.orm.public.Enfant.create(req.body);
    },

    async update(id, data) {
        return await db.orm.public.Enfant.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Enfant.delete(id);
    }
};

export default EnfantService;