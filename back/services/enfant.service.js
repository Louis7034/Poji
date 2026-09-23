import { db } from "../prisma/db.ts";
import EnfantRepository from "../repositories/enfant.repository.js";

const EnfantService = {
    async getAll() {
        return await EnfantRepository.getAllEnfantsWithStory();
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

    async create(data) {
        return await db.orm.public.Enfant.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Enfant.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Enfant.delete(id);
    }
};

export default EnfantService;