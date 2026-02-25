import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { supabase } from "../SupabaseClient";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const latestRequest = useRef(0);

  // 🔹 Search Function
  const searchProducts = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const requestId = ++latestRequest.current;
    setLoading(true);

    const { data, error } = await supabase
      .from("productDetail")
      .select(
        "product_id, product_name, product_img, product_price, sale_price",
      )
      .ilike("product_name", `%${searchTerm}%`)
      .limit(12);

    if (requestId !== latestRequest.current) return;

    if (!error) {
      setResults(data || []);
    }

    setLoading(false);
  };

  // 🔹 Debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      searchProducts(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔹 Close Function (no ESLint error)
  const closeSearch = () => {
    setShowSearch(false);
    setQuery("");
    setResults([]);
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  return (
    <SearchContext.Provider
      value={{
        showSearch,
        openSearch,
        closeSearch,
        query,
        setQuery,
        results,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const UseSearch = () => useContext(SearchContext);
