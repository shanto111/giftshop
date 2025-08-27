import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const res = await fetch(`${PUBLIC_URL}/api/admin/product`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
