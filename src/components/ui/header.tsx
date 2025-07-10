"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "./theme-provider/toggle-button";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// import dark_logo from "../../../public/assets/dark.png";
// import light_logo from "../../../public/assets/light.png";
import LanguageSwitcher from "./language-switcher";
import { Button } from "./button";

const Header = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b sticky top-0 z-50 mt-12">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          {/* <Image
            src={theme === "dark" ? dark_logo : light_logo}
            alt="Logo"
            width={40}
            height={40}
          /> */}
          <span className="text-xl font-semibold">TradingBackTesting</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className=" bg-gradient-to-tr from-pink-500 to-rose-500 text-white hover:text-white"
                    href="/auth/signin"
                  >
                    Signin
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
          <LanguageSwitcher />
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            className="flex flex-col gap-1.5 w-6 h-6 justify-center items-center group relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block h-0.5 w-full bg-foreground transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden md:hidden transition-all duration-200 ease-in-out ${isOpen ? "max-h-[200px] py-2" : "max-h-0 py-0"
          }`}
      >
        <div className="px-4 flex flex-col gap-3">

          <LanguageSwitcher />
          <Button className=" bg-gradient-to-r from-pink-500 to-rose-500">
            <Link
              href="/auth/signin"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium "
            >
              Signin
            </Link>
          </Button>
          {/* Add more mobile links here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
