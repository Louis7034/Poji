import { db } from "../prisma/db.ts";

const TransmissionMatinService = {
    async getAll() {
        return await db.orm.public.TransmissionMatin.all();
    },

    async getById(id) {
        const transmission = await db.orm.public.TransmissionMatin.where({ id }).first();
        if (!transmission) throw new Error("Transmission du matin introuvable");
        return transmission;
    },

    async create(data) {
        return await db.orm.public.TransmissionMatin.create(data);
    },

    async update(id, data) {
        return await db.orm.public.TransmissionMatin.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.TransmissionMatin.delete(id);
    },
};

export default TransmissionMatinService;