"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Berry, BerryDetail } from "@/types/berry";
import { fetchBerryDetail } from "@/services/api";
import { useTranslations } from "next-intl";

interface BerryDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  berries: Berry[];
  defaultBerry: Berry;
}

export default function BerryDetailDialog({
  open,
  onOpenChange,
  berries,
  defaultBerry,
}: BerryDetailDialogProps) {
  const t = useTranslations();
  const [selectedBerry, setSelectedBerry] = useState(defaultBerry.name);
  const [berryDetail, setBerryDetail] = useState<BerryDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGo = async () => {
    try {
      setLoading(true);
      setBerryDetail(null);
      const data = await fetchBerryDetail(selectedBerry);
      setBerryDetail(data);
    } catch (error) {
      console.error("Error fetching berry detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setBerryDetail(null);
      setLoading(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("berry.detailTitle")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropdown and Go Button */}
          <div className="flex gap-2">
            <Select value={selectedBerry} onValueChange={setSelectedBerry}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {berries.map((berry) => (
                  <SelectItem key={berry.name} value={berry.name}>
                    {berry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGo} disabled={loading}>
              Go
            </Button>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}

          {/* Berry Detail */}
          {!loading && berryDetail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.name")}
                  </h3>
                  <p className="text-lg capitalize">{berryDetail.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.id")}
                  </h3>
                  <p className="text-lg">#{berryDetail.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.growthTime")}
                  </h3>
                  <p className="text-lg">{berryDetail.growth_time} hours</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.maxHarvest")}
                  </h3>
                  <p className="text-lg">{berryDetail.max_harvest}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.size")}
                  </h3>
                  <p className="text-lg">{berryDetail.size} mm</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.smoothness")}
                  </h3>
                  <p className="text-lg">{berryDetail.smoothness}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.soilDryness")}
                  </h3>
                  <p className="text-lg">{berryDetail.soil_dryness}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.naturalGiftPower")}
                  </h3>
                  <p className="text-lg">{berryDetail.natural_gift_power}</p>
                </div>
              </div>

              {berryDetail.firmness && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">
                    {t("berry.firmness")}
                  </h3>
                  <p className="text-lg capitalize">{berryDetail.firmness.name}</p>
                </div>
              )}

              {berryDetail.flavors && berryDetail.flavors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-600 mb-2">
                    {t("berry.flavors")}
                  </h3>
                  <div className="space-y-2">
                    {berryDetail.flavors.map((flavor, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span className="capitalize">{flavor.flavor.name}</span>
                        <span className="font-semibold">{flavor.potency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No data selected */}
          {!loading && !berryDetail && (
            <div className="text-center text-gray-500 py-8">
              {t("berry.selectBerryPrompt")}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
