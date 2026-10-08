import express from "express";
import cors from "cors";
import enfantRoutes from "./routes/enfant.routes.js";
import dejectionRoutes from "./routes/dejection.routes.js";
import histoireEnfantRoutes from "./routes/histoire_enfant.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import personnelRoutes from "./routes/personnel.routes.js";
import presenceRoutes from "./routes/presence.routes.js";
import problemeSanteRoutes from "./routes/probleme_sante.routes.js";
import rappelParentRoutes from "./routes/rappel_parent.routes.js";
import temperatureRoutes from "./routes/temperature.routes.js";
import transmissionMatinRoutes from "./routes/transmission_matin.routes.js";
import transmissionSoirRoutes from "./routes/transmission_soir.routes.js";
import siesteRoutes from "./routes/sieste.routes.js";
import authRoutes from "./routes/auth.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import achievementObservateurRoutes from "./routes/achievement_observateur.routes.js";
import achievementObservationRoutes from "./routes/achievement_observation.routes.js";
import achievementObservationQuestionRoutes from "./routes/achievement_observation_question.routes.js";
import achievementObservationGeneraleRoutes from "./routes/achievement_observation_generale.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
}));
app.use(express.json());

app.use("/api", enfantRoutes);
app.use("/api", dejectionRoutes);
app.use("/api", histoireEnfantRoutes);
app.use("/api", journalRoutes);
app.use("/api", personnelRoutes);
app.use("/api", presenceRoutes);
app.use("/api", problemeSanteRoutes);
app.use("/api", rappelParentRoutes);
app.use("/api", temperatureRoutes);
app.use("/api", transmissionMatinRoutes);
app.use("/api", transmissionSoirRoutes);
app.use("/api", siesteRoutes);
app.use("/api", authRoutes);
app.use("/api", achievementRoutes);
app.use("/api", achievementObservateurRoutes);
app.use("/api", achievementObservationRoutes);
app.use("/api", achievementObservationQuestionRoutes);
app.use("/api", achievementObservationGeneraleRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Poji API démarrée sur http://192.168.1.23:${PORT}`);
});

export default app;