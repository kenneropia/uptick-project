import { z } from "zod";

const createNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const updateNoteSchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .optional();

export { createNoteSchema, updateNoteSchema };
