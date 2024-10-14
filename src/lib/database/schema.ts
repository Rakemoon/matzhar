import {
    pgTable,
    pgEnum,
    uuid,
    text,
    date,
    boolean,
    integer,
    real,
    varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "buyer", "shoper"]);

export const orderStatus = pgEnum("order_status", [
    "pending_payment",
    "paid",
    "ready_to_ship",
    "cancelled",
    "delivered",
]);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    role: userRole("role").default("buyer"),
    email: varchar("email").unique().notNull(),
    password: varchar("password").notNull(),
});

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
});
export const productVariants = pgTable("products_variants", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    productId: uuid("product_id").references(() => products.id, {
        onDelete: "cascade",
    }),
});

export const productVariantChoices = pgTable("product_variant_choices", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    priceMutation: real("price_mutation").default(0),
    variantId: uuid("variant_id").references(() => productVariants.id, {
        onDelete: "cascade",
    }),
});

export const cart = pgTable("cart", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
});

export const cartItems = pgTable("cart_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    cartId: uuid("cart_id").references(() => cart.id, { onDelete: "cascade" }),
    checked: boolean("checked").default(true),
    amount: integer("amount").default(1),
    productId: uuid("product_id").references(() => products.id, {
        onDelete: "cascade",
    }),
    variantId: uuid("variant_id").references(() => productVariants.id, {
        onDelete: "cascade",
    }),
    variantChoiceId: uuid("variant_choice_id").references(
        () => productVariantChoices.id,
        { onDelete: "cascade" },
    ),
});

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    createdAt: date("created_at").defaultNow(),
    note: text("note"),
    status: orderStatus("name").default("pending_payment"),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey().primaryKey(),
    amount: integer("amount").default(1),
    orderId: uuid("order_id").references(() => orders.id, {
        onDelete: "cascade",
    }),
    productId: uuid("product_id").references(() => products.id, {
        onDelete: "cascade",
    }),
    variantId: uuid("variant_id").references(() => productVariantChoices.id, {
        onDelete: "cascade",
    }),
    variantChoiceId: uuid("variant_choice_id").references(
        () => productVariantChoices.id,
        { onDelete: "cascade" },
    ),
});
