import { runIngestionSync } from './scheduler';

console.log('====================================================');
console.log('  STARTING CHAMPAK STEEL LIVE SCRAPING & INGESTION  ');
console.log('  TARGET DB: SUPABASE POSTGRESQL                     ');
console.log('====================================================');

runIngestionSync()
  .then((results) => {
    console.log(`[SUCCESS] Ingested ${results.length} products into Supabase PostgreSQL.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('[ERROR] Scraping Ingestion Failed:', err);
    process.exit(1);
  });
