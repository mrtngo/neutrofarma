import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  badge?: string;
  subtitle?: string;
  description?: string;
  benefits?: string[];
  featured: boolean;
  createdAt?: Timestamp;
}

export interface Banner {
  id: string;
  title?: string;
  imageUrl: string;
  active: boolean;
  createdAt?: Timestamp;
}

const COLLECTION = "products";
const BANNERS_COLLECTION = "banners";

/** Fetch all products (admin/tienda) */
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

/** Fetch only featured products (homepage) */
export async function getFeaturedProducts(): Promise<Product[]> {
  const snap = await getDocs(
    query(
      collection(db, COLLECTION),
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

/** Fetch a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

/** Add a new product */
export async function addProduct(
  data: Omit<Product, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing product */
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// ── Banners ─────────────────────────────────────────────────────────────────

export async function getBanners(): Promise<Banner[]> {
  const snap = await getDocs(
    query(collection(db, BANNERS_COLLECTION), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Banner));
}

export async function getActiveBanners(): Promise<Banner[]> {
  const snap = await getDocs(
    query(
      collection(db, BANNERS_COLLECTION),
      where("active", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Banner));
}

export async function addBanner(
  data: Omit<Banner, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, BANNERS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBanner(
  id: string,
  data: Partial<Omit<Banner, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, BANNERS_COLLECTION, id), data);
}

export async function deleteBanner(id: string): Promise<void> {
  await deleteDoc(doc(db, BANNERS_COLLECTION, id));
}
