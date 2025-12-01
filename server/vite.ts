import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  try {
    const serverOptions = {
      middlewareMode: true,
      hmr: { server, path: "/vite-hmr" },
      allowedHosts: true as const,
    };

    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          viteLogger.error(msg, options);
          // Don't exit on error, just log it
        },
      },
      server: serverOptions,
      appType: "custom",
    });

    // Apply Vite middlewares conditionally to avoid intercepting API routes
    app.use((req, res, next) => {
      // Skip Vite middlewares for API routes
      if (req.path.startsWith("/api")) {
        return next();
      }
      // Apply Vite middlewares for all other routes
      vite.middlewares(req, res, next);
    });

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      // Skip API routes and Vite HMR - let them be handled by their respective handlers
      if (url.startsWith("/api") || url.startsWith("/vite-hmr")) {
        return next();
      }

      try {
        const clientTemplate = path.resolve(
          import.meta.dirname,
          "..",
          "client",
          "index.html",
        );

        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } catch (error) {
    console.error("Error setting up Vite:", error);
    throw error;
  }
}
