// Museum-wide facts used across pages (header, footer, contact, home).
// Edit here and every page updates.

export const site = {
  name: "Museum of the Cappadocian Greeks",
  fullName: "Historical & Ethnographical Museum of the Cappadocian Greeks",
  place: "Nea Karvali, Kavala, Greece",
  description:
    "The Historical & Ethnographical Museum of the Cappadocian Greeks in Nea Karvali, Kavala: costumes and jewellery, church treasures, rugs, kilims and ceramics carried from Cappadocia.",
  url: "https://museumofcappadociangreeks.gr",
  mapUrl: "https://maps.app.goo.gl/mEUCYQuQRZ3xySXt6",
  directions:
    "Just above the old Kavala–Xanthi national road, about 8 km from Kavala in Eastern Macedonia, Greece.",
  hours: {
    winter: { label: "Winter", months: "November – April", short: "Nov–Apr", time: "09:00–14:00" },
    summer: { label: "Summer", months: "May – October", short: "May–Oct", time: "08:00–18:00" },
    days: "Monday – Saturday",
    closed: "Sunday closed",
  },
  admission: {
    adult: "€8",
    free: "Students with valid ID and children under 12 free.",
  },
  contacts: [
    {
      role: "Director of the museum",
      name: "Kaplanis Iosifidis",
      email: "cappadocianstudies@gmail.com",
      phone: "+306970121288",
      phoneLabel: "+30 697 0121288",
    },
    {
      role: "Academic interest & ideas",
      name: "Murat Eser",
      email: "eser.murat59@gmail.com",
      phone: "+306986612654",
      phoneLabel: "+30 698 6612654",
    },
  ],
};

export const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const images = {
  dress: { src: "/images/blue-embroidered-dress.jpg", alt: "Blue velvet dress with white floral embroidery" },
  goldThread: { src: "/images/gold-thread-ornament-earrings.jpg", alt: "Gold-thread ornament with tasselled earrings" },
  rugStars: { src: "/images/rug-detail-stars.jpg", alt: "Star motifs in a red Cappadocian rug" },
  buckle: { src: "/images/winged-belt-buckle.jpg", alt: "Silver belt buckle with carved mother-of-pearl doves" },
  necklace: { src: "/images/coin-necklace.jpg", alt: "Silver coin necklace" },
  cross: { src: "/images/cross-pendant.jpg", alt: "Pendant with a cross set with pearls and turquoise" },
  rugColumns: { src: "/images/rug-red-columns.jpg", alt: "Red Cappadocian rug with columns and star motifs" },
  chainPendant: { src: "/images/chain-pendant-coins.jpg", alt: "Gilded pendant hung with silver chains and coins" },
  pouch: { src: "/images/beaded-pouch.jpg", alt: "Purse with zigzag beadwork" },
  censer: { src: "/images/silver-censer.jpg", alt: "Pierced silver censer" },
  earrings: { src: "/images/earrings-doves-cross.jpg", alt: "Earrings with doves and a cross" },
  jug: { src: "/images/glazed-jug.jpg", alt: "Glazed clay jug" },
  lionRug: { src: "/images/lion-rug.jpg", alt: "Rug with two lions" },
  festival: { src: "/images/festival-dancers.jpg", alt: "Dancers in Cappadocian costume at the Akontisma festival" },
  aerial: { src: "/images/akontisma-aerial.jpg", alt: "Aerial view of the Akontisma settlement with its open-air theatre" },
  building: { src: "/images/museum-building.jpg", alt: "The museum building in Nea Karvali" },
  display: { src: "/images/museum-display-kilims.jpg", alt: "Objects of daily life displayed on kilims in the museum" },
} as const;

export type Img = { src: string; alt: string };
