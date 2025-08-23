import { useQuery } from "@tanstack/react-query";

const fetchSimilarProducts = async (productId) => {
  const res = await fetch(`/api/product/similar-products?id=${productId}`);
  if (!res.ok) throw new Error("Failed to fetch similar products");
  return res.json();
};

export default function useSimilarProducts(productId) {
  return useQuery({
    queryKey: ["similar-products", productId],
    queryFn: () => fetchSimilarProducts(productId),
    enabled: !!productId, // Only run if productId exists
  });
}
