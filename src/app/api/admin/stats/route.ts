import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUsers, getAllOrders, getProducts } from "@/app/lib/db";

const SECRET_KEY = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.EMAIL_USER;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, SECRET_KEY!) as { email: string };
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const users = await getUsers();
    const orders = await getAllOrders();
    const products = await getProducts(); 

    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.total || 0),
      0,
    );

    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const revenueData = last7Days.map(date => {
      const dayOrders = orders.filter(o => o.date.startsWith(date));
      return {
        date,
        revenue: dayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      };
    });

    const productSales: Record<string, any> = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
         if (!productSales[item.name]) {
           productSales[item.name] = { name: item.name, quantity: 0, revenue: 0, image: item.image };
         }
         productSales[item.name].quantity += item.quantity;
         productSales[item.name].revenue += item.totalPrice;
      });
    });
    
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
      .map((order) => {
        const customer = users.find((user) => user.id === order.userId);
        return {
          ...order,
          customer: customer ? {
            name: customer.name,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            country: customer.country,
          } : null,
        };
      });
      
    const usersWithDetails = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        cartCount: user.cart?.length || 0,
        wishlistCount: user.wishlist?.length || 0,
      };
    });

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
      users: usersWithDetails,
      revenueData,
      topProducts,
      products 
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { message: "Internal Error" },
      { status: 500 },
    );
  }
}
