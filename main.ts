// Deadpan Forecasts for Cities That Do Not Exist — Marnfield, light gravity.
// One broadcast line: a real forecast shape ("sees a high of 31 degrees")
// until the absurdity lands, then a deadpan consequence for the commute.
// Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const forecast =
  "Marnfield sees a high of 31 degrees with light gravity today, so residents are advised to tie down their bins and walk, not float, to work.";

const trimmed = forecast.trim();
if (trimmed !== forecast || trimmed.length === 0) {
  console.error("forecast must be one clean non-blank line");
  process.exit(1);
}
if (forecast.length > 160) {
  console.error(`forecast is ${forecast.length} characters, limit is 160`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, forecast + "\n", "utf8");
chmodSync(target, 0o644);

const onDisk = readFileSync(target, "utf8").replace(/\n$/, "");
if (onDisk !== forecast) {
  console.error("written forecast does not match");
  process.exit(1);
}
console.log(`wrote ${target} (${forecast.length} characters, 1 line)`);
