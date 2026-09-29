import bcrypt from "bcryptjs";
import { db } from "../prisma/db.ts";

const AuthController = {
    async login(req, res) {
        const { email, password } = req.body;

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "L'e-mail et le mot de passe sont obligatoires" });
        }

        try {
            const personnel = await db.orm.public.Personnel.where({ email }).first();

            if (!personnel || !(await bcrypt.compare(password, personnel.password))) {
                return res.status(401).json({ message: "E-mail ou mot de passe incorrect" });
            }

            const { password: _password, ...user } = personnel;
            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur lors de la connexion" });
        }
    },
};

export default AuthController;
