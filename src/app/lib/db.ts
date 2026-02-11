import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/app/logindb.json');

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: number;
  items: any[];
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postcode: string;
    paymentMethod: string;
  };
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
  db.users.push(user);
  await saveDb(db);
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