import { db } from "../prisma/db.ts";

const RappelParentService = {
    async getAll() {
        return await db.orm.public.RappelParent.all();
    },

    async getById(id) {
        const rappel = await db.orm.public.RappelParent.where({ id }).first();
        if (!rappel) throw new Error("Rappel parent introuvable");
        return rappel;
    },

    async create(data) {
        return await db.orm.public.RappelParent.create(data);
    },

    async update(id, data) {
        return await db.orm.public.RappelParent.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.RappelParent.delete(id);
    },
};

export default RappelParentService;