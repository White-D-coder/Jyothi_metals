export interface ScrapedTable {
  title: string;
  headers: string[];
  rows: Record<string, string>[];
}

export interface ScrapedProductData {
  slug: string;
  name: string;
  category: string;
  subCategory?: string;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  galleryImages: string[];
  metaTitle: string;
  metaDescription: string;
  chemicalComposition: { grade?: string; element: string; value: string }[];
  mechanicalProperties: {
    grade?: string;
    tensileStrength?: string;
    yieldStrength?: string;
    elongation?: string;
    hardnessBrinell?: string;
    hardnessRockwell?: string;
  }[];
  physicalProperties: { propertyName: string; value: string }[];
  applications: string[];
  tables: ScrapedTable[];
  standards: string[];
  equivalentGrades: string[];
  dimensions: string[];
  relatedProductSlugs: string[];
}
