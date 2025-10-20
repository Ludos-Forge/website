import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 nuova modalità statica
  images: {
    unoptimized: true, // evita errori con next/image
  },
  trailingSlash: true, // ⬅️ forza la generazione /link/index.html

};

export default nextConfig;
