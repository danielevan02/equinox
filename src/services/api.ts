import { BerryApiResponse } from "@/types/berry";
import { Product } from "@/types/product";

const BERRY_API = 'https://pokeapi.co/api/v2/berry/';
const PRODUCT_API = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(PRODUCT_API)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

// Berry API
export const fetchBerries = async (
  limit: number = 20,
  offset: number = 0
): Promise<BerryApiResponse> => {
  const response = await fetch(`${BERRY_API}?limit=${limit}&offset=${offset}`);
  const data = await response.json()
  return data;
};

export const fetchBerryDetail = async (name: string) => {
  const response = await fetch(`${BERRY_API}${name}`);
  const data = await response.json()
  return data;
};