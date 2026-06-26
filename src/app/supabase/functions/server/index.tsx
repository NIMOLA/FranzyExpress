import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Create Supabase clients
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

const getSupabaseAnonClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6db4a86a/health", (c) => {
  return c.json({ status: "ok" });
});

// Admin signup endpoint (for initial admin setup)
app.post("/make-server-6db4a86a/admin/signup", async (c) => {
  try {
    const { email, password, name, adminCode } = await c.req.json();
    
    // Check admin code (you should change this secret code)
    const ADMIN_SETUP_CODE = Deno.env.get("ADMIN_SETUP_CODE") || "FRANZY_ADMIN_2024";
    
    if (adminCode !== ADMIN_SETUP_CODE) {
      return c.json({ success: false, error: "Invalid admin setup code" }, 403);
    }
    
    const supabase = getSupabaseClient();
    
    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'admin'
      },
      email_confirm: true, // Auto-confirm since email server not configured
    });
    
    if (error) {
      console.error("Admin signup error:", error);
      return c.json({ success: false, error: error.message }, 400);
    }
    
    return c.json({ 
      success: true, 
      message: "Admin account created successfully",
      userId: data.user?.id
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return c.json({ success: false, error: "Failed to create admin account" }, 500);
  }
});

// Admin login endpoint
app.post("/make-server-6db4a86a/admin/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const supabase = getSupabaseAnonClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Admin login error:", error);
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }
    
    // Check if user has admin role
    const userRole = data.user?.user_metadata?.role;
    if (userRole !== 'admin') {
      return c.json({ success: false, error: "Access denied: Not an admin" }, 403);
    }
    
    return c.json({ 
      success: true,
      accessToken: data.session?.access_token,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
      }
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    return c.json({ success: false, error: "Login failed" }, 500);
  }
});

// Verify admin token
app.get("/make-server-6db4a86a/admin/verify", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "No token provided" }, 401);
    }
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ success: false, error: "Invalid token" }, 401);
    }
    
    // Check if user has admin role
    if (user.user_metadata?.role !== 'admin') {
      return c.json({ success: false, error: "Not an admin" }, 403);
    }
    
    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
      }
    });
  } catch (error) {
    console.error("Error verifying admin:", error);
    return c.json({ success: false, error: "Verification failed" }, 500);
  }
});

// User signup endpoint
app.post("/make-server-6db4a86a/user/signup", async (c) => {
  try {
    const { email, password, name, phone } = await c.req.json();
    
    const supabase = getSupabaseClient();
    
    // Create user account
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        phone,
        role: 'user'
      },
      email_confirm: true, // Auto-confirm since email server not configured
    });
    
    if (error) {
      console.error("User signup error:", error);
      return c.json({ success: false, error: error.message }, 400);
    }
    
    return c.json({ 
      success: true, 
      message: "User account created successfully",
      userId: data.user?.id
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ success: false, error: "Failed to create user account" }, 500);
  }
});

// User login endpoint
app.post("/make-server-6db4a86a/user/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const supabase = getSupabaseAnonClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("User login error:", error);
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }
    
    // Check if user has user role (not admin)
    const userRole = data.user?.user_metadata?.role;
    if (userRole !== 'user') {
      return c.json({ success: false, error: "Please use admin login" }, 403);
    }
    
    return c.json({ 
      success: true,
      accessToken: data.session?.access_token,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        phone: data.user?.user_metadata?.phone,
      }
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return c.json({ success: false, error: "Login failed" }, 500);
  }
});

// Verify user token
app.get("/make-server-6db4a86a/user/verify", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "No token provided" }, 401);
    }
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ success: false, error: "Invalid token" }, 401);
    }
    
    // Check if user has user role
    if (user.user_metadata?.role !== 'user') {
      return c.json({ success: false, error: "Not a user" }, 403);
    }
    
    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        phone: user.user_metadata?.phone,
      }
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return c.json({ success: false, error: "Verification failed" }, 500);
  }
});

// Send email notification helper
async function sendEmailNotification(subject: string, body: string) {
  // TODO: Add your email service API key (Resend, SendGrid, etc.)
  const EMAIL_API_KEY = Deno.env.get("EMAIL_API_KEY") || "YOUR_EMAIL_API_KEY_HERE";
  const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") || "owner@franzyxpress.com";
  
  // Using Resend as example - replace with your preferred email service
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${EMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FranzyXpress <notifications@franzyxpress.com>",
        to: [OWNER_EMAIL],
        subject: subject,
        html: body,
      }),
    });
    
    if (!response.ok) {
      console.error("Email notification failed:", await response.text());
    } else {
      console.log("Email notification sent successfully");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Submit order endpoint
app.post("/make-server-6db4a86a/submit-order", async (c) => {
  try {
    const orderData = await c.req.json();
    
    // Generate unique order ID
    const orderId = `FRZ-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const order = {
      id: orderId,
      ...orderData,
      timestamp,
      status: "pending",
    };
    
    // Save to KV store
    await kv.set(`order:${orderId}`, order);
    
    // Add to orders list
    const ordersList = await kv.get("orders:list") || [];
    ordersList.unshift(orderId);
    await kv.set("orders:list", ordersList);
    
    // Send email notification
    const emailBody = `
      <h2>🚚 New Delivery Order Received</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Customer Name:</strong> ${orderData.customerName}</p>
      <p><strong>Phone:</strong> ${orderData.phone}</p>
      <p><strong>Pickup Location:</strong> ${orderData.pickupLocation}</p>
      <p><strong>Delivery Location:</strong> ${orderData.deliveryLocation}</p>
      <p><strong>Package Details:</strong> ${orderData.packageDetails}</p>
      <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
    `;
    
    await sendEmailNotification(`New Order: ${orderId}`, emailBody);
    
    return c.json({ 
      success: true, 
      orderId,
      message: "Order submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting order:", error);
    return c.json({ success: false, error: "Failed to submit order" }, 500);
  }
});

// Submit inquiry endpoint
app.post("/make-server-6db4a86a/submit-inquiry", async (c) => {
  try {
    const inquiryData = await c.req.json();
    
    // Generate unique inquiry ID
    const inquiryId = `INQ-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const inquiry = {
      id: inquiryId,
      ...inquiryData,
      timestamp,
      status: "unread",
    };
    
    // Save to KV store
    await kv.set(`inquiry:${inquiryId}`, inquiry);
    
    // Add to inquiries list
    const inquiriesList = await kv.get("inquiries:list") || [];
    inquiriesList.unshift(inquiryId);
    await kv.set("inquiries:list", inquiriesList);
    
    // Send email notification
    const emailBody = `
      <h2>💬 New Customer Inquiry</h2>
      <p><strong>Inquiry ID:</strong> ${inquiryId}</p>
      <p><strong>Customer Name:</strong> ${inquiryData.name || "Not provided"}</p>
      <p><strong>Contact:</strong> ${inquiryData.contact || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${inquiryData.message}</p>
      <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
    `;
    
    await sendEmailNotification(`New Inquiry: ${inquiryId}`, emailBody);
    
    return c.json({ 
      success: true, 
      inquiryId,
      message: "Inquiry submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return c.json({ success: false, error: "Failed to submit inquiry" }, 500);
  }
});

// Get all orders (protected - admin only)
app.get("/make-server-6db4a86a/orders", async (c) => {
  try {
    // Verify admin access
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user || user.user_metadata?.role !== 'admin') {
      return c.json({ success: false, error: "Access denied" }, 403);
    }
    
    const ordersList = await kv.get("orders:list") || [];
    const orders = [];
    
    for (const orderId of ordersList) {
      const order = await kv.get(`order:${orderId}`);
      if (order) orders.push(order);
    }
    
    return c.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return c.json({ success: false, error: "Failed to fetch orders" }, 500);
  }
});

// Get all inquiries (protected - admin only)
app.get("/make-server-6db4a86a/inquiries", async (c) => {
  try {
    // Verify admin access
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user || user.user_metadata?.role !== 'admin') {
      return c.json({ success: false, error: "Access denied" }, 403);
    }
    
    const inquiriesList = await kv.get("inquiries:list") || [];
    const inquiries = [];
    
    for (const inquiryId of inquiriesList) {
      const inquiry = await kv.get(`inquiry:${inquiryId}`);
      if (inquiry) inquiries.push(inquiry);
    }
    
    return c.json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return c.json({ success: false, error: "Failed to fetch inquiries" }, 500);
  }
});

Deno.serve(app.fetch);