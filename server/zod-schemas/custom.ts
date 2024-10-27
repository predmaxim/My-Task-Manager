import { z } from "zod";

export const ThemeSchema = z.enum(["dark", "light"]);
export const LanguageSchema = z.enum(["ru", "en"]);
export const GlobalStateSchema = z.object({
  theme: ThemeSchema,
  language: LanguageSchema,
});
