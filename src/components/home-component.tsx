"use client";
import { useLanguage } from "@/languageContext";
import Link from "next/link"
import React from 'react';
import { Button } from "./ui/button"
import { JSX, SVGProps } from "react"
import { InfoComponent } from "./info-component"
import { useTranslation } from 'react-i18next';

export function HomeComponent() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7024] to-[#FFD9C7] text-[#FFFFFF]">

      <main>
      <section className="w-full h-[80dvh] relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F18F65]/80 to-[#FFD9C7]/60 z-10" />
          <video src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/videos/16944946-uhd_3840_2160_60fps-2+-+COMPRESS.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-6">
            <div className="max-w-2xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              {t('home-component.1')}
              </h1>
              <p className="text-lg text-white/80 md:text-xl">
              {t('home-component.2')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                  {t('home-component.3')}
                </Link>
                <Link
                  href="#learnmore"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  {t('home-component.4')}
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <MergeIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">{t('home-component.5')}</h3>
            <p className="text-[#E8E8E8]">
            {t('home-component.6')}
            </p>
          </div>
          <div className="space-y-4" id="learnmore">
            <SignalMediumIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">{t('home-component.7')}</h3>
            <p className="text-[#E8E8E8]">
            {t('home-component.8')} 
            </p>
          </div>
          <div className="space-y-4">
            <ShoppingCartIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">{t('home-component.9')} </h3>
            <p className="text-[#E8E8E8]">
            {t('home-component.10')} 
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12 mx-auto mb-10">
        <div className="space-y-4">
          <img
            src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/warmhome.png"
            width={180}
            height={90}
            alt="homespark logo"
            className="mx-auto aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
          />
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('home-component.11')} 
          </p>
        </div>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-6 md:grid-cols-3 lg:gap-12">
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://krisha.kz/static/frontend/images/landing/mobile/krisha-logo.png"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://habrastorage.org/getpro/moikrug/uploads/company/100/007/101/9/logo/medium_a5416a751f7e73c461761b458b50c5d0.jpg"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://www.kn.kz/favicon/android-chrome-256x256.png"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://nedvizhka.kz/static/interface/logo_ned.svg"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdF6IDT4UFuXAFD4IF-iVJCRGk7hRnxvdP5Q&s"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65e2d2f2ad51546e2aa11191_65e2da3b25136a1f45a25642/scale_1200"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
        <section className="container mx-auto pb-16 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="p-4 max-w-xl mx-auto dark:bg-gray-800">
    <h2 className=" mb-8 text-3xl font-bold lg:text-4xl">{t('home-component.12')} 
    </h2>

    <div className="flex">
        <div className="mr-4 flex flex-col items-center">
            <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="h-6 w-6 text-blue-800 dark:text-slate-200">
                        <path d="M12 5l0 14"></path>
                        <path d="M18 13l-6 6"></path>
                        <path d="M6 13l6 6"></path>
                    </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF]"></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">{t('home-component.13')} </p>
                    <p className="text-gray-600 dark:text-slate-400">{t('home-component.14')} </p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-blue-800 dark:text-slate-200">
                                <path d="M12 5l0 14"></path>
                                <path d="M18 13l-6 6"></path>
                                <path d="M6 13l6 6"></path>
                            </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF] "></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">{t('home-component.15')} </p>
                    <p className="text-gray-600 dark:text-slate-400">{t('home-component.16')} </p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-blue-800 dark:text-slate-200">
                                <path d="M12 5l0 14"></path>
                                <path d="M18 13l-6 6"></path>
                                <path d="M6 13l6 6"></path>
                            </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF]"></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 ">{t('home-component.17')} </p>
                    <p className="text-gray-600 dark:text-slate-400">{t('home-component.18')} </p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900 bg-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-white dark:text-slate-200">
                                <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="pt-1 ">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">{t('home-component.19')} </p>
                    <p className="text-gray-600 dark:text-slate-400">{t('home-component.20')} </p>
                </div>
            </div>


            </div>
         
        </section>
      </main>
    </div>
  )
}


function MergeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  )
}


function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function SignalMediumIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
    </svg>
  )
}
