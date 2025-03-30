'use client'
import { JapaneseYenIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/app/context/context";
import { useLanguage } from "@/languageContext";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export function Header() {
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang); // Update the global language
    setIsLanguageDropdownOpen(false); // Close the dropdown
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    console.log('Header isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="flex shadow-lg md:py-2 px-4 sm:px-10 bg-white min-h-[80px] md:min-h-[100px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Link href="/" className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/warmhometext2.png" alt="logo" className="h-14 md:h-24" />
        </Link>

        <div id="collapseMenu" className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link href="/" className="hover:text-[#CB5200] text-[#FF7024] block font-semibold text-[15px]">
              {t('header.1')} 
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link href="/about" className="hover:text-[#CB5200] text-[#FF7024] block font-semibold text-[15px]">
              {t('header.2')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center ml-auto space-x-3 md:space-x-6">
          {isLoggedIn ? (
            <Link href="/profile">
              <UserCircle className="w-8 h-8 text-[#382AAF] hover:text-[#CB5200] transition-colors duration-300" />
            </Link>
          ) : (
            <Link href="/login">
              <Button className="px-4 py-2 text-sm rounded-sm font-bold text-[#FFFFFF] border-2 border-[#382AAF] bg-[#382AAF] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                <span className="text-[#ffffff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#382AAF]">{t('header.3')}</span>
              </Button>
            </Link>
          )}
          <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              className="px-4 py-2 text-sm rounded-sm font-bold text-[#FFFFFF] border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
            >
              {language}
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                <button
                  onClick={() => handleLanguageChange("Ru")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Русский
                </button>
                <button
                  onClick={() => handleLanguageChange("En")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("Kz")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Қазақша
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
