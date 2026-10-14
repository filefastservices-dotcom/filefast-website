import { z } from "zod";

const schema = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_DB: z.string().min(1),
  MONGODB_COLLECTION: z.string().default("leads"),
  EMAIL_PROVIDER: z.enum(["smtp", "sendgrid"]),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().email(),
  FROM_NAME: z.string().default("FileFast Global"),
  UNSUBSCRIBE_BASE_URL: z.string().url(),
  HMAC_SECRET: z.string().min(32, "HMAC_SECRET must contain at least 32 characters"),
  BATCH_SIZE: z.coerce.number().int().min(1).max(1000).default(25),
  MAX_PER_MINUTE: z.coerce.number().int().min(1).max(10000).default(30),
  MAX_RETRIES: z.coerce.number().int().min(0).max(10).default(3),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_MAX_POOL_SIZE: z.coerce.number().int().min(1).max(100).default(10),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  DRY_RUN: z.enum(["true", "false"]).default("false"),
  WORKER_ID: z.string().optional()
});

export type Config = z.infer<typeof schema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  if (parsed.data.EMAIL_PROVIDER === "smtp") {
    for (const key of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const) {
      if (!parsed.data[key]?.trim()) throw new Error(`EMAIL_PROVIDER=smtp requires ${key}`);
    }
  }
  if (parsed.data.EMAIL_PROVIDER === "sendgrid" && !parsed.data.SENDGRID_API_KEY?.trim()) {
    throw new Error("EMAIL_PROVIDER=sendgrid requires SENDGRID_API_KEY");
  }
  return parsed.data;
}
