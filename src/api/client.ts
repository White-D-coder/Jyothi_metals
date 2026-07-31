export interface ProductDetailData {
  id: string;
  slug: string;
  name: string;
  category: string;
  subCategory?: string;
  shortDescription?: string;
  fullDescription?: string;
  mainImage: string;
  galleryImages: string[];
  metaTitle?: string;
  metaDescription?: string;
  chemicalComposition: { element: string; value: string }[];
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
  tables?: { title: string; headers: string[]; rows: Record<string, string>[] }[];
  standards?: string[];
  equivalentGrades?: string[];
  dimensions?: string[];
}

const API_BASE = 'http://localhost:4000/api';

export async function fetchProductBySlug(slug: string): Promise<ProductDetailData | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn('[API Client] Backend offline, using catalogData binding.');
    return null;
  }
}
