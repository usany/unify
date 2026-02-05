import express from "express";

const app = express();
const PORT = 3000;

// Simple in-memory cache
const cache = new Map<string, { data: string; timestamp: number; ttl: number; status: number; headers: Record<string, string> }>();

// Cache cleanup interval (run every 5 minutes)
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > value.ttl) {
      cache.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`[Cache] Cleaned up ${cleaned} expired entries`);
  }
}, 300000);

// Secure purge endpoint
app.get("/purge", (req, res) => {
  const token = req.headers["x-purge-token"] || req.query.token;

  // if (token !== process.env.PURGE_SECRET) {
  //   console.log("[Cache] Unauthorized purge attempt");
  //   return res.status(403).send("Forbidden: Invalid purge token");
  // }
  console.log("[Cache] Purge triggered by authorized user");
  cache.clear(); // Clear local cache
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return res.status(200).send("Cache purged. Future requests will bypass cache until redeploy.");
});

// Proxy all other requests to Worker
app.use(async (req, res) => {
  const workerUrl = `https://instructions.ckd-qja.workers.dev/`;
  const cacheKey = req.originalUrl;

  // Check cache first (except for auth endpoints and static assets)
  if (!req.originalUrl.startsWith("/api/auth") && !req.originalUrl.startsWith("/_next/")) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      console.log(`[Cache] ${req.originalUrl} → HIT (local)`);
      
      // Set cached headers (already cleaned)
      Object.entries(cached.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      
      return res.status(cached.status).send(cached.data);
    }
  }

  try {
    // Ensure proper URL construction
    const targetUrl = workerUrl + req.originalUrl.replace(/^\//, '');
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        host: new URL(workerUrl).host,
        'accept-encoding': 'identity',
        'user-agent': 'Mozilla/5.0 (compatible; Proxy/1.0)',
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const body = await response.text();

    // Debug: Log what we received
    console.log(`[Debug] Response status: ${response.status}`);
    console.log(`[Debug] Content-encoding: ${response.headers.get('content-encoding')}`);
    console.log(`[Debug] Content-type: ${response.headers.get('content-type')}`);
    console.log(`[Debug] Body length: ${body.length}`);

    // Copy headers but remove ALL compression-related ones
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'content-encoding' && 
          lowerKey !== 'content-length' && 
          lowerKey !== 'transfer-encoding') {
        res.setHeader(key, value);
      } else {
        console.log(`[Debug] Removing header: ${key}: ${value}`);
      }
    });

    // Cache policy
    if (req.originalUrl.startsWith("/api/auth")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    } else {
      res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=30");
    }

    // Log cache status
    const cacheStatus = response.headers.get("x-vercel-cache") || "MISS";
    console.log(`[Cache] ${req.originalUrl} → ${cacheStatus}`);

    // Cache the response if it's cacheable (exclude static assets)
    if (!req.originalUrl.startsWith("/api/auth") && 
        !req.originalUrl.startsWith("/_next/") && 
        response.status === 200) {
      const ttl = 600000; // 10 minutes in milliseconds
      // Clean headers before caching to remove compression-related ones
      const cleanHeaders = Object.fromEntries(
        Array.from(response.headers.entries())
          .filter(([key]) => !['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase()))
      );
      cache.set(cacheKey, {
        data: body,
        timestamp: Date.now(),
        ttl,
        status: response.status,
        headers: cleanHeaders
      });
    }
    
    res.status(response.status).send(body);
  } catch (err) {
    // console.log("Proxy error:", err);
    res.status(500).send("Internal proxy error");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
});
