import { z } from "zod";
import { UserSchema } from "@/zod-schemas/generated";

export const ThemeSchema = z.enum(["dark", "light"]);
export const LanguageSchema = z.enum(["ru", "en"]);
export const GlobalStateSchema = z.object({
  theme: ThemeSchema,
  language: LanguageSchema,
});

// TODO: change min password length to 6 characters in PasswordSchema
export const PasswordSchema = z
  .string()
  .refine((data) => data.length >= 2 && data.length <= 100, {
    message: "Passwords must contain min 2 and max 100 character(s) ",
  });
export const UserWithoutPassSchema = UserSchema.omit({
  password: true,
  created: true,
});

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({ password: PasswordSchema });

export const RegisterSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).extend({
  password: PasswordSchema,
  email: z.string().email(),
});

export const JwtPayloadSchema = z
  .object({
    iss: z.string().optional(),
    sub: z.string().optional(),
    aud: z.union([z.string(), z.array(z.string())]).optional(),
    exp: z.number().optional(),
    nbf: z.number().optional(),
    iat: z.number().optional(),
    jti: z.string().optional(),
  })
  .catchall(z.any());
