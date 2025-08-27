import { useQuery } from "@tanstack/react-query";

const fetchSingleProduct = async (id) => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error("Failed to fetch single product");
  return res.json();
};

export default function useSingleProduct(id) {
  return useQuery({
    queryKey: ["single-product", id],
    queryFn: () => fetchSingleProduct(id),
    enabled: !!id,
  });
}
