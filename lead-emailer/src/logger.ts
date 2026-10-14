type Level = "debug" | "info" | "warn" | "error";
export function log(level: Level, event: string, fields: Record<string, unknown> = {}): void {
  const record = { timestamp: new Date().toISOString(), level, service: "filefast-lead-emailer", event, ...fields };
  const line = JSON.stringify(record);
  (level === "error" || level === "warn" ? console.error : console.log)(line);
}
