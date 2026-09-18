import { db } from "../prisma/db.ts";

const PresenceService = {
    async getAll() {
        return await db.orm.public.Presence.all();
    },

    async getById(id) {
        const presence = await db.orm.public.Presence.where({ id }).first();
        if (!presence) throw new Error("Présence introuvable");
        return presence;
    },

    async create(data) {
        return await db.orm.public.Presence.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Presence.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Presence.delete(id);
    },
};

export default PresenceService;