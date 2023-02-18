import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import isAuth from "../middleware/isAuth";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getANote,
  updateNote,
} from "./note.controller";
import { createNoteSchema, updateNoteSchema } from "./note.schema";

const noteRouter = Router();

noteRouter.post(
  "/create-note",
  isAuth,
  validateRequestBody(createNoteSchema),
  createNote
);

noteRouter.get("/", isAuth, getAllNotes);

noteRouter.get("/:noteId", isAuth, getANote);
noteRouter.patch(
  "/:noteId",
  isAuth,
  validateRequestBody(updateNoteSchema),
  updateNote
);

noteRouter.delete("/:noteId", isAuth, deleteNote);

export default noteRouter;
