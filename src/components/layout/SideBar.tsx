"use client";

import { cn } from "@/lib/utils";
import { Cherry, Package, X } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type SideBarProps = {
  open: boolean;
  onClickX: () => void;
};

export default function SideBar({ onClickX: onClickMenu, open }: SideBarProps) {
  const path = usePathname();
  const t = useTranslations("nav")
  const navItem = [
    { title: t("products"), href: "/products", Icon: Package },
    { title: t("berries"), href: "/berries", Icon: Cherry },
  ];
  return (
    <nav
      className={cn(
        "fixed lg:relative inset-y-0 -left-full w-0 md:w-auto flex bg-neutral-100 z-50 transition-all duration-500 border-r ease-in-out overflow-hidden",
        "md:max-w-0",
        open && "left-0 w-screen md:w-auto md:max-w-64"
      )}
    >
      <X onClick={onClickMenu} className="absolute top-5 right-5 cursor-pointer lg:hidden" />
      <div className="w-full md:w-64 shrink-0 p-5 flex flex-col gap-5">
        <h1 className="text-5xl text-center font-extrabold">Equinox</h1>
        <div className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Module</SelectLabel>
                <SelectItem value="product">Products</SelectItem>
                <SelectItem value="berry">Berries</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-col gap-1">
            {navItem.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("p-2 w-full rounded-lg hover:bg-neutral-200 transition-all flex items-center gap-2", path.startsWith(item.href) && "bg-neutral-200")}
              >
                <item.Icon strokeWidth={1} className="size-5"/>
                <span className="text-sm">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
