"use client";

import React from "react";
import { useLanguage } from "@/hooks/language/use-language";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import us_flag from "../../../public/assets/flags/us.png";
import es_flag from "../../../public/assets/flags/sp.png";

const languages = [
  { code: "en", label: "English", flag: us_flag },
  { code: "es", label: "Español", flag: es_flag },
] as const;

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-4">
          <Image src={currentLang?.flag || ""} alt={currentLang?.label || ""} width={20} height={20} />
          <span className="capitalize">{currentLang?.label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "font-semibold" : ""}
          >
            <div className="flex items-center gap-2">
              <Image src={lang.flag} alt={lang.label} width={20} height={20} />
              {lang.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
