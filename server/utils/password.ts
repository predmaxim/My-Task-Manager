import { compareSync, hashSync } from "bcrypt-ts";

export const checkPassword = (
  rawPassword: string,
  hashedPassword: string,
): boolean => {
  console.log("password:", hashSync(rawPassword, 10));
  console.log("hash:", hashedPassword);
  return compareSync(hashedPassword, hashSync(rawPassword, 10));
};

export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};
