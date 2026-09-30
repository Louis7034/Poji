import { db } from "../prisma/db.ts";

const AchievementObservationQuestionService = {
    async getAll() {
        return await db.orm.public.AchievementObservationQuestion.all();
    },

    async getById(id) {
        const question = await db.orm.public.AchievementObservationQuestion.where({ id }).first();
        if (!question) throw new Error("Question d'observation introuvable");
        return question;
    },

    async create(data) {
        return await db.orm.public.AchievementObservationQuestion.create(data);
    },

    async update(id, data) {
        return await db.orm.public.AchievementObservationQuestion.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.AchievementObservationQuestion.delete(id);
    },
};

export default AchievementObservationQuestionService;
