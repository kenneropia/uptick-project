import express, { NextFunction, Request, Response } from "express";
import { db } from "./db";
import userRouter from "./user/user.router";
import noteRouter from "./note/note.router";

const app = express();

app.use(express.json());

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/user", userRouter);
app.use("/api/notes", noteRouter);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).json({ message: "internal server error" });
});
const PORT = (process.env.PORT as unknown as number) || 3000;
const main = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server ready at: http://localhost:${PORT}`);
      console.log(`docs ready at: http://localhost:${PORT}/docs`);
    });
  } catch (e: any) {
    console.error(e.message);
    await db.$disconnect();
    process.exit(1);
  }
};
main();

process.on("unhandledRejection", (reason: Error | any) => {
  console.log(`unhandledRejection: ${reason.message || reason}`);
});

process.on("uncaughtException", (err: Error) => {
  console.log(`uncaughtException: ${err.message}`);
});
