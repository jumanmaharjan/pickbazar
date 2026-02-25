import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState();

  //signup

  const signUpNewUser = async (formData) => {
    try {
      // 1️⃣ Sign up user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      // 2️⃣ Insert into profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          username: formData.username,
          first_name: formData.firstname,
          last_name: formData.lastname,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (profileError) throw profileError;

      // 3️⃣ Insert into addresses
      const { error: addressError } = await supabase.from("addresses").insert([
        {
          user_id: userId, // link to profile
          address_line1: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      ]);

      if (addressError) throw addressError;
      return { success: false };
    } catch (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }
  };

  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      // Handle Supabase error explicitly
      if (error) {
        console.error("Sign-in error:", error.message); // Log the error for debugging
        return { success: false, error: error.message }; // Return the error
      }

      // If no error, return success
      console.log("Sign-in success:", data);
      return { success: true, data }; // Return the user data
    } catch (err) {
      // Handle unexpected issues
      console.error("Unexpected error during sign-in:", err.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  // reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://yourapp.com/update-password",
      });

      if (error) throw error;

      console.log("Password reset email sent!", data);
      return { success: true };
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const currencySymbol = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        signUpNewUser,
        signInUser,
        signOut,
        resetPassword,
        currencySymbol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
