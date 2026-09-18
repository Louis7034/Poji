import { db } from "../prisma/db.ts";

const TransmissionSoirService = {
    async getAll() {
        return await db.orm.public.TransmissionSoir.all();
    },

    async getById(id) {
        const transmission = await db.orm.public.TransmissionSoir.where({ id }).first();
        if (!transmission) throw new Error("Transmission du soir introuvable");
        return transmission;
    },

    async create(data) {
        return await db.orm.public.TransmissionSoir.create(data);
    },

    async update(id, data) {
        return await db.orm.public.TransmissionSoir.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.TransmissionSoir.delete(id);
    },
};

export default TransmissionSoirService;