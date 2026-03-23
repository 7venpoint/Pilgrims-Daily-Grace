import bcrypt from "bcryptjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import type { Express } from "express";
import { Pool } from "pg";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq, or } from "drizzle-orm";

export function setupSession(app: Express) {
  const PgSession = connectPgSimple(session);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  app.use(
    session({
      store: new PgSession({
        pool,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "daily-grace-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
    })
  );
}

export function setupAuth(app: Express) {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
      }
      if (username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters." });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
      }

      const existing = await db
        .select()
        .from(users)
        .where(
          username
            ? eq(users.username, username.toLowerCase())
            : eq(users.id, "none")
        )
        .limit(1);

      if (existing.length > 0) {
        return res.status(409).json({ error: "Username already taken." });
      }

      if (email) {
        const existingEmail = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);
        if (existingEmail.length > 0) {
          return res.status(409).json({ error: "Email already in use." });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const [user] = await db
        .insert(users)
        .values({
          username: username.toLowerCase(),
          email: email ? email.toLowerCase() : null,
          password: hashedPassword,
        })
        .returning();

      const sess = req.session as any;
      sess.user = {
        id: user.id,
        username: user.username,
        email: user.email || "",
      };

      res.json({ user: sess.user });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: "Registration failed. Please try again." });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
      }

      const identifier = username.toLowerCase();
      const found = await db
        .select()
        .from(users)
        .where(or(eq(users.username, identifier), eq(users.email, identifier)))
        .limit(1);

      if (found.length === 0) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const user = found[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const sess = req.session as any;
      sess.user = {
        id: user.id,
        username: user.username,
        email: user.email || "",
      };

      res.json({ user: sess.user });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    const sess = req.session as any;
    if (sess?.user) {
      res.json({ user: sess.user, isAuthenticated: true });
    } else {
      res.json({ user: null, isAuthenticated: false });
    }
  });
}

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      username: string;
      email: string;
    };
  }
}
