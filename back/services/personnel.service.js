import { db } from "../prisma/db.ts";

const PersonnelService = {
    async getAll() {
        return await db.orm.public.Personnel.all();
    },

    async getById(id) {
        const personnel = await db.orm.public.Personnel.where({ id }).first();
        if (!personnel) throw new Error("Membre du personnel introuvable");
        return personnel;
    },

    async create(data) {
        return await db.orm.public.Personnel.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Personnel.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Personnel.delete(id);
    },
};

export default PersonnelService;