import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUsers, getAllOrders } from "@/app/lib/db";

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

    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.total || 0),
      0,
    );

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
      .map((order) => {
        // Find the user who placed this order
        const customer = users.find((user) => user.id === order.userId);
        
        // Add customer information to the order
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
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { message: "Internal Error" },
      { status: 500 },
    );
  }
}