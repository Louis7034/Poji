import { db } from "../prisma/db.ts";
import PresenceRepository from "../repositories/presence.repository.js";

const PresenceService = {
    async getAll() {
        return await db.orm.public.Presence.all();
    },

    async getById(id) {
        const presence = await db.orm.public.Presence.where({ id }).first();
        if (!presence) throw new Error("Présence introuvable");
        return presence;
    },

    async getCountPresentToday() {
        return await PresenceRepository.countPresentToday();
    },

    async getEnfantPresentToday() {
        return await PresenceRepository.getEnfantPresentToday();
    },

    async create(data) {
        return await db.orm.public.Presence.create(data);
    },

    async update(id, data) {
        return await PresenceRepository.update(id, data);
    },

    async delete(id) {
        return await PresenceRepository.delete(id);
    },
};

export default PresenceService;