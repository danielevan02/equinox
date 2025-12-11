"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleUserRound, TextAlignJustify } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";

type Props = {
  onClickMenu: () => void;
};

export default function Header({ onClickMenu }: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  const handleLanguageChange = async (newLocale: string) => {
    setCurrentLocale(newLocale);
    await setCookie("locale", newLocale);
    router.refresh();
  };

  const languages = [
    { title: t("indonesia"), value: "id", flag: "🇮🇩"},
    { title: t("english"), value: "en", flag: "🇬🇧" },
  ];
  return (
    <div className="flex p-2 items-center justify-between h-fit border-b">
      <button onClick={onClickMenu}>
        <TextAlignJustify />
      </button>

      <div className="flex items-center gap-3">
        <Select value={currentLocale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <span>{lang.flag}</span>
                  <span>{lang.title}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1">
          <CircleUserRound strokeWidth={1} />
          <span className="text-sm">Username</span>
        </div>
      </div>
    </div>
  );
}
