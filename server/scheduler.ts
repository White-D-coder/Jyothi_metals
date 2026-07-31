import { PrismaClient } from '@prisma/client';
import { scrapeAllProducts } from './scraper';

const prisma = new PrismaClient();

/**
 * Executes scraping ingestion sync and persists into Supabase PostgreSQL.
 */
export async function runIngestionSync() {
  console.log('[Sync Engine] Starting automated scraping ingestion task for Supabase PostgreSQL...');
  try {
    const products = await scrapeAllProducts();
    console.log(`[Sync Engine] Successfully scraped ${products.length} product pages from Champak Steel.`);

    for (const item of products) {
      console.log(`[Sync Engine] Persisting record into Supabase: ${item.name} (${item.slug})`);

      // Upsert Product record into Supabase PostgreSQL
      const productRecord = await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          category: item.category,
          subCategory: item.subCategory || item.category,
          shortDescription: item.shortDescription,
          fullDescription: item.fullDescription,
          mainImage: item.mainImage,
          galleryImages: JSON.stringify(item.galleryImages),
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          standards: JSON.stringify(item.standards),
          equivalentGrades: JSON.stringify(item.equivalentGrades),
          dimensions: JSON.stringify(item.dimensions),
        },
        create: {
          slug: item.slug,
          name: item.name,
          category: item.category,
          subCategory: item.subCategory || item.category,
          shortDescription: item.shortDescription,
          fullDescription: item.fullDescription,
          mainImage: item.mainImage,
          galleryImages: JSON.stringify(item.galleryImages),
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          standards: JSON.stringify(item.standards),
          equivalentGrades: JSON.stringify(item.equivalentGrades),
          dimensions: JSON.stringify(item.dimensions),
        },
      });

      // Clear existing child relations for clean sync
      await prisma.chemicalComposition.deleteMany({ where: { productId: productRecord.id } });
      await prisma.mechanicalProperty.deleteMany({ where: { productId: productRecord.id } });
      await prisma.physicalProperty.deleteMany({ where: { productId: productRecord.id } });
      await prisma.application.deleteMany({ where: { productId: productRecord.id } });
      await prisma.specificationTable.deleteMany({ where: { productId: productRecord.id } });

      // Insert Chemical Compositions
      if (item.chemicalComposition && item.chemicalComposition.length > 0) {
        await prisma.chemicalComposition.createMany({
          data: item.chemicalComposition.map((c) => ({
            productId: productRecord.id,
            grade: c.grade || null,
            element: c.element,
            value: c.value,
          })),
        });
      }

      // Insert Mechanical Properties
      if (item.mechanicalProperties && item.mechanicalProperties.length > 0) {
        await prisma.mechanicalProperty.createMany({
          data: item.mechanicalProperties.map((m) => ({
            productId: productRecord.id,
            grade: m.grade || null,
            tensileStrength: m.tensileStrength || null,
            yieldStrength: m.yieldStrength || null,
            elongation: m.elongation || null,
            hardnessBrinell: m.hardnessBrinell || null,
            hardnessRockwell: m.hardnessRockwell || null,
          })),
        });
      }

      // Insert Physical Properties
      if (item.physicalProperties && item.physicalProperties.length > 0) {
        await prisma.physicalProperty.createMany({
          data: item.physicalProperties.map((p) => ({
            productId: productRecord.id,
            propertyName: p.propertyName,
            value: p.value,
          })),
        });
      }

      // Insert Applications
      if (item.applications && item.applications.length > 0) {
        await prisma.application.createMany({
          data: item.applications.map((app) => ({
            productId: productRecord.id,
            industryName: app,
          })),
        });
      }

      // Insert Specification Tables
      if (item.tables && item.tables.length > 0) {
        for (const tbl of item.tables) {
          await prisma.specificationTable.create({
            data: {
              productId: productRecord.id,
              title: tbl.title,
              columns: JSON.stringify(tbl.headers),
              rows: JSON.stringify(tbl.rows),
            },
          });
        }
      }
    }

    console.log('[Sync Engine] All product records successfully ingested into Supabase PostgreSQL!');
    return products;
  } catch (err) {
    console.error('[Sync Engine] Ingestion task failed:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
