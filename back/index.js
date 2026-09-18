import express from "express";
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

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Poji API démarrée sur http://localhost:${PORT}`);
});

export default app;