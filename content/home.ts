import { images } from "./site";

export const home = {
  info: ["Historical & Ethnographical Museum", "Nea Karvali · Kavala", "Mon–Sat · since 1987"],
  // Objects that drift through the hero, in order. frame: arch | rect | pill
  marquee: [
    { img: images.dress, caption: "Embroidery on velvet", frame: "arch", pos: "50% 22%", zoom: 1.5 },
    { img: images.goldThread, caption: "Gold thread and earrings", frame: "rect", pos: "50% 50%", zoom: 1.45 },
    { img: images.rugStars, caption: "Stars in a rug", frame: "pill", pos: "30% 55%", zoom: 1.35 },
    { img: images.buckle, caption: "Dove in mother-of-pearl", frame: "rect", pos: "22% 55%", zoom: 1.9 },
    { img: images.necklace, caption: "Coin necklace", frame: "arch", pos: "50% 50%", zoom: 1.3 },
    { img: images.cross, caption: "Jewelled cross", frame: "pill", pos: "50% 48%", zoom: 1.8 },
    { img: images.rugColumns, caption: "Columns in a rug", frame: "rect", pos: "50% 35%", zoom: 1.6 },
    { img: images.chainPendant, caption: "Coins on chains", frame: "arch", pos: "50% 75%", zoom: 1.7 },
    { img: images.pouch, caption: "Beaded purse", frame: "rect", pos: "35% 45%", zoom: 1.6 },
    { img: images.censer, caption: "Silver censer", frame: "pill", pos: "50% 40%", zoom: 1.5 },
  ],
  // Objects that fly out around the quote as you scroll (Home, "Our purpose").
  flyingObjects: [
    { img: images.dress, frame: "arch", pos: "50% 30%" },
    { img: images.rugStars, frame: "circle" },
    { img: images.censer, frame: "arch" },
    { img: images.necklace, frame: "pill" },
    { img: images.lionRug, frame: "rect" },
  ] as const,
  quote: "“This ancient, luminous and unique civilisation was at risk of fading into obscurity, leaving only scattered traces.”",
  collections: [
    {
      id: "costumes",
      name: "Costumes & jewellery",
      caption: "Embroidered velvet dress",
      img: images.dress,
      pos: "50% 30%",
      text: "Garments and jewellery of the Greeks of the East. In 1850 the community of Gelveri allowed jewellery in public only at baptisms and weddings.",
    },
    {
      id: "church",
      name: "Treasures from the churches",
      caption: "Silver censer",
      img: images.censer,
      pos: "50% 40%",
      text: "Rare church objects from the 17th century onwards, from the brotherhoods of Gelveri and of Saint John the Forerunner in Zincidere.",
    },
    {
      id: "rugs",
      name: "Rugs, kilims & ceramics",
      caption: "Rug with columns and stars",
      img: images.rugColumns,
      pos: "50% 50%",
      text: "Cappadocian carpets and kilims with vivid patterns and colours, and original ceramics of exceptional beauty by local potters.",
    },
  ],
};
