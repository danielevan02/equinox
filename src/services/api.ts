import { Product } from "@/types/product";

export const BERRY_API = 'https://pokeapi.co/api/v2/berry/';
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