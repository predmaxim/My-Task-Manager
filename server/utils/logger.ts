import { promises as fs } from "fs";
import path from "path";

// Файловый логгер с ротацией по дням: один текстовый файл в сутки —
// server/logs/2026-06-09.log, запись построчно через append.

export const LOGS_DIR = path.join(process.cwd(), "server", "logs");

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  level?: LogLevel;
  message?: string;
  [key: string]: unknown;
};

export type LogFileInfo = {
  name: string;
  date: string;
  size: number;
  modifiedAt: string;
};

/** Получить строку с датой в формате YYYY-MM-DD для текущей даты или переданной. */
const getDateStamp = (date: Date = new Date()): string =>
  date.toISOString().slice(0, 10);

const getLogFilePath = (date: string = getDateStamp()): string =>
  path.join(LOGS_DIR, `${date}.log`);

export const isValidDateStamp = (value: string): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(value);

/** Форматировать строку лога. */
const formatLine = (entry: LogEntry): string => {
  const { level = "info", message = "", ...meta } = entry;
  const timestamp = new Date().toISOString();
  const levelTag = level.toUpperCase().padEnd(5);
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] ${levelTag} ${message}${metaStr}`;
};

/** Записывает в конец файла одну строку в файл текущего дня (папка/файл создаются при необходимости). */
export const writeLog = async (entry: LogEntry): Promise<string> => {
  await fs.mkdir(LOGS_DIR, { recursive: true });
  const line = formatLine(entry);
  await fs.appendFile(getLogFilePath(), `${line}\n`, "utf-8");
  return line;
};

/** Возвращает список доступных лог-файлов, новые сверху. */
export const listLogFiles = async (): Promise<LogFileInfo[]> => {
  await fs.mkdir(LOGS_DIR, { recursive: true });
  const files: string[] = await fs.readdir(LOGS_DIR);

  const infos = await Promise.all(
    files
      .filter((name) => name.endsWith(".log"))
      .map(async (name) => {
        const { size, mtime } = await fs.stat(path.join(LOGS_DIR, name));
        return {
          name,
          date: name.replace(/\.log$/, ""),
          size,
          modifiedAt: mtime.toISOString(),
        } as LogFileInfo;
      }),
  );

  return infos.sort((a, b) => b.date.localeCompare(a.date));
};

/** Возвращает строки лога за конкретную дату. */
export const readLogFile = async (date: string): Promise<string[]> => {
  if (!isValidDateStamp(date)) {
    throw new Error("Invalid date format, expected YYYY-MM-DD");
  }
  const content = await fs.readFile(getLogFilePath(date), "utf-8");
  return content.split("\n").filter(Boolean);
};

/** Удаляет лог-файл за дату. */
export const deleteLogFile = async (date: string): Promise<void> => {
  if (!isValidDateStamp(date)) {
    throw new Error("Invalid date format, expected YYYY-MM-DD");
  }
  await fs.rm(getLogFilePath(date));
};

/** Шорткаты для логирования: logger.info("...", { meta }). */
export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) =>
    writeLog({ level: "debug", message, ...meta }),
  info: (message: string, meta?: Record<string, unknown>) =>
    writeLog({ level: "info", message, ...meta }),
  warn: (message: string, meta?: Record<string, unknown>) =>
    writeLog({ level: "warn", message, ...meta }),
  error: (message: string, meta?: Record<string, unknown>) =>
    writeLog({ level: "error", message, ...meta }),
};
