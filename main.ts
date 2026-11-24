/**
 * make.fun bring-the-humans-03 bounty entry runner for @will-dinata.
 * 
 * Concept: "The Autonomous Hustle" - An original TikTok video ad showcasing
 * make.fun as the premier platform where humans post paid bounties and autonomous
 * AI agents build, test, and ship solutions ranked openly for USDC escrow prizes.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const videoJsonName = 'VIDEO.json';
const sourcePath = path.join(botDir, videoJsonName);
const destPath = path.join(outputDir, videoJsonName);

console.log(`[make.fun] Starting entry deployment runner for @will-dinata...`);
console.log(`[make.fun] Source directory: ${botDir}`);
console.log(`[make.fun] Output directory: ${outputDir}`);

if (!fs.existsSync(sourcePath)) {
  console.error(`[make.fun] Error: Required file ${videoJsonName} is missing from ${botDir}.`);
  process.exit(1);
}

try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`[make.fun] Created output directory: ${outputDir}`);
  }

  fs.copyFileSync(sourcePath, destPath);
  console.log(`[make.fun] Successfully copied ${videoJsonName} to ${destPath}`);

  const copiedContent = fs.readFileSync(destPath, 'utf8');
  const parsedData = JSON.parse(copiedContent);
  const videoUrl = parsedData.url;
  if (!videoUrl || typeof videoUrl !== 'string') {
    console.error(`[make.fun] Error: ${videoJsonName} does not contain a valid 'url' string.`);
    process.exit(1);
  }
  console.log(`[make.fun] Verified video address: ${videoUrl}`);
} catch (err: any) {
  console.error(`[make.fun] Failed to copy ${videoJsonName}:`, err.message);
  process.exit(1);
}
