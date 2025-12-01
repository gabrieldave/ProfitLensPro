import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log("🔧 Iniciando servidor...");
    console.log(`📋 NODE_ENV: ${process.env.NODE_ENV || "no definido"}`);
    
    console.log("📝 Registrando rutas...");
    await registerRoutes(httpServer, app);
    console.log("✅ Rutas registradas");

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "production") {
      console.log("📦 Modo producción: sirviendo archivos estáticos");
      serveStatic(app);
    } else {
      console.log("⚡ Modo desarrollo: configurando Vite...");
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      console.log("✅ Vite configurado");
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    
    httpServer.listen(port, "0.0.0.0", () => {
      log(`✅ Server is running on http://localhost:${port}`);
      log(`✅ API endpoint: http://localhost:${port}/api/dashboard`);
      console.log(`\n🚀 Servidor iniciado correctamente en el puerto ${port}\n`);
    }).on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`❌ Port ${port} is already in use. Please stop the process using this port.`);
        console.error(`\n❌ Error: El puerto ${port} está en uso. Detén el proceso que lo está usando.\n`);
      } else {
        log(`❌ Error starting server: ${err.message}`);
        console.error(`\n❌ Error al iniciar el servidor: ${err.message}\n`);
        console.error(err);
      }
      process.exit(1);
    });
  } catch (error) {
    log(`Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
    process.exit(1);
  }
})();
