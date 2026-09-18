import { db } from "../prisma/db.ts";

const JournalService = {
    async getAll() {
        return await db.orm.public.Journal.all();
    },

    async getById(id) {
        const journal = await db.orm.public.Journal.where({ id }).first();
        if (!journal) throw new Error("Journal introuvable");
        return journal;
    },

    async create(data) {
        return await db.orm.public.Journal.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Journal.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Journal.delete(id);
    },
};

export default JournalService;