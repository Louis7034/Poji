import { db } from "../prisma/db.ts";

const TemperatureService = {
    async getAll() {
        return await db.orm.public.Temperature.all();
    },

    async getById(id) {
        const temperature = await db.orm.public.Temperature.where({ id }).first();
        if (!temperature) throw new Error("Température introuvable");
        return temperature;
    },

    async create(data) {
        return await db.orm.public.Temperature.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Temperature.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Temperature.delete(id);
    },
};

export default TemperatureService;