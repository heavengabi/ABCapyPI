import express from "express";
import userRoutes from "./src/routes/user.routes";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import aacCardRoutes from "./src/routes/aacCard.routes"
import gameRoutes from "./src/routes/game.routes"
import childrenRoutes from "./src/routes/children.routes"
import storyRoutes from "./src/routes/story.routes"
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(aacCardRoutes);
app.use(gameRoutes);
app.use(childrenRoutes)
app.use(storyRoutes)
// Esse middleware deve ser sempre o ultimo
app.use(errorMiddleware);

export default app;