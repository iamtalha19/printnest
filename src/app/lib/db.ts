import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/app/data/logindb.json');
const SHOP_DB_PATH = path.join(process.cwd(), 'src/app/data/shop.json');
const MAIN_DB_PATH = path.join(process.cwd(), 'src/app/data/db.json');

export interface SavedCard {
  id: string;
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  cart?: any[];
  wishlist?: any[];
  savedCards?: SavedCard[];
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: number;
  items: any[];
  customer?: any;
}

interface Database {
  users: User[];
  orders: Order[];
}

async function getDb(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], orders: [] };
  }
}

async function saveDb(db: Database) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function getUsers() {
  const db = await getDb();
  return db.users;
}

export async function addUser(user: User) {
  const db = await getDb();
  user.cart = [];
  user.wishlist = [];
  user.savedCards = []; 
  db.users.push(user);
  await saveDb(db);
}
export async function updateUser(userId: string, data: Partial<User>) {
  const db = await getDb();
  const userIndex = db.users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    db.users[userIndex] = { ...db.users[userIndex], ...data };
    await saveDb(db);
    return true;
  }
  return false;
}

export async function getOrders(userId: string) {
  const db = await getDb();
  return db.orders ? db.orders.filter(order => order.userId === userId) : [];
}

export async function addOrder(order: Order) {
  const db = await getDb();
  if (!db.orders) db.orders = [];
  db.orders.push(order);
  await saveDb(db);
}

export async function getAllOrders() {
  const db = await getDb();
  return db.orders || [];
}

export async function deleteUser(userId: string) {
  const db = await getDb();
  const userIndex = db.users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    db.users.splice(userIndex, 1);
    await saveDb(db);
    return true;
  }
  return false;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const db = await getDb();
  const orderIndex = db.orders?.findIndex((o) => o.id === orderId);

  if (orderIndex !== undefined && orderIndex !== -1) {
    db.orders[orderIndex].status = status;
    await saveDb(db);
    return db.orders[orderIndex];
  }
  return null;
}

export async function getProducts() {
  try {
    const data = await fs.readFile(SHOP_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveProducts(products: any[]) {
  await fs.writeFile(SHOP_DB_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

export async function addProduct(product: any) {
  const products = await getProducts();
  const newId = products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...product };
  products.unshift(newProduct);
  await saveProducts(products);
  return newProduct;
}

export async function updateProduct(productId: number, data: any) {
  const products = await getProducts();
  const index = products.findIndex((p: any) => p.id === productId);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...data };
    await saveProducts(products);
    return products[index];
  }
  return null;
}

export async function deleteProductRecord(productId: number) {
  const products = await getProducts();
  const index = products.findIndex((p: any) => p.id === productId);
  
  if (index !== -1) {
    products.splice(index, 1);
    await saveProducts(products);
    return true;
  }
  return false;
}

export async function getReviews() {
  try {
    const data = await fs.readFile(MAIN_DB_PATH, 'utf-8');
    return JSON.parse(data).testimonials?.testimonials || [];
  } catch (error) {
    return [];
  }
}

async function saveReviews(reviews: any[]) {
  try {
    const data = JSON.parse(await fs.readFile(MAIN_DB_PATH, 'utf-8'));
    if (!data.testimonials) data.testimonials = { header: {}, testimonials: [] };
    data.testimonials.testimonials = reviews;
    await fs.writeFile(MAIN_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to save reviews", error);
  }
}

export async function addReview(review: any) {
  const reviews = await getReviews();
  reviews.unshift(review);
  await saveReviews(reviews);
  return review;
}

export async function updateReview(index: number, data: any) {
  const reviews = await getReviews();
  if (index >= 0 && index < reviews.length) {
    reviews[index] = { ...reviews[index], ...data };
    await saveReviews(reviews);
    return reviews[index];
  }
  return null;
}

export async function deleteReviewRecord(index: number) {
  const reviews = await getReviews();
  if (index >= 0 && index < reviews.length) {
    reviews.splice(index, 1);
    await saveReviews(reviews);
    return true;
  }
  return false;
}