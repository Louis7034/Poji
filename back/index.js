import express from "express";
import enfantRoutes from "./routes/enfant.routes.js";

const app = express();

app.use(express.json());

app.use("/api/enfants", enfantRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Poji API démarrée sur http://localhost:${PORT}`);
});

export default app;