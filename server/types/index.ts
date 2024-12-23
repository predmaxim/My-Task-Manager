import {
  GlobalStateSchema,
  LanguageSchema,
  ThemeSchema,
  UserWithoutPassSchema,
} from "@/zod-schemas/custom";
import { z } from "zod";

export type ThemeType = z.infer<typeof ThemeSchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
export type GlobalStateType = z.infer<typeof GlobalStateSchema>;
export type UserWithoutPass = z.infer<typeof UserWithoutPassSchema>;
