import { UserWithoutPass } from "@/types";

declare global {
  namespace Express {
    interface Request {
      user?: UserWithoutPass;
    }
  }
}
