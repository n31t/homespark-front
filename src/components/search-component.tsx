'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BathIcon, BedIcon, ChevronDown, ChevronDownIcon, ChevronRight, DollarSignIcon, JapaneseYen, RulerIcon } from "lucide-react";
import { Button2 } from "./ui/button2";
import CustomButton from "./customButton";
import { SearchBar } from "./search-bar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { CarouselComponent } from "./carousel-component";
import HintComponent from "./hint-component";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ApartmentCarousel from "./apartmentCarousel-component";
import axiosInstance from "./utils/axiosInstance";
import { useTranslation } from 'react-i18next';

interface Apartment {
  id: number;
  link: string;
  price: string;
  location: string;
  floor: string;
  number: string;
  photos: string[];
  characteristics: { [key: string]: string };
  description: string;
  site: string;
  type: string;
  reason ?: string;
}

export function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [mightLikeApartments, setMightLikeApartments] = useState<Apartment[]>([]);

  const [type, setType] = useState("buy");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [displayMaxPrice, setDisplayMaxPrice] = useState('');
  const [displayMinPrice, setDisplayMinPrice] = useState('');
  const [rooms, setRooms] = useState("1-4 комн.");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
  const [dots, setDots] = useState('');
  const { t } = useTranslation();

useEffect(() => {
  const interval = setInterval(() => {
    setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
  }, 500); // Change dots every 500ms

  return () => clearInterval(interval); // Clean up on component unmount
}, []);
  const handleSearch = async () => {
    console.log(minPrice, maxPrice);
    setIsLoading(true);
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert(t('home-component.21'));
            throw new Error('No token found');
        }
        const response1 = await axiosInstance.post('userId-by-token', { token });
        const userId = response1.data.id;
        const response = await fetch("http://138.197.114.153:3838/api/v1/apartments/lc/reccomendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: searchInput,
          classify: type,
          minPrice: minPrice,
          maxPrice: maxPrice,
          rooms: rooms,
          userId
        }),
      });

      if (response.ok) {
        const recommendations = await response.json();
        const detailedApartments = await Promise.all(
          recommendations.map(async ({ link, reason } : {link: string, reason : string}) => {
            const detailResponse = await fetch("http://138.197.114.153:3838/api/v1/apartments/find/link", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ link }),
            });

            if (detailResponse.ok) {
              const apartmentDetails = await detailResponse.json();
              return { ...apartmentDetails, reason };
            } else {
              console.error(`Failed to fetch details for link: ${link}`);
              return null;
            }
          })
        );

        setApartments(detailedApartments.filter(apartment => apartment !== null));
        await fetchMightLikeApartments(searchInput);
      } else {
        if (response.status === 405) {
          alert("Недостаточно токенов. Вы можете приобрести их в личном кабинете.");
        }
        console.error("Failed to fetch apartment recommendations");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after fetch
    }
  };
  
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU').format(Number(price));
  };

  const fetchMightLikeApartments = async (prompt: string) => {
    try {
      const response = await fetch("http://138.197.114.153:3838/api/v1/apartments/lc/mightlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          classify: type,
          minPrice: minPrice,
          maxPrice: maxPrice,
          rooms: rooms,
        }),
      });
  
      if (response.ok) {
        const recommendations = await response.json();
        const detailedApartments = await Promise.all(
          recommendations.map(async ({ link }: { link: string }) => {
            const detailResponse = await fetch("http://138.197.114.153:3838/api/v1/apartments/find/link", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ link }),
            });
  
            if (detailResponse.ok) {
              return await detailResponse.json();
            } else {
              console.error(`Failed to fetch details for link: ${link}`);
              return null;
            }
          })
        );
  
        setMightLikeApartments(detailedApartments.filter(apartment => apartment !== null));
      } else {
        console.error("Failed to fetch 'might like' apartment recommendations");
      }
    } catch (error) {
      console.error("Error fetching 'might like' data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMightLikeApartments("Квартира свежий ремонт").then(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] to-[#FFFFFF] text-[#ffffff]">
      <main>
      <section 
        className="w-full flex flex-col items-center justify-center gap-8"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(https://cdn.pixabay.com/photo/2017/08/06/18/01/city-2594707_1280.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed'
        }}
      >
          <div className="w-full max-w-7xl mx-auto p-4">
            <div className="text-left mb-4 mt-0 md:mt-20">
              <h1 className="text-4xl md:text-3xl font-bold drop-shadow-lg">{t('search-component.1')}</h1>
              <p className="text-[#d7d7d7]">{t('search-component.2')}</p>
            </div>
            <div className="bg-white">
              <Tabs defaultValue="buy">
                <TabsList className="flex space-x-2  rounded-t-[16px] rounded-b-[0px]" style={{ backgroundColor: 'rgba(32, 32, 32, 0.7)' }}>
                  <TabsTrigger value="buy" onClick={() => setType("buy")}>{t('search-component.3')}</TabsTrigger>
                  <TabsTrigger value="rent" onClick={() => setType("rent")}>{t('search-component.4')}</TabsTrigger>
                  <TabsTrigger value="daily" onClick={() => setType("daily")}>{t('search-component.5')}</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="p-4 bg-[#F9F9F9] #8C8C8C py-6  px-4 rounded-b-[16px] text-[#202020]">
                <div className="flex flex-wrap gap-4">
                  <Select onValueChange={value => setType(value)}>
                    <SelectTrigger className="w-full sm:w-auto border-[0px]">
                      <SelectValue placeholder={t('search-component.21')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">{t('search-component.6')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={value => setRooms(value)}>
                    <SelectTrigger className="w-full sm:w-auto border-[0px]">
                      <SelectValue placeholder={t('search-component.22')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t('search-component.7')}</SelectItem>
                      <SelectItem value="2">{t('search-component.8')}</SelectItem>
                      <SelectItem value="3">{t('search-component.9')}</SelectItem>
                      <SelectItem value="4">{t('search-component.10')}</SelectItem>
                      <SelectItem value="1-4 комн.">{t('search-component.11')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full sm:w-auto">
                      <div className="flex h-10 w-full items-center justify-between rounded-md border-[0px] border-[#CCCCCC] bg-white px-3 py-2 text-sm ring-offset-[#FFFFFF] placeholder:text-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#7D40E7] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <span>{t('search-component.23')}</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] md:w-[400px]">
                      <div className="grid gap-4 p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t('search-component.12')}</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <Input
                                type="text"
                                value={displayMinPrice}
                                placeholder={t('search-component.24')}
                                className="w-full pr-10"
                                onChange={e => {
                                  const value2 = Number(e.target.value.replace(/\D/g,'')); // remove non-digits
                                  setMinPrice(value2);
                                  setDisplayMinPrice(formatPrice(value2.toString()));
                                }}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">〒</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t('search-component.13')}</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                            <Input
                              type="text"
                              value={displayMaxPrice}
                              placeholder={t('search-component.25')}
                              className="w-full pr-10"
                              onChange={e => {
                                const value = Number(e.target.value.replace(/\D/g,'')); // remove non-digits
                                setMaxPrice(value);
                                setDisplayMaxPrice(formatPrice(value.toString()));
                              }}
                            />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">〒</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    type="text"
                    placeholder={t('search-component.26')}
                    className="w-full flex-1 border-[0px] border-l-[1px] rounded-[0px] "
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-right mb-0 ">
              <div className="md:flex w-full md:pt-4">
                <div className="w-full text-left">
                  <div className="inline-block bg-[#d9534f] bg-opacity-75 text-white px-2 py-2 text-[0px] md:text-sm rounded-r-lg z-10 ribbon font-thin">
                  {t('search-component.14')}  &nbsp;&nbsp;
                  </div>
                </div>
                {/* <p className="text-[0px] md:w-full md:text-[14px] text-[#ffffff] text-left font-bold">
                Информация о квартирах берется с достоверных источников:
                </p> */}
                <Link href="#apartamentsList">
            <Button onClick={handleSearch} className="px-8 py-4 w-full sm:w-auto ml-auto md:ml-2 text-[15px] bg-[#FF7024] hover:bg-[#CB5200]">
            {isLoading ? t('search-component.28') : t('search-component.29')}
            </Button></Link>
            
              </div>
            
            {/* <Link href="#apartamentsList">
            <Button onClick={handleSearch} className="px-8 py-4 w-full sm:w-auto ml-auto md:ml-2 text-[15px] bg-[#FF7024] hover:bg-[#CB5200]">
            {isLoading ? 'Загрузка...' : 'Найти'}
            </Button></Link> */}
            <div className="w-full flex justify-start items-center">
              <div className="my-10 md:my-0 flex items-center justify-start gap-6 overflow-x-auto">
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/krisha-logo.png"
                    width={35}
                    height={35}
                    alt="Krisha.kz Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/medium_a5416a751f7e73c461761b458b50c5d0.jpg"
                    width={35}
                    height={35}
                    alt="Etagi Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/android-chrome-256x256.png"
                    width={35}
                    height={35}
                    alt="Kn.kz Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/unnamed.webp"
                    width={35}
                    height={35}
                    alt="Nedvizhka.kz Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/images.png"
                    width={35}
                    height={35}
                    alt="Logo"
                    className=" overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-start">
                  <img
                    src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/scale_1200.jpeg"
                    width={70}
                    height={35}
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="w-full text-[12px] md:text-[0px] text-[#d7d7d7] text-left">
          {t('search-component.15')}
          </p>
          <div className="w-full md:flex mt-4 gap-8">
            <HintComponent hintImage="https://www.svgrepo.com/show/533732/party-horn.svg" hintText={t('search-component.30')} setInputValue={setSearchInput}/>
            <HintComponent hintImage="https://www.svgrepo.com/show/532390/users.svg" hintText={t('search-component.31')} setInputValue={setSearchInput} />
            <HintComponent hintImage="https://www.svgrepo.com/show/532081/water.svg" hintText={t('search-component.32')} setInputValue={setSearchInput} />
            <HintComponent hintImage="https://www.svgrepo.com/show/533033/bags-shopping.svg" hintText={t('search-component.33')} setInputValue={setSearchInput} />
          </div>
          </div>

          <div className="space-y-6 max-w-md lg:max-w-5xl text-center">
          </div>
        </section>
        
        {isLoading ? (
            <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center">{t('search-component.16')}{dots}</h1>
            </div>
          ) : (
        <>
        <section className="container mx-auto pt-12 py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-1 gap-8 ">
          <div className="w-full mx-auto  text-[#202020]">
            <h1 className="text-2xl font-bold mb-6 ">{t('search-component.17')}</h1>
            <p className="text-sm text-[#838383]">{t('search-component.18')} {apartments.length} {t('search-component.19')}</p>
          </div>
          
          {apartments.map(apartment => (
            
            <Card key={apartment.link} className="w-full border-[#CFCFCF] border-0 border-b-[0.5px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 p-6 sm:p-8 md:p-10 rounded-xl"
            style={{ marginLeft: '0', paddingLeft: '0' }}>
              {/* <div className="relative overflow-hidden rounded-lg h-[150px] w-full md:h-[300px] md:w-[400px]"> */}
                <Carousel showArrows={true} showThumbs={false} className=" rounded-md w-full md:w-[400px]">
                  {apartment.photos.map((photo, index) => (
                    <div key={index} className="object-cover h-[200px] rounded-md">
                      <img src={photo} alt={`Property Image ${index + 1}`} className="w-full h-full object-cover object-center rounded-md"/>
                    </div>
                  ))}
                </Carousel>
              {/* </div> */}
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <div>
                  <Link href={`/apartments/${apartment.id}`} target="_blank" rel="noopener noreferrer">
                    <h2 className="text-xl font-bold text-[#382AAF] mb-4">{apartment.floor}</h2>
                    <p className="text-[#646464] text-sm mb-4">
                      <span>{apartment.location}</span>
                    </p>
                    <div className="text-xl font-bold text-[#202020] mb-4">
                      {formatPrice(apartment.price)} 〒{apartment.type === 'rent' ? '/мес.' : apartment.type === 'daily' ? '/сутки' : ''}
                    </div>
                    <p className="text-[#8D8D8D] text-sm mb-6">
                    {apartment.description.substring(0, 139)}...
                      </p>
                    </Link>
                    <div className="relative group">
                      <h2 className="text-l font-bold text-[#FF7024] mb-4 cursor-pointer">
                      {t('search-component.27')} <ChevronDown className="inline-block ml-0 mb-1" /> {/* Added ChevronRight icon */}
                      </h2>
                      {/* <div className="absolute left-0 top-full mt-2 hidden group-hover:block p-4 bg-[#FFFFFFF] border border-[#FF7024] rounded-lg">
                        <p className="text-[#8D8D8D] text-sm mb-6">{apartment.reason}</p>
                      </div> */}
                      <div className="border border-[#FF7024] rounded-lg">
                        <p className="text-[#646464] text-sm m-3">{apartment.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col items-start gap-4">
                  <div className="flex justify-end w-full">
                    <Button>Посмотреть подробнее</Button>
                  </div>
                </div> */}
              </div>      
            </Card>
          ))}
        </section>
        <section className="container mx-auto py-24 px-4 md:px-6">
            <div className="w-full mx-auto  text-[#202020]">
              <h1 className="text-2xl font-bold mb-6">{t('search-component.20')}</h1>
            </div>
            <ApartmentCarousel apartments={mightLikeApartments} />
        </section>
        </>
        
          )}

         {/* <section className="container mx-auto py-24 px-4 md:px-6">
          <div className="w-full mx-auto  text-[#202020]">
            <h1 className="text-2xl font-bold mb-6">Может заинтересовать:</h1>
          </div>
          <ApartmentCarousel />
        </section> */}

      </main>
      <style jsx>{`
  .loader {
    width: 85px;
    height: 50px;
    --g1:conic-gradient(from  90deg at left   3px top   3px,#0000 90deg,#FF7024 0);
    --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#FF7024 0);
    background: var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
    background-position: left,center,right;
    background-repeat: no-repeat;
    animation: l10 1s infinite alternate;
  }
  @keyframes l10 {
    0%,
    2%   {background-size:25px 50% ,25px 50% ,25px 50%}
    20%  {background-size:25px 25% ,25px 50% ,25px 50%}
    40%  {background-size:25px 100%,25px 25% ,25px 50%}
    60%  {background-size:25px 50% ,25px 100%,25px 25%}
    80%  {background-size:25px 50% ,25px 50% ,25px 100%}
    98%,
    100% {background-size:25px 50% ,25px 50% ,25px 50%}
  }
`}</style>
    </div>
  );
}
