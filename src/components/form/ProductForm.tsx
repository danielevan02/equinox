"use client";

import { useProductStore } from "@/stores/useProductStore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

const productSchema = z.object({
  title: z.string("Please enter string").min(1, "Please enter name for this product"),
  price: z.number().min(1, "Please enter the price for this product"),
  description: z.string().min(1, "Please enter description for this product"),
  category: z.string().min(1, "Please enter category for this product"),
  image: z.string().min(1, "Please enter category for this product"),
  rating: z.object({
    rate: z.number().min(1, "Please enter rate for this product"),
    count: z.number().min(1, "Please enter count for this product"),
  }),
});

type ProductType = z.infer<typeof productSchema>;

export default function ProductForm({ productId }: { productId?: number }) {
  const { addProduct, getProductById, updateProduct } = useProductStore();
  const router = useRouter();
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      price: 0,
      rating: {
        rate: 0,
        count: 0,
      },
    },
  });

  useEffect(() => {
    if (productId) {
      const product = getProductById(productId);
      if (product) {
        form.reset({
          title: product.title,
          description: product.description,
          category: product.category,
          image: product.image,
          price: product.price,
          rating: product.rating,
        });
      }
    }
  }, [productId, getProductById, form]);

  const onSubmit = (data: ProductType) => {
    if(productId){
      updateProduct(productId, data as Product)
      toast.success("Product Updated!");
      router.push("/products");
    } else {
      addProduct(data as Product);
      toast.success("Product Added!");
      router.push("/products");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label>Title</Label>
                    <Input placeholder="enter product title..." {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label>Category</Label>
                    <Input placeholder="enter product category..." {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label>Description</Label>
                    <Input placeholder="enter product description..." {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      placeholder="enter product price..."
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      value={field.value || ""}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                    />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label>Image</Label>
                    <Input placeholder="enter product image..." {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-1 justify-between">
            <FormField
              control={form.control}
              name="rating.count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label>Count</Label>
                      <Input
                        type="number"
                        placeholder="enter product count..."
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        value={field.value || ""}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating.rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label>Rate</Label>
                      <Input
                        type="number"
                        placeholder="enter product rate..."
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        value={field.value || ""}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" asChild className="flex-1">
            <Link href="/products">Cancel</Link>
          </Button>
          <Button type="submit" className="flex-1">
            {productId ? "Update" :"Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
