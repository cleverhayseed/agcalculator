// src/lib/utils.js
export const $ = (id) => document.getElementById(id);

// Read numeric value from an <input> by id; returns NaN if empty/invalid
export const num = (id) => parseFloat(($(id)?.value ?? "").trim());

// Format a number or show an em dash when not finite
export const fmt = (n, d = 0) =>
  Number.isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d })
    : "—";

// Quality-of-life helpers (optional but handy)
export const ceil = (n) => Math.ceil(n);
export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Add "input" listeners to a set of ids in one line
export const onInputs = (ids, handler) => ids.forEach((id) => $(id).addEventListener("input", handler));
