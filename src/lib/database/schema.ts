import { relations } from "drizzle-orm";
import { pgTable, pgEnum, uuid, text , date, boolean, integer, real } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "buyer", "shoper"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: userRole("role").default("buyer"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  userId: uuid("user_id").references(() => users.id),
});

export const productVariants = pgTable("products_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  productId: uuid("product_id").references(() => products.id),
});

export const productVariantChoices = pgTable("product_variant_choices", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  priceMutation: real("price_mutation").default(0),
  variantId: uuid("variant_id").references(() => productVariants.id)
});

export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id").references(() => cart.id),
  checked: boolean("checked").default(true),
  amount: integer("amount").default(1),
  productId: uuid("product_id").references(() => products.id),
  variantId: uuid("variant_id").references(() => productVariants.id),
  variantChoiceId: uuid("variant_choice_id").references(() => productVariantChoices.id),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  createdAt: date("created_at").defaultNow(),
  note: text("note"),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey().primaryKey(),
  amount: integer("amount").default(1),
  orderId: uuid("order_id").references(() => orders.id),
  productId: uuid("product_id").references(() => products.id),
  variantId: uuid("variant_id").references(() => productVariantChoices.id),
  variantChoiceId: uuid("variant_choice_id").references(() => productVariantChoices.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  product: one(products),
  variant: one(productVariants),
  variantChoice: one(productVariantChoices)
}));

export const productVariantsRelations = relations(productVariants, ({ many }) => ({
  choices: many(productVariantChoices),
}));

export const cartRelations = relations(cart, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cart, ({ one }) => ({
  product: one(products),
  variant: one(productVariants),
  variantChoice: one(productVariantChoices)
}));
