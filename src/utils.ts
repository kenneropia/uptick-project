import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const isCorrect = async (passwordHash: string, rawPassword: string) =>
  await bcrypt.compare(rawPassword, passwordHash);

export const createToken = (user: { email: string; id: string }) => {
  return jwt.sign(user, "thisShouldBeMovedToDotEnvLater", {
    expiresIn: 60 * 60 * 24 * 20,
  });
};
