"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { useProductStore } from "@/stores/useProductStore";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductTable() {
  const { loading, fetchProducts, search, setSearch, getFilteredProducts, deleteProduct } = useProductStore();
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const products = getFilteredProducts();

  useEffect(() => {
    setMounted(true);
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id)
    toast.success("Delete successful")
  }

  if (!mounted) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
          <Input placeholder={t("search")} className="md:max-w-52" value="" disabled readOnly />
          <Button className="uppercase" disabled>
            <Plus />
            {t("add")}
          </Button>
        </div>
        <div className="border rounded-lg mt-5 overflow-hidden">
          <div className="flex-1 overflow-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-5">{t("no")}</TableHead>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead className="w-10">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(6)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
        <Input
          placeholder={t("search")}
          className="md:max-w-52"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="uppercase" asChild>
          <Link href="/products/add">
            <Plus />
            {t("add")}
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg mt-5 overflow-hidden">
        <div className="flex-1 overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5">{t("no")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead className="w-10">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  </TableRow>
                ))
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    {t("noData")}
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, i) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="max-w-16 truncate">
                      {product.title}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline">
                        <Link href={`/products/${product.id}`}>
                          <Pencil/>
                        </Link>
                      </Button>
                      <Button onClick={()=>handleDeleteProduct(product.id)} variant="destructive">
                        <Trash/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
