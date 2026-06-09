import { RequestHandler } from "express";
import { errorHandler } from "@/utils/error-handler";
import {
  deleteLogFile,
  isValidDateStamp,
  listLogFiles,
  readLogFile,
  writeLog,
} from "@/utils/logger";

const isFileNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  (error as { code?: string }).code === "ENOENT";

/** Создать запись лога — дозапись строки в файл текущего дня.
 * Тело: { level?, message?, ...meta }
 */
export const createLog: RequestHandler = async (req, res) => {
  try {
    const line = await writeLog(req.body ?? {});
    res.status(201).json({ line });
  } catch (error) {
    res.status(500).json({ message: errorHandler(error) });
  }
};

/** Список лог-файлов (по дням). */
export const getLogs: RequestHandler = async (_req, res) => {
  try {
    const files = await listLogFiles();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: errorHandler(error) });
  }
};

/** Содержимое лога за конкретную дату (YYYY-MM-DD). */
export const getLog: RequestHandler = async (req, res) => {
  try {
    const { date } = req.params;

    if (!isValidDateStamp(date)) {
      res
        .status(400)
        .json({ message: "Invalid date format, expected YYYY-MM-DD" });
      return;
    }

    const lines = await readLogFile(date);
    res.status(200).json({ date, lines });
  } catch (error) {
    if (isFileNotFound(error)) {
      res.status(404).json({ message: "Log not found" });
      return;
    }
    res.status(500).json({ message: errorHandler(error) });
  }
};

/** Удалить лог-файл за конкретную дату (YYYY-MM-DD). */
export const deleteLog: RequestHandler = async (req, res) => {
  try {
    const { date } = req.params;

    if (!isValidDateStamp(date)) {
      res
        .status(400)
        .json({ message: "Invalid date format, expected YYYY-MM-DD" });
      return;
    }

    await deleteLogFile(date);
    res.status(200).json({ date, deleted: true });
  } catch (error) {
    if (isFileNotFound(error)) {
      res.status(404).json({ message: "Log not found" });
      return;
    }
    res.status(500).json({ message: errorHandler(error) });
  }
};
