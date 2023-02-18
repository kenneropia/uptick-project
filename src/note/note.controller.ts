import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../db";
import { createNoteSchema, updateNoteSchema } from "./note.schema";

const createNote = async (
  req: Request<any, any, z.infer<typeof createNoteSchema>>,
  res: Response
) => {
  console.log(req.user);
  const note = await db.note.create({
    data: { ...req.body, userId: req.user!.id },
  });
  return res.json({ note });
};

const getANote = async (req: Request, res: Response) => {
  const note = await db.note.findFirst({
    where: { userId: req.user!.id, id: req.params.noteId },
  });
  return res.json({ note });
};

const getAllNotes = async (req: Request, res: Response) => {
  const notes = await db.note.findMany({
    where: { userId: req.user!.id },
  });
  return res.json({ notes });
};

const updateNote = async (
  req: Request<any, any, z.infer<typeof updateNoteSchema>>,
  res: Response
) => {
  const note = await db.note.update({
    where: {
      id: req.params.noteId,
    },
    data: { ...req.body, userId: req.user!.id },
  });

  return res.json({ note });
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    await db.note.findUniqueOrThrow({ where: { id: req.params.noteId } });
  } catch (err) {
    return res.status(404).json({ message: "not found" });
  }

  const note = await db.note.delete({
    where: {
      id: req.params.noteId,
    },
  });

  return res.json({ note });
};

export { createNote, updateNote, deleteNote, getAllNotes, getANote };
