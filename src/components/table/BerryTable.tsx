"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, Plus } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useBerryStore } from "@/stores/useBerryStore";
import { Berry } from "@/types/berry";
import { fetchBerries } from "@/services/api";
import BerryDetailDialog from "../dialog/BerryDetailDialog";

export default function BerryTable() {
  const t = useTranslations();
  const { page, pageSize, search, setPage, setPageSize, setSearch } = useBerryStore();
  const [berries, setBerries] = useState<Berry[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBerry, setSelectedBerry] = useState<Berry | null>(null);

  useEffect(() => {
    setMounted(true);
    const loadBerries = async () => {
      try {
        setLoading(true);
        const data = await fetchBerries(100, 0); // Fetch more berries
        setBerries(data.results);
      } catch (error) {
        console.error("Error fetching berries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBerries();
  }, []);

  const filteredAndSortedBerries = useMemo(() => {
    let result = [...berries];

    // Search filter
    if (search) {
      result = result.filter((berry) => berry.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by name ascending
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [berries, search]);

  const paginatedBerries = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredAndSortedBerries.slice(start, end);
  }, [filteredAndSortedBerries, page, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedBerries.length / pageSize);

  const handleViewBerry = (berry: Berry) => {
    setSelectedBerry(berry);
    setDialogOpen(true);
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
      </div>
      <div className="border rounded-lg mt-5 overflow-scroll max-h-96 md:max-h-[700px] lg:max-h-[300px] xl:max-h-[600px] flex-1 flex flex-col">
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
            ) : berries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  {t("common.noData")}
                </TableCell>
              </TableRow>
            ) : (
              paginatedBerries.map((berry, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{(page - 1) * pageSize + i + 1}</TableCell>
                  <TableCell className="max-w-16 truncate">{berry.name}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" onClick={() => handleViewBerry(berry)}>
                      <Eye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
            {Math.min(page * pageSize, filteredAndSortedBerries.length)} {t("table.of")}{" "}
            {filteredAndSortedBerries.length} {t("table.results")}
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

      {/* Berry Detail Dialog */}
      {selectedBerry && (
        <BerryDetailDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          berries={filteredAndSortedBerries}
          defaultBerry={selectedBerry}
        />
      )}
    </div>
  );
}
