"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { useTableStore } from "@/stores/useTableStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ProductTable() {
  const { loading, products, fetchProducts, deleteProduct } = useProductStore();
  const { page, pageSize, search, sortOrder, setPage, setPageSize, setSearch } = useTableStore();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by name
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [products, search, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, page, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / pageSize);

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
    toast.success("Delete successful");
  };

  if (!mounted) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
          <Input
            placeholder={t("common.search")}
            className="md:max-w-52"
            value=""
            disabled
            readOnly
          />
          <Button className="uppercase" disabled>
            <Plus />
            {t("common.add")}
          </Button>
        </div>
        <div className="border rounded-lg mt-5 overflow-hidden">
          <div className="flex-1 overflow-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-5">{t("common.no")}</TableHead>
                  <TableHead>{t("common.name")}</TableHead>
                  <TableHead className="w-10">{t("common.actions")}</TableHead>
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
          placeholder={t("common.search")}
          className="md:max-w-52"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="uppercase" asChild>
          <Link href="/products/add">
            <Plus />
            {t("common.add")}
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg mt-5 overflow-hidden">
        <div className="flex-1 overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5">{t("common.no")}</TableHead>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead className="w-10">{t("common.actions")}</TableHead>
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
                    {t("common.noData")}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product, i) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{(page - 1) * pageSize + i + 1}</TableCell>
                    <TableCell className="max-w-16 truncate">{product.title}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline">
                        <Link href={`/products/${product.id}`}>
                          <Pencil />
                        </Link>
                      </Button>
                      <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive">
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span className="text-sm text-gray-600">{t("table.itemsPerPage")}:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <span className="text-sm text-gray-600">
            {t("table.showing")} {(page - 1) * pageSize + 1} {t("table.to")}{" "}
            {Math.min(page * pageSize, filteredAndSortedProducts.length)} {t("table.of")}{" "}
            {filteredAndSortedProducts.length} {t("table.results")}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              {t("table.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
            >
              {t("table.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
