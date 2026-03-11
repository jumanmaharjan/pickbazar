import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [amount, setAmount] = useState({ subtotal: 0, total: 0 });
  const [user, setUser] = useState(null);

  // 🔹 Fetch or create cart
  const getOrCreateCart = async (userId) => {
    const { data: cart } = await supabase
      .from("carts")
      .select("cart_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (cart) {
      setCartId(cart.cart_id);
      return cart.cart_id;
    }

    const { data: newCart } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select()
      .single();

    setCartId(newCart.cart_id);
    return newCart.cart_id;
  };

  // 🔹 Refresh cart
  const refreshCart = async (currentUser) => {
    if (!currentUser) return;

    const id = await getOrCreateCart(currentUser.id);

    const { data: items } = await supabase
      .from("cart_items")
      .select("quantity, product_id")
      .eq("cart_id", id);

    if (!items) return;

    const { data: products } = await supabase
      .from("productDetail")
      .select(
        "product_id, product_name, product_img, product_price, sale_price",
      )
      .in(
        "product_id",
        items.map((i) => i.product_id),
      );

    const merged = items.map((item) => {
      const product = products.find((p) => p.product_id === item.product_id);

      return {
        ...item,
        product_name: product?.product_name,
        product_img: product?.product_img,
        product_price: product?.sale_price ?? product?.product_price ?? 0,
      };
    });

    setCartItems(merged);

    const subtotal = merged.reduce(
      (sum, item) => sum + item.quantity * item.product_price,
      0,
    );

    setAmount({
      subtotal,
      total: subtotal + subtotal * 0.05,
    });

    setCartCount(merged.reduce((sum, item) => sum + item.quantity, 0));
  };

  // 🔹 Add to cart
  const addToCart = async ({ productId, quantity, price }) => {
    if (!user)
      return {
        error: "not_auth",
      };

    try {
      const cart_id = await getOrCreateCart(user.id);

      // Check if product already exists
      const { data: existing, error: existingError } = await supabase
        .from("cart_items")
        .select("cart_item_id, quantity")
        .eq("cart_id", cart_id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existingError) throw existingError;

      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("cart_item_id", existing.cart_item_id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("cart_items").insert({
          cart_id,
          user_id: user.id,
          product_id: productId,
          quantity,
          price: price ?? 0,
        });

        if (error) throw error;
      }

      // Refresh cart
      await refreshCart(user);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart");
    }
  };
  // 🔹 Remove item
  const removeFromCart = async (productId) => {
    if (!cartId) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId)
      .eq("product_id", productId);

    if (error) throw error;

    await refreshCart(user);
  };

  // 🔹 Update quantity
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1 || !cartId) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("cart_id", cartId)
      .eq("product_id", productId);
    if (error) throw error;

    await refreshCart(user);
  };

  // 🔹 Listen to auth state
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await refreshCart(currentUser);
        } else {
          setCartItems([]);
          setCartCount(0);
          setAmount({ subtotal: 0, total: 0 });
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        amount,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => useContext(CartContext);
