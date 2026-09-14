import {
  TravelPackage,
  Destination,
  DestinationTour,
  JournalArticle,
  GroupMember,
  ItineraryStop,
  ExpenseItem,
  PackingItem,
  MemoryPhoto,
  UserProfile,
  NotificationItem
} from '../types';

export const VOYAGER_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBadrDHDRGa6f9ylAGo8ZWxll2-HW_xs0DLLWpwKq-J420z1GQziv4AYRFxvGeE5TOfbPBAPHO-q6TvUYdySQabEib8JyfSEfm98W0ox3eKPJ8kzHehzkVom5RimLxfDTviKJJuyqsofsYnnWY3s_Gv_VCoR1_XUJtn-H_4QwRokz9Pi9IzcFNlErrIJw2XLz51SeKMYAzrQzEIx2uEMN93RVO3cYwzv0h-YVe9Bvi9bLgWb7k4MvzY1A';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Elena Vance',
  username: '@elenavance',
  email: 'elena.vance@voyagerexplore.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCofZ7OiZLmV9uz0XUPQhPCpVpDUB9DGqFurHkB46fc1Rb2yQ_2iP2E4DfbtTUhgtzOaTVGQSinMHWwJQMsteZPNTsw0TiwoxBidA3ee_6k2wKwtsBzR_a2z1bijiSYNXqtZ93TxBznfqJtoU5m8tWHimWszd0itlQaGP44cGUCEkNKBVwbGEK2m-drEJTKR23bEYmvVdJsnY6p5d9qH8CfCVrl4omYNGS_9RGYvc_GEpgyYWpMr6_31Q',
  bio: 'Expedition curator & photographer wandering the coastlines, silent monasteries, and alpine passes. 28 countries and counting.',
  nationality: 'France / United States',
  homeAirport: 'CDG (Paris) & SFO',
  tier: 'Voyager Black Atelier',
  journeysCount: 14,
  countriesVisited: 28,
  distanceKm: 94820,
  preferences: {
    dietary: 'Plant-forward Mediterranean, pescatarian',
    cabinClass: 'First / Business Suite',
    travelStyle: 'Private charters, boutique heritage stays, photography walks'
  }
};

export const INITIAL_GROUP_MEMBERS: GroupMember[] = [
  {
    id: 'm1',
    name: 'Elena Vance',
    role: 'organizer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCofZ7OiZLmV9uz0XUPQhPCpVpDUB9DGqFurHkB46fc1Rb2yQ_2iP2E4DfbtTUhgtzOaTVGQSinMHWwJQMsteZPNTsw0TiwoxBidA3ee_6k2wKwtsBzR_a2z1bijiSYNXqtZ93TxBznfqJtoU5m8tWHimWszd0itlQaGP44cGUCEkNKBVwbGEK2m-drEJTKR23bEYmvVdJsnY6p5d9qH8CfCVrl4omYNGS_9RGYvc_GEpgyYWpMr6_31Q',
    status: 'active',
    currentAction: 'Reviewing Day 3 Sunset Sail'
  },
  {
    id: 'm2',
    name: 'Marcus Reed',
    role: 'co-planner',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBuUxmMlmHAHD5x_73mvzrzD_8MYWdSiC4jublF-_VONj3GB1bDMTadICrVgnBvFInVg5kZerMEV_E6CXDnKTnrrLjZte6M1WbVblBexi_qorG8cWsmMjB0MZb8kkYtsOU0sQMrMABMQ3NuTx1t7VI5lN5q53jo06p0DKYeLgGhFLTrk_hLCUsZYH351OlvfXSYDVCKJnOzEjVALn72HHY5mh0y_xmdWkhkAvAho6kNXCSPFyP8pur_Q',
    status: 'editing',
    currentAction: 'Adjusted Dinner Reservation'
  },
  {
    id: 'm3',
    name: 'Camille de la Tour',
    role: 'wanderer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZT7FBgieOCb-iEOfaNXJcXx2QCGUv9P6md3mwLAJV6L8F4EI8sqPUKX80n_4c7SWnQRbYdaxCmNpNImRdAdrlBg__hRv5smQFkNv7Q2U_8R_LZlKjBxcqwRD2PAFDrK-Y608SwFwX-ybaaFYcoCsWIJAB-oQki2oy_gKmQb6wCDIb_2-BOROqvvgx-XqCl24SavUkgSW09G0wJzzP-QZ9hsNBjL48OcdJ8LtmiOOr5RhNDIXfWEUjA',
    status: 'active',
    currentAction: 'Uploaded 4 Trip Photos'
  },
  {
    id: 'm4',
    name: 'Kenji Sato',
    role: 'wanderer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1KFKsmGMTFad5SzM5_rqAtllCG3oj8Sb-B_9cuBm9mHB1_PsIdhzmwKJN9U-VLUrGDwP3omGtbqFo25FIGUwLyCfj0-BnoKd8F2tBVPZLSjROiDX621qch7XEm9ouaEkI9ApcC7QrgZRZdo7Frg5xlPGpoL9e10uJmXHhZMfDoD-tNHIBEm-55h_EJTaR8bSbnPZwqCPkf4HWYaFFMr9YOmmIfVBxOn0UvovxNCIqFSTSZQJJ8mApww',
    status: 'away',
    currentAction: 'Offline (Last seen 12m ago)'
  }
];

export const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: 'amalfi-dream',
    title: 'Amalfi Coast Dream Odyssey',
    location: 'Italy • Tyrrhenian Sea',
    region: 'europe',
    categories: ['all', 'island', 'luxury'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0MC84HreC0Mzou3sjBX3vxLob6I6t8LvYSkSkfBe9DF8FurICc9Z8YYHJoTneKBMLzCRGv-6ydNAEaTx9PhOKbyuJ9Go64rdI4h3q93ET6YZXJ33gH86_RpTHmQ-JPaaeFNCJdT2BSqcCXF6gHaj3J5yptJU4c572FhxpOisQfj4_R5CJYUnLOk8dR8r2K1tmCIIfnQBW2UjdI41dhYNy5LooAamc4EbH75IaD6QS9yTQ093QEfCvlA',
    altText: 'Positano clifftop villas overlooking the azure Mediterranean sea',
    rating: 4.96,
    reviewCount: 142,
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    nightsCount: 6,
    groupSize: 'Max 10 Guests',
    maxGuests: 10,
    price: 2450,
    originalPrice: 3200,
    description: 'Private cliffside villas, chartered sailings to Capri, lemon grove gastronomy tastings, and secluded sun-drenched grottos.',
    inclusions: [
      { icon: 'flight', title: 'Flights', subtitle: 'Class Upgrades' },
      { icon: 'hotel', title: '5-Star Stays', subtitle: 'Boutique Villas' },
      { icon: 'kayaking', title: 'Private Tour', subtitle: 'Capri Charter' }
    ],
    itinerary: [
      { day: 1, title: 'Naples Arrival & Private Helicopter Transfer to Ravello', highlights: 'Sunset terrace cocktail at Villa Cimbrone', meals: 'Dinner included', coordinates: [40.6500, 14.6120] },
      { day: 2, title: 'Private Catamaran Voyage around Capri & Faraglioni', highlights: 'Blue Grotto secluded swim & cliffside lunch', meals: 'Breakfast & Lunch', coordinates: [40.5507, 14.2426] },
      { day: 3, title: 'Path of the Gods Cliffside Hike & Lemon Grove Harvest', highlights: 'Artisan limoncello making with 4th-gen grower', meals: 'All meals included', coordinates: [40.6300, 14.5000] },
      { day: 4, title: 'Positano Boutiques & Acoustic Twilight Concert', highlights: 'Secluded cove dinner at Da Adolfo', meals: 'Breakfast & Dinner', coordinates: [40.6281, 14.4850] },
      { day: 5, title: 'Emerald Grotto Kayak Exploration & Michelin Tasting', highlights: 'Private wine tasting of rare coastal falanghina', meals: 'Breakfast & Michelin Gala', coordinates: [40.6180, 14.5500] },
      { day: 6, title: 'Thermal Mineral Soaks of Ischia Island', highlights: 'Volcanic thermal springs & hydrotherapy', meals: 'Breakfast & Lunch', coordinates: [40.7300, 13.9000] },
      { day: 7, title: 'Farewell Sunrise Breakfast & Private Chauffeur to Naples', highlights: 'Panoramic scenic transfer', meals: 'Breakfast', coordinates: [40.8518, 14.2681] }
    ]
  },
  {
    id: 'northern-lights',
    title: 'Northern Lights & Fjord Expedition',
    location: 'Norway • Tromsø & Lofoten',
    region: 'europe',
    categories: ['all', 'mountain', 'luxury'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATyqdCpAp5Z_Td-7PashYHPjfz5PTmxYwYzUmFBKwEMKl0VqW9-LlaS-DeO4gyuj0pt55hgfs_UzOajgz9kdfrBktgA9qCJaNfT6YrifqUZYB7_dH_fvS7xRL1D5m8OTtFtHQkGjIWJmgeGydExY5pzjWFNJ5SQi9qCKhM_V5xSCkbmOtqmfBgIlt2ELNmhgP9yszDzgPAcOGELNe4n-DlgFKBelaQdxPlQfKcVwKgH4S9epzE6WwzRQ',
    altText: 'Aurora borealis over glass-domed thermal suites in Norway',
    rating: 4.98,
    reviewCount: 89,
    duration: '8 Days / 7 Nights',
    daysCount: 8,
    nightsCount: 7,
    groupSize: 'Small Group',
    maxGuests: 8,
    price: 2890,
    originalPrice: 3450,
    description: 'Stargazing from heated glass domes, huskie sledding through pine forests, and midnight wildlife safaris beneath the emerald polar aurora.',
    inclusions: [
      { icon: 'bed', title: 'Glass Domes', subtitle: 'Heated Suite' },
      { icon: 'restaurant', title: 'Breakfast', subtitle: 'Nordic Fare' },
      { icon: 'explore', title: 'Aurora Hunt', subtitle: 'Expert Guides' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Tromsø & Northern Lights Basecamp', highlights: 'Thermal glass igloo check-in & fireside welcome', meals: 'Nordic Feast', coordinates: [69.6492, 18.9553] },
      { day: 2, title: 'Huskie Sledding Expedition into Arctic Valleys', highlights: 'Drive your own team across frozen lakes', meals: 'All meals', coordinates: [69.5000, 19.1000] },
      { day: 3, title: 'Silent Electric Catamaran Whale Safari', highlights: 'Humpbacks & orcas in dramatic fjords', meals: 'Breakfast & Lunch', coordinates: [69.8000, 18.7000] },
      { day: 4, title: 'Scenic Hurtigruten Cruise to Lofoten Islands', highlights: 'Passage through Raftsundet under stars', meals: 'All meals', coordinates: [68.2000, 14.5000] },
      { day: 5, title: 'Reine Fishermen Rorbu Stay & Cod Culinary Workshop', highlights: 'Authentic red stilt-cabins on granite edges', meals: 'Breakfast & Seafood Dinner', coordinates: [67.9300, 13.0800] },
      { day: 6, title: 'Midnight Kayaking & Chasing the Aurora', highlights: 'Gliding on calm Arctic water beneath auroras', meals: 'All meals', coordinates: [68.1000, 13.5000] },
      { day: 7, title: 'Viking Heritage & Arctic Sauna Plunge', highlights: 'Wood-fired floating sauna and ocean plunge', meals: 'All meals', coordinates: [68.2300, 13.6000] },
      { day: 8, title: 'Depart Tromsø with Aurora Photographic Portfolio', highlights: 'Curated high-res memories by expedition photographer', meals: 'Breakfast', coordinates: [69.6492, 18.9553] }
    ]
  },
  {
    id: 'kyoto-cherry',
    title: 'Kyoto Cherry Blossom Discovery',
    location: 'Japan • Kyoto & Uji',
    region: 'asia-pacific',
    categories: ['all', 'cultural', 'luxury'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSM1xSJDEb-O0PaE33lDrjedMp28KywItUsjQpaEsGIaCQWxe4DvtV4PtRw8NUPYo0wDGhbOXjs2Iic6FpC3IXgl3b2lJPfYB0rdlLktm8GeT88LdQJpVWV6fXg6ozI6Nw-WKt4Jpx1YiuA9hhavwrTv9etjVJaMq7o_oX5on_m6zOlVnAWPd189d41onmaMIex5pVhOejw7753oPugQw40PP21n2MbHoMIArAo4QXDugW5WtbjmZ9OQ',
    altText: 'Centuries-old Kyoto wooden Zen pavilion surrounded by sakura blossoms',
    rating: 4.93,
    reviewCount: 210,
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    nightsCount: 5,
    groupSize: 'Small Group (8)',
    maxGuests: 8,
    price: 1850,
    originalPrice: 2400,
    description: 'Exclusive tea ceremonies with master artisans, private sunrise shrine viewings, multi-course kaiseki dining, and historical ryokan lodging.',
    inclusions: [
      { icon: 'hot_tub', title: 'Luxury Ryokan', subtitle: 'Private Onsen' },
      { icon: 'ramen_dining', title: 'Kaiseki', subtitle: 'Chef Hosted' },
      { icon: 'temple_buddhist', title: 'Guided', subtitle: 'Private Entry' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Check-in at Gion Ryokan with Hinoki Baths', highlights: 'Evening stroll through lantern-lit Pontocho Alley', meals: 'Welcome Kaiseki', coordinates: [35.0037, 135.7772] },
      { day: 2, title: 'Sunrise Private Access to Fushimi Inari Torii Gates', highlights: 'Beat the crowds through thousands of vermilion gates', meals: 'Breakfast & Matcha Lunch', coordinates: [34.9671, 135.7727] },
      { day: 3, title: 'Arashiyama Bamboo Grove & Moss Temple Meditation', highlights: 'Private chanting session with head abbot', meals: 'All meals (Shojin Ryori)', coordinates: [35.0166, 135.6713] },
      { day: 4, title: 'Uji Matcha Masterclass & Ancient Pottery Workshop', highlights: 'Grind ceremonial grade tencha with stone mortar', meals: 'Breakfast & Tea Pairings', coordinates: [34.8893, 135.8055] },
      { day: 5, title: 'Philosopher’s Path Sakura Walk & Kinkaku-ji', highlights: 'Golden Pavilion twilight viewing', meals: 'Breakfast & 12-Course Dinner', coordinates: [35.0272, 135.7982] },
      { day: 6, title: 'Morning Garden Contemplation & Bullet Train Departure', highlights: 'Farewell tea service', meals: 'Breakfast', coordinates: [34.9858, 135.7588] }
    ]
  },
  {
    id: 'matterhorn-retreat',
    title: 'Matterhorn Alpine Wellness Retreat',
    location: 'Switzerland • Zermatt Alps',
    region: 'europe',
    categories: ['all', 'weekend', 'mountain'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-4HZNT6n2IyjYiY5NmRMOXI7xs2B9QPDYpBFSeyZBRDObf4Hvmuihungei2R_XgyE3EG2X0oo4khbdZfxVbhF3SCuwJYUYUSrk18yl8-TFaNPjJAXKL3JIXqKoFo8Qa5wAHriCu4Z2_Z9ggb_m4kcP_YhXGVVRbTr8egm2VLL5-R3_5qu3ty-ExXI3PD_KAq1ZpNGpPuM0mjsHe2dw-7iDip4lew-7MNmMcY0h66oKwDOQfobi3eKnw',
    altText: 'Heated infinity cedar pool overlooking the Matterhorn in Zermatt',
    rating: 4.99,
    reviewCount: 98,
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    nightsCount: 3,
    groupSize: 'Weekend Escape',
    maxGuests: 6,
    price: 1420,
    originalPrice: 1950,
    description: 'Panoramic mountain spa therapies, panoramic glacier train journeys, fireside fondue pairings, and gentle guided summits.',
    inclusions: [
      { icon: 'spa', title: 'Thermal Spa', subtitle: 'Unlimited' },
      { icon: 'train', title: 'Swiss Pass', subtitle: '1st Class Rail' },
      { icon: 'wine_bar', title: 'Dining', subtitle: 'Wine Tastings' }
    ],
    itinerary: [
      { day: 1, title: 'Glacier Express Arrival in Car-Free Zermatt', highlights: 'Horse-drawn carriage to 5-star mountain chalet', meals: 'Fireside Fondue', coordinates: [45.9765, 7.7491] },
      { day: 2, title: 'Gornergrat Railway Summit & Cedar Thermal Pool Soak', highlights: 'Unobstructed panorama of 29 four-thousander peaks', meals: 'All meals', coordinates: [45.9830, 7.7850] },
      { day: 3, title: 'Glacier Paradise Ice Palace & Herbal Aromatherapy', highlights: 'Europe’s highest cable car station at 3,883m', meals: 'Alpine Gourmet Tasting', coordinates: [45.9380, 7.7300] },
      { day: 4, title: 'Alpine Meadow Breakfast & Scenic Departure', highlights: 'Morning swim facing the golden sunrise on Matterhorn', meals: 'Champagne Breakfast', coordinates: [45.9765, 7.7491] }
    ]
  },
  {
    id: 'maldives-ocean',
    title: 'Maldives Ocean Sanctuary',
    location: 'Maldives • North Malé Atoll',
    region: 'asia-pacific',
    categories: ['all', 'island', 'luxury'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbVf33u1xj4cBc3LKGVqjv2Uvnz8b6ugJ1NkeyOIQp0wuETGC95dhQrOiMQpaH77nSs02rTv6W3SbP76tZ-MaID4ELbSuUA6hHaEpdugNfNCLgmjpRKlDq59E2YRCjMrNdyP1Mz8RMPvA53HG2ToZDrDgd82T302DwguAs598IhvYF9NnC-EbyVOM3x5KkZLLCP_s7kp8bjaMVcnsu2E8CcgDhivlNGhnuR9wt08p7zsKhzfrflfZyJQ',
    altText: 'Serene overwater villas in the Maldives with crystal clear water',
    rating: 4.90,
    reviewCount: 164,
    duration: '7 Days · 6 Nights',
    daysCount: 7,
    nightsCount: 6,
    groupSize: 'Private Villa',
    maxGuests: 6,
    price: 3420,
    originalPrice: 4200,
    description: 'Private seaplane transfers, reef diving, and sunset overwater dining over crystal turquoise lagoons.',
    inclusions: [
      { icon: 'flight', title: 'Seaplane', subtitle: 'Direct Transfer' },
      { icon: 'pool', title: 'Overwater Villa', subtitle: 'Private Pool' },
      { icon: 'scuba_diving', title: 'Coral Diving', subtitle: 'Marine Biologist' }
    ],
    itinerary: [
      { day: 1, title: 'Seaplane Flight over Coral Atolls to Private Island', highlights: 'Sunset champagne on private villa deck', meals: 'All-inclusive', coordinates: [4.1755, 73.5093] },
      { day: 2, title: 'Manta Ray & Whale Shark Guided Coral Drift', highlights: 'Snorkeling alongside gentle marine giants', meals: 'All-inclusive', coordinates: [4.2000, 73.5200] },
      { day: 3, title: 'Sandbank Gourmet Picnic & Sunset Dolphin Cruise', highlights: 'Isolated sandbar dining surrounded by azure ocean', meals: 'All-inclusive', coordinates: [4.1500, 73.4800] }
    ]
  },
  {
    id: 'patagonia-explorer',
    title: 'Patagonia Explorer Trek',
    location: 'Chile & Argentina • Torres del Paine',
    region: 'americas',
    categories: ['all', 'mountain', 'luxury'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDibKky4X-8uV5X1tX-sCp5zRYRQC80d1JY3asu2Onh-Zf1XkyebE_FU8yvEB4Bh_7v5gR2SefV36970PWuwAYSU6PTPE2DsQxhq8YkLpGftXsvu30oyY2xI6avINGuwAxKh--x7xrH1_wn5SFVtZPV0388IlY5zjzwInMmuVbcoNMOT3bAo0bPMT6bv8Hr1MCFTjnFG7BS3Lb2y9Ytt4Yj9EtEa803h9s1lnlqrIZ3S_Vw4uurvM1M6w',
    altText: 'Snow-capped granite towers of Patagonia with glacial lakes',
    rating: 4.95,
    reviewCount: 74,
    duration: '10 Days · 9 Nights',
    daysCount: 10,
    nightsCount: 9,
    groupSize: 'Guided Expedition',
    maxGuests: 12,
    price: 4150,
    originalPrice: 4900,
    description: 'Glacier navigation, luxury geodesic domes & private mountain guides across South America’s dramatic wild edge.',
    inclusions: [
      { icon: 'hiking', title: 'Trek Guides', subtitle: 'Certified UIAGM' },
      { icon: 'cabin', title: 'Eco Domes', subtitle: 'Fireplace & Views' },
      { icon: 'sailing', title: 'Fjord Catamaran', subtitle: 'Glacier Grey' }
    ],
    itinerary: [
      { day: 1, title: 'Punta Arenas to Puerto Natales Scenic Drive', highlights: 'Wild guanaco herds & Patagonian pampa', meals: 'Asado Dinner', coordinates: [-51.7269, -72.5068] },
      { day: 2, title: 'Trek to Base of the Torres Granite Towers', highlights: 'Sunrise golden reflection on turquoise tarn', meals: 'All meals', coordinates: [-50.9423, -72.8714] }
    ]
  },
  {
    id: 'dubai-winter-odyssey',
    title: 'Dubai Winter Odyssey & Desert Mirage',
    location: 'United Arab Emirates • Dubai & Arabian Desert',
    region: 'middle-east',
    categories: ['all', 'luxury', 'cultural', 'safari'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    altText: 'Dubai downtown skyline with Burj Khalifa reflecting in water during winter sunset',
    rating: 4.98,
    reviewCount: 236,
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    nightsCount: 5,
    groupSize: 'Curated Group',
    maxGuests: 10,
    price: 2450,
    originalPrice: 3150,
    description: 'Bask in 24°C balmy winter sunshine across Dubai: red dune 4x4 safaris, starlit Bedouin banquets, private Palm Jumeirah sunset yachting, and VIP Burj Khalifa Sky Lounge access.',
    inclusions: [
      { icon: 'flight', title: 'Chauffeur', subtitle: 'Luxury Rolls Royce' },
      { icon: 'hotel', title: '5-Star Stays', subtitle: 'Palm & Downtown' },
      { icon: 'explore', title: 'Winter Tours', subtitle: '5 VIP Excursions' }
    ],
    availableDates: ['Nov 15, 2025', 'Dec 10, 2025', 'Jan 12, 2026', 'Feb 08, 2026', 'Mar 02, 2026'],
    itinerary: [
      { day: 1, title: 'Dubai Arrival & Private Marina Sunset Yacht Welcome', highlights: '55ft yacht cruise past Ain Dubai & Atlantis with champagne', meals: 'Dinner on board', coordinates: [25.0772, 55.1396] },
      { day: 2, title: 'Burj Khalifa Level 148 Sky Lounge & Fountain Boardwalk', highlights: 'Skip-the-line VIP terrace ascent & reserved lake viewing', meals: 'Breakfast & High Tea', coordinates: [25.1972, 55.2744] },
      { day: 3, title: 'Royal Red Dunes Desert Safari & Starlit Bedouin Camp', highlights: '4x4 dune bashing, camel trek, falconry & 5-star grill', meals: 'Breakfast & Bedouin Gala', coordinates: [24.9500, 55.6000] },
      { day: 4, title: 'Old Dubai Heritage, Saffron Masterclass & Abra Crossing', highlights: 'Al Fahidi historic quarter, wooden abra boat & spice souks', meals: 'Breakfast & Traditional Lunch', coordinates: [25.2631, 55.2972] },
      { day: 5, title: 'Hatta Mountain Turquoise Dam Kayak & Honey Safari', highlights: 'Crisp Hajar mountain air, scenic kayaking & farm lunch', meals: 'All meals included', coordinates: [24.8167, 56.1167] },
      { day: 6, title: 'Sunrise Spa Breakfast & Chauffeur Transfer to DXB', highlights: 'Panoramic breakfast overlooking Palm Jumeirah', meals: 'Gourmet Breakfast', coordinates: [25.1124, 55.1390] }
    ]
  }
];

export const DUBAI_WINTER_TOURS: DestinationTour[] = [
  {
    id: 'dubai-tour-desert-safari',
    title: 'Royal Sundowner Red Dunes Desert Safari & Starlit Bedouin Camp',
    season: 'Winter Season (Nov–Mar)',
    duration: '7 Hours · 14:30 – 21:30',
    price: 185,
    rating: 4.98,
    reviewCount: 432,
    tag: 'Desert Safari & Gala',
    imageUrl: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '4x4 Red Dune Bashing',
      'Sunset Camel Caravan',
      'Falconry Flight Display',
      'Live Oud & Tanoura Show',
      '5-Star Arabian BBQ Feast'
    ],
    inclusions: [
      'Chauffeured 4x4 Land Cruiser with hotel pickup',
      'Unlimited refreshments, Arabian coffee & dates',
      'Henna artistry & Bedouin shisha lounge',
      'Sandboarding gear & astronomer telescope session'
    ],
    departureTimes: ['14:30 Daily Pickup', '15:00 VIP Chauffeur Pickup'],
    description: 'Experience the Arabian desert during Dubai’s ideal winter dusk. Conquer the deep red dunes of Lahbab, admire sunset falconry, ride camels along rolling crests, and dine under open constellations with a five-star Bedouin grill and live acoustic oud.'
  },
  {
    id: 'dubai-tour-burj-fountain',
    title: 'Burj Khalifa Level 148 Sky Lounge & Private Fountain Boardwalk',
    season: 'Winter Season (Nov–Mar)',
    duration: '3.5 Hours · Sunset VIP Slot',
    price: 215,
    rating: 4.97,
    reviewCount: 388,
    tag: 'Skyline & VIP Terraces',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Fast-Track Sky Elevator',
      'Level 148 Outdoor Sky Terrace',
      'Signature Mocktails & Dates',
      'Reserved Fountain Boardwalk',
      '360° Sunset Horizon'
    ],
    inclusions: [
      'Skip-the-line VIP priority entry',
      'Personal Sky ambassador escort',
      'Access to Levels 148, 125 and 124',
      'Reserved Dubai Fountain lake boardwalk pass'
    ],
    departureTimes: ['16:30 Sunset Prime', '17:30 Twilight Prime'],
    description: 'Ascend 555 meters to the world’s highest open-air observatory during crisp winter golden hour. Savor signature Arabian dates and refreshments while watching the sun sink into the Gulf, followed by front-row boardwalk views of the synchronized Dubai Fountain.'
  },
  {
    id: 'dubai-tour-palm-yacht',
    title: 'Palm Jumeirah & Dubai Marina Sunset Luxury Yacht Charter',
    season: 'Winter Season (Nov–Mar)',
    duration: '3 Hours · 16:00 – 19:00',
    price: 165,
    rating: 4.95,
    reviewCount: 294,
    tag: 'Coastal Yachting',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '55ft Private Italian Motor Yacht',
      'Cruising Atlantis The Royal',
      'Ain Dubai & Marina Skyline',
      'Champagne & Artisan Canapés',
      'Sunset Lagoon Dip'
    ],
    inclusions: [
      'Licensed captain & dedicated hospitality crew',
      'Chilled beverages & fresh fruit skewers',
      'High-fidelity sound system & sun deck',
      'Plush beach towels & safety equipment'
    ],
    departureTimes: ['16:00 Sunset Sail', '19:30 Illuminated Night Sail'],
    description: 'Feel the balmy winter sea breeze of the Arabian Gulf aboard an Italian-built luxury motor yacht. Cruise past the iconic Palm Jumeirah archipelago, Atlantis The Royal, and Bluewaters Island as dusk casts gold across Dubai Marina’s futuristic towers.'
  },
  {
    id: 'dubai-tour-old-heritage',
    title: 'Old Dubai Heritage, Saffron Masterclass & Abra Creek Crossing',
    season: 'Winter Season (Nov–Mar)',
    duration: '4 Hours · 09:00 – 13:00',
    price: 95,
    rating: 4.93,
    reviewCount: 216,
    tag: 'Heritage & Spice Souks',
    imageUrl: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Al Fahidi Coral Alleys',
      'Heritage Wooden Abra Boat Ride',
      'Pure Saffron & Cardamom Tasting',
      'Gold & Perfume Oil Bazaars',
      'Traditional Emirati Coffee'
    ],
    inclusions: [
      'Certified Emirati cultural historian guide',
      'Abra boat waterway crossing pass',
      'Street food, karak chai & dates samplings',
      'Souk shopping consultation & discount voucher'
    ],
    departureTimes: ['09:00 Morning Stroll', '15:30 Afternoon Stroll'],
    description: 'Dubai’s winter mornings (22°C) are made for walking. Stroll through the quiet wind-tower alleys of Al Fahidi, cross Dubai Creek on a historic wooden abra boat, sample premier Persian saffron, and discover bespoke oud and frankincense perfume oils.'
  },
  {
    id: 'dubai-tour-hatta-mountain',
    title: 'Hatta Mountain Turquoise Dam Kayaking & Honey Bee Safari',
    season: 'Winter Season (Nov–Mar)',
    duration: 'Full Day · 08:30 – 17:00',
    price: 175,
    rating: 4.96,
    reviewCount: 168,
    tag: 'Mountain & Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Hajar Mountains 4x4 Transit',
      'Turquoise Reservoir Kayaking',
      'Hatta Honey Bee Garden Tour',
      'Heritage Mountain Village Walk',
      'Authentic Emirati Farm Lunch'
    ],
    inclusions: [
      'Roundtrip 4WD transport from Dubai hotels',
      'Single/tandem kayak & lifejacket equipment',
      'Beekeeper suit & organic Sidr honey tasting',
      'Farm-to-table Emirati lunch with mountain views'
    ],
    departureTimes: ['08:30 Daily Departure'],
    description: 'Head into the rugged Hajar Mountains where winter delivers crisp alpine air and pristine skies. Paddle a kayak through the vibrant turquoise waters of Hatta Dam, taste rare Sidr mountain honey straight from the comb, and savor organic mountain delicacies.'
  }
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'dest-dubai',
    name: 'Dubai',
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    region: 'middle-east',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    altText: 'Dubai downtown skyline with Burj Khalifa and sparkling marina',
    staysCount: 32,
    toursCount: 36,
    bestSeason: 'Nov–Mar (Winter Season)',
    avgTemp: '24°C',
    weatherTemp: '24°C',
    rating: 4.98,
    startingPrice: 880,
    pricePKR: 'PKR 245,000',
    shortDescription: 'Futuristic skyline, luxury desert dune safaris, and golden Arabian Gulf beach resorts.',
    tagline: 'Golden winter warmth, sunset desert safaris & gilded coastal skyline',
    isCuratorSpotlight: true,
    badge: 'Winter Season Highlight ☀️',
    coordinates: [25.2048, 55.2708],
    sights: ['Burj Khalifa', 'Lahbab Red Dunes', 'Palm Jumeirah', 'Al Fahidi Creek Souks', 'Hatta Dam'],
    highlights: [
      '5 Curated Winter Tours',
      '24°C Balmy Sunshine',
      'Red Dune Desert Safari',
      'Luxury Sunset Yachting',
      'Al Fahidi Spice Souks'
    ],
    description: 'Winter is Dubai’s undisputed premier season. From November through March, mild 24°C temperatures, sunny azure skies, and cool desert nights offer the perfect climate for open-air desert safaris, yachting, and dining under the stars.',
    winterTours: DUBAI_WINTER_TOURS,
    tours: DUBAI_WINTER_TOURS,
    localGuideNote: {
      guideName: 'Rashid Al-Maktoum',
      note: 'Winter (November to March) is Dubai at its peak glory: comfortable sunny days for the beach and outdoor souks, and crisp cool desert evenings around Bedouin fires.'
    }
  },
  {
    id: 'dest-istanbul',
    name: 'Istanbul',
    flag: '🇹🇷',
    country: 'Turkey',
    region: 'europe',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    altText: 'Sunset over Istanbul Bosphorus with historic minarets and ferries',
    staysCount: 28,
    toursCount: 24,
    bestSeason: 'Apr–Jun & Sep–Nov',
    avgTemp: '21°C',
    weatherTemp: '21°C',
    rating: 4.92,
    startingPrice: 700,
    pricePKR: 'PKR 195,000',
    shortDescription: 'Historic Bosphorus sunset cruises, Byzantine architecture, and vibrant Grand Bazaar spice markets.',
    tagline: 'Where East meets West across glistening maritime straits',
    badge: 'Cultural Crossroads 🕌',
    coordinates: [41.0082, 28.9784],
    sights: ['Hagia Sophia', 'Blue Mosque', 'Bosphorus Strait', 'Grand Bazaar', 'Topkapi Palace'],
    highlights: ['Private Bosphorus Yacht', 'Historic Hammam Rituals', 'Culinary Spice Walk'],
    description: 'Straddling two continents across the azure Bosphorus, Istanbul enchants with Byzantine mosaics, Ottoman palaces, buzzing rooftop tea gardens, and authentic bazaar shopping.'
  },
  {
    id: 'dest-maldives',
    name: 'Maldives',
    flag: '🇲🇻',
    country: 'Maldives',
    region: 'asia-pacific',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    altText: 'Crystal clear turquoise water and overwater luxury villas in the Maldives',
    staysCount: 22,
    toursCount: 16,
    bestSeason: 'Nov–Apr',
    avgTemp: '29°C',
    weatherTemp: '29°C',
    rating: 4.97,
    startingPrice: 1240,
    pricePKR: 'PKR 345,000',
    shortDescription: 'Turquoise lagoons, private overwater luxury villas, and breathtaking coral reef scuba sanctuaries.',
    tagline: 'Barefoot tropical opulence across turquoise atolls',
    badge: 'Island Sanctuary 🏝️',
    coordinates: [3.2028, 73.2207],
    sights: ['Baa Atoll Biosphere', 'Ari Atoll Mantas', 'Male Fish Market', 'Sandbank Sunsets'],
    highlights: ['Overwater Infinity Pool', 'Manta Ray Snorkeling', 'Underwater Dining'],
    description: 'Drift away to paradise in ultra-private villas perched directly over shallow turquoise waters, surrounded by vibrant sea turtles, manta rays, and pristine coral atolls.'
  },
  {
    id: 'dest-switzerland',
    name: 'Switzerland',
    flag: '🇨🇭',
    country: 'Switzerland',
    region: 'europe',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    altText: 'Swiss alpine peaks, lush green meadows, and pristine mirror mountain lake',
    staysCount: 26,
    toursCount: 20,
    bestSeason: 'Dec–Mar & Jun–Sep',
    avgTemp: '18°C',
    weatherTemp: '18°C',
    rating: 4.99,
    startingPrice: 1530,
    pricePKR: 'PKR 425,000',
    shortDescription: 'Majestic snow-capped Alps, panoramic Glacier Express trains, and crystal-clear alpine lakes.',
    tagline: 'Snow-crested alpine summits and glass-clear mirror lakes',
    badge: 'Alpine Wonder 🏔️',
    coordinates: [46.8182, 8.2275],
    sights: ['Matterhorn Zermatt', 'Lake Geneva', 'Jungfraujoch', 'Lucerne Chapel Bridge', 'Interlaken'],
    highlights: ['Glacier Express Rail', 'Fondue Tasting Chalets', 'Alpine Helicopter Tour'],
    description: 'From soaring peaks around Zermatt to crystalline lakes in Lucerne, Switzerland delivers unforgettable scenic railway journeys, fondue tastings, and world-class alpine luxury.'
  },
  {
    id: 'dest-london',
    name: 'London',
    flag: '🇬🇧',
    country: 'United Kingdom',
    region: 'europe',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    altText: 'London Tower Bridge illuminated at twilight over River Thames',
    staysCount: 35,
    toursCount: 40,
    bestSeason: 'May–Sep',
    avgTemp: '20°C',
    weatherTemp: '20°C',
    rating: 4.91,
    startingPrice: 1310,
    pricePKR: 'PKR 365,000',
    shortDescription: 'Royal palaces, world-class West End theatres, iconic River Thames views, and Michelin dining.',
    tagline: 'Historic royal majesty and vibrant modern culture',
    badge: 'Metropolitan Icon 👑',
    coordinates: [51.5074, -0.1278],
    sights: ['Tower Bridge', 'Big Ben & Westminster', 'Buckingham Palace', 'British Museum', 'Covent Garden'],
    highlights: ['Private West End Box', 'Royal Thames Cruise', 'Mayfair High Tea'],
    description: 'Immerse yourself in centuries of royal history, iconic red buses, acclaimed West End stage productions, world-class art galleries, and Mayfair culinary luxury.'
  },
  {
    id: 'dest-malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    country: 'Malaysia',
    region: 'asia-pacific',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    altText: 'Kuala Lumpur glittering Petronas Twin Towers illuminated at night',
    staysCount: 25,
    toursCount: 22,
    bestSeason: 'Year-round',
    avgTemp: '28°C',
    weatherTemp: '28°C',
    rating: 4.88,
    startingPrice: 590,
    pricePKR: 'PKR 165,000',
    shortDescription: 'Gleaming Petronas Twin Towers, ancient Langkawi rainforests, and multicultural street food havens.',
    tagline: 'Tropical rainforest meets glittering cosmopolitan skyline',
    badge: 'Tropical Haven 🌴',
    coordinates: [3.1390, 101.6869],
    sights: ['Petronas Towers', 'Batu Caves', 'Langkawi Geoforest', 'Penang Street Art', 'Cameron Highlands'],
    highlights: ['Skybridge Night Views', 'Batu Caves Pilgrimage', 'Langkawi Mangrove Boat'],
    description: 'A vibrant kaleidoscope of cultures, flavors, and landscapes—from the soaring Petronas Twin Towers to prehistoric rainforests in Langkawi and sizzling street food in Penang.'
  },
  {
    id: 'dest-saudi',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    country: 'Saudi Arabia',
    region: 'middle-east',
    imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
    altText: 'AlUla majestic sandstone mountains and ancient Nabataean rock tombs in Saudi Arabia',
    staysCount: 20,
    toursCount: 18,
    bestSeason: 'Oct–Apr',
    avgTemp: '25°C',
    weatherTemp: '25°C',
    rating: 4.94,
    startingPrice: 770,
    pricePKR: 'PKR 215,000',
    shortDescription: 'Mystical sandstone canyons of AlUla, Red Sea untouched coral reefs, and vibrant Riyadh heritage.',
    tagline: 'Ancient Nabataean wonders and visionary modern kingdoms',
    badge: 'Ancient Majesty 🏛️',
    coordinates: [26.6190, 37.9250],
    sights: ['Hegra AlUla', 'Elephant Rock', 'Red Sea Coast', 'Diriyah Historical City', 'Kingdom Centre Tower'],
    highlights: ['Stargazing at AlUla', 'Hegra Tombs Guided Trek', 'Red Sea Marine Diving'],
    description: 'Discover monumental Nabataean tombs carved into towering sandstone monoliths in AlUla, pristine Red Sea coral reefs, and the dazzling historic capital of Riyadh.'
  },
  {
    id: 'dest-thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    country: 'Thailand',
    region: 'asia-pacific',
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
    altText: 'Traditional Thai wooden longtail boats in turquoise Phang Nga Bay with limestone karsts',
    staysCount: 30,
    toursCount: 32,
    bestSeason: 'Nov–Apr',
    avgTemp: '30°C',
    weatherTemp: '30°C',
    rating: 4.90,
    startingPrice: 630,
    pricePKR: 'PKR 175,000',
    shortDescription: 'Emerald Andaman Sea waters, majestic golden temples in Bangkok, and lively floating street markets.',
    tagline: 'Golden temples, limestone islands & world-famous culinary warmth',
    badge: 'Land of Smiles 🌺',
    coordinates: [13.7563, 100.5018],
    sights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Chiang Mai Elephant Valley', 'Damnoen Saduak Market'],
    highlights: ['Speedboat Island Hopping', 'Thai Culinary Masterclass', 'Sacred Temple Blessings'],
    description: 'From the shimmering spires of Bangkok’s Grand Palace to the dramatic limestone karsts rising out of turquoise seas in Phuket and Krabi, Thailand offers warm hospitality and thrilling adventures.'
  },
  {
    id: 'dest-iceland',
    name: 'Iceland Glaciers & Geothermal Springs',
    country: 'Iceland',
    region: 'europe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAElLxROBeZf5HVDLo10B3JEYRRUGCovb9eos5kPlVfqZrC-QnNW7CQu6ernH_Dd9kBlD20tQYW8WzG3MpEZzwKGBg8LlKvtEFLeqvonkJX-fD2MK0p8YyTw7UoSZstDpwR3aJrPOQjuVashgiaipjHkvTkMEWKCJ3RgDCTxCbqmYl-8VYvjNFdQxl9CKNi5KEoibG9YNg58YYH0EH3Dq55EMeKG7lymEoNhy4TALQsJ6b4m0fxo1npYA',
    altText: 'Icelandic geothermal lagoon with volcanic basalt rocks and blue glaciers at dusk',
    staysCount: 16,
    toursCount: 22,
    bestSeason: 'Sep–Mar',
    avgTemp: '4°C',
    startingPrice: 3250,
    description: 'Trek radiant ice caverns beneath Vatnajökull, followed by private mineral soak access under the midnight luminescence.',
    isCuratorSpotlight: true,
    badge: "Curator's Spotlight",
    coordinates: [64.1466, -21.9426],
    sights: ['Blue Ice Cave', 'Diamond Beach', 'Reykjadalur Valley'],
    localGuideNote: {
      guideName: 'Arnor',
      note: 'Early September offers the best combination of active aurora skies and warm daylight for glacier cave access.'
    }
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto & The Sacred Valleys',
    country: 'Japan',
    region: 'asia-pacific',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlWy9wjMcAmm2uxCtET3X_eP41pzcQhETbrQdxLuMMtXKDWzlP9LwB9_Esy5pRjiRL9HzecaktAykmrR1F0m9vHPa3SHKYubEImBCT9-qFXXfcOsQoXBarp4nzlaihQDzJSmv2f9K4ynSlNMpTl9PTqa3Sw_3jq7mD-WB_ijQhnxDUWl-FrYhiwDPJgGcT4wWMtbo72kOy8ZQzuUOJQbfjbPmMEurWW0987NUlElMAg_NtqxJ-sc8kbA',
    altText: 'Kyoto bamboo grove and quiet stone temple pavilion in early morning light',
    staysCount: 12,
    toursCount: 18,
    bestSeason: 'Mar–May',
    avgTemp: '19°C',
    startingPrice: 3850,
    description: 'Private tea ceremonies, hidden moss gardens, and historic ryokan retreats secluded in Arashiyama.',
    coordinates: [35.0116, 135.7681],
    sights: ['Arashiyama', 'Kinkaku-ji', 'Fushimi Inari', 'Uji Green Hills'],
    localGuideNote: {
      guideName: 'Takashi',
      note: 'Visit the inner Arashiyama groves at 6:30 AM before the wind carries away the tranquil silence.'
    }
  },
  {
    id: 'dest-amalfi',
    name: 'Amalfi Coastal Sanctuaries',
    country: 'Italy',
    region: 'europe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWDL3cKYyAi-NavXBGsMfTvpSTQKNhKfstdHNJ02QIQewtbxlTkexK825e3hF0Rd9syqT6r-U2WzVPSm5G0UZDQb7oHkkNhpvfBD6L1Ro0AMGmzJQ3gHLP-wcLNs1iqmN1Nityb9rQ9fjS79-oudjhq7fqvW3PzfnvVcCdwQpodlMR5iWuVp06yObZI3ylna_vxcQLNHLGQ8VvfSBLXth8hfrSR6i5XpbJcczmMD1iCo6Jy89zH83aBw',
    altText: 'Cliffside villas of Positano tumbling down to turquoise Mediterranean sea',
    staysCount: 18,
    toursCount: 24,
    bestSeason: 'May–Oct',
    avgTemp: '26°C',
    startingPrice: 4200,
    description: 'Vintage wooden boat charters to Capri, cliffside vineyards, and private acoustic garden concerts.',
    coordinates: [40.6333, 14.6029],
    sights: ['Positano', 'Ravello', 'Capri Faraglioni', 'Amalfi Cathedral'],
    localGuideNote: {
      guideName: 'Gianluigi',
      note: 'A dusk boat ride back from Capri offers the most majestic view of Positano lit up like a cascade of lanterns.'
    }
  },
  {
    id: 'dest-patagonia',
    name: 'Patagonian Edge of the World',
    country: 'Chile',
    region: 'americas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcWqg46d7VvNu6kDFoVeCpGAnl_Rz2FxrCXGTi1PAZ7wj5pU4MSfpAKRiM_V6PrmNQ1mwdcAakP5uMwcLL3lLalRY4JPt-P10Tkfz7dg7Uglb5w2vzOyxjLenCcyVkB1AYzJhV6biW9g-9HBWkal2OLxO_nqWpzuERR2_FNFGLqQuwripcUpxODdjARIXf_K0a6FZdWehnUmbaiUMdp38F7mxwGb-xLcOpZEmFqmJGOoSbBjaMLnwE6g',
    altText: 'Granite peaks of Torres del Paine reflected in alpine lake',
    staysCount: 10,
    toursCount: 12,
    bestSeason: 'Nov–Mar',
    avgTemp: '16°C',
    startingPrice: 5150,
    description: 'Luxury eco-domes, glacier hikes across Grey Lake, and horseback rides across estancia grasslands.',
    coordinates: [-51.2532, -72.8817],
    sights: ['Torres del Paine', 'Grey Glacier', 'French Valley', 'Lake Pehoe']
  },
  {
    id: 'dest-lofoten',
    name: 'Lofoten Islands, Norway',
    country: 'Norway',
    region: 'europe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsQP5x7cfP0HOULKqm3hZHOhtf67NM5XuOBc5N1smVPHDVlp_6U-tcW8aBEdT08g4VKpASBVBnRJnVqHWBRreLWCqMtVZaqTKap4U7rXMTmgeKHylSQ8mm4JN4MT9khDGz1CV86_shCoE4axmennyuSTtU65C8Iq8UT5FKoLSxgD1K_msVEBBarBBoCDS_wKtumsOF_GIlEahtF3vJ2niWA7SuypgDkAZoU1Fx5jr7KVyEmQQ-D6Pyhg',
    altText: 'Traditional red rorbu fishermen cabins along Arctic coastline of Lofoten',
    staysCount: 9,
    toursCount: 14,
    bestSeason: 'Aug–Sep',
    avgTemp: '14°C',
    startingPrice: 3100,
    badge: 'Emerging +34%',
    description: 'Midnight kayaking & cozy historic stilt-cabins perched above glass-clear Arctic waters.',
    coordinates: [68.1667, 13.7500],
    sights: ['Reine', 'Henningsvær', 'Nusfjord', 'Haukland Beach'],
    localGuideNote: {
      guideName: 'Inga',
      note: 'Catch the cod migration at Reine village before midnight sun fades into the first auroras in late August.'
    }
  },
  {
    id: 'dest-cappadocia',
    name: 'Cappadocia, Turkey',
    country: 'Turkey',
    region: 'asia-pacific',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2ncD0jjT_F_ofQYlaUtoW4eR6JjJmB5FlZsoeUS_sUaaNmKb_gk55Vi-AXRaq2qMSxLSw-dkQ5WFBhHzkA-Q1LtoFIhdfAdv5gT3IZVZfihNvnjB-019N8oIrIolIwwf1QvcARouXcXwtU3bwZhcKGSngE04wl-cQQEdCWZobVj77z7NkxMSG-uZTyiFG_y-lMH82run2scRVSIH6ofmMj5wIvnDlyqFnKNVrbDjMuylkSXnKbz6XA',
    altText: 'Colorful hot air balloons floating over fairy chimneys in Cappadocia at sunrise',
    staysCount: 14,
    toursCount: 20,
    bestSeason: 'Apr–Jun',
    avgTemp: '22°C',
    startingPrice: 2600,
    badge: 'Top Pick',
    description: 'Cave sanctuaries & dawn balloon flights overlooking honey-colored volcanic tuff canyons.',
    coordinates: [38.6431, 34.8289],
    sights: ['Göreme Valley', 'Uçhisar Castle', 'Derinkuyu Underground City', 'Love Valley'],
    localGuideNote: {
      guideName: 'Tariq',
      note: 'Stay in Uçhisar rather than Göreme for serene evenings overlooking Pigeon Valley away from day crowds.'
    }
  },
  {
    id: 'dest-salar',
    name: 'Salar de Uyuni, Bolivia',
    country: 'Bolivia',
    region: 'americas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrfx7o_dxy03b6dBAYk-RpYgoSoJIsj8HMl9aiEFgFF_GwbcxzH1UbDAeouHm0YDR_AzCJaK992BAD7pz-osYbMECm17E9iHm9365vNqiop44s2TQLEMlTGbVF0XWn0Ewnth2YPb289-oiOdG5-s_LlOMPRcYLkQxtVNc_HADDAHBVIMV6h58S4jfINDNIX4hGWCKTcTy4nwUaBDYM3WEa70BX5ppLRPJxmQ5G4WMzPng34BPlp7Su2w',
    altText: 'Endless mirror reflection of white clouds across flooded salt flats of Salar de Uyuni',
    staysCount: 6,
    toursCount: 10,
    bestSeason: 'Jan–Apr',
    avgTemp: '17°C',
    startingPrice: 2850,
    badge: 'High Wonder',
    description: 'Infinite mirror flats & Airstream camping on the world’s largest surreal salt desert.',
    coordinates: [-20.1338, -67.4891],
    sights: ['Incahuasi Island', 'Tunupa Volcano', 'Laguna Colorada', 'Train Cemetery'],
    localGuideNote: {
      guideName: 'Mateo',
      note: 'The wet season transforms the salt crust into the planet’s largest mirror; night stargazing here feels like floating in deep space.'
    }
  },
  {
    id: 'dest-santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB33bGi6YcoP2k1ZnMkjCRqvbEZB1wdLjj7W0mAOv1WuMFw7L0k2e0qjVAZqI-H8FW8iPSAXi_GBatM1M5gFA-dwRmjbicRIdO5DRsDUIhIYXYXD_-U3z2wFT9GC5CkOd_eM5Dl0j77YlyFQyMGvAD-vs-i9pwm2LhlWFYiNmVTNL0BfezqcngMXw5yHPAqeIkq58yx4a8ijoWw_9QhNgARQpoftL12mEQ9xchCBZqRgoGj5BkKRCnBFw',
    altText: 'Santorini cliffside whitewashed architecture with cobalt blue domes',
    staysCount: 18,
    toursCount: 26,
    bestSeason: 'May–Oct',
    avgTemp: '28°C',
    startingPrice: 3400,
    description: '18 Curated Stays on the edge of the submerged Aegean caldera.',
    coordinates: [36.3932, 25.4615],
    sights: ['Oia Caldera', 'Imerovigli', 'Red Beach', 'Ancient Akrotiri']
  },
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia-pacific',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX-9nqgDRiv-OTiCq7DuJ-XRFaKECHZpnkf9-GtTDd6YoUYri3-8VuKjjC3iBDyZ-dCCtphtWmM-2jZVXhxiOGrj7w8LB3riIt7tnz7nUkVSChoqJ31HxzpJMKnd6lWlrlLgRgpWIO7tPnfpDjsS1x-gLv6NTcdBMpwu7ZCUqEzB7V3wdGFf2l4oDMsgPHXtkot2l8YwU_StZmiHPgh-WRDYRB1lkqzWAx7ZiNcI7TSEO6lot7Ziw7ig',
    altText: 'Lush green stepped rice terraces in Ubud Bali at sunrise',
    staysCount: 24,
    toursCount: 30,
    bestSeason: 'Apr–Oct',
    avgTemp: '29°C',
    startingPrice: 1980,
    description: '24 Curated Stays from misty jungle villas to clifftop ocean suites.',
    coordinates: [-8.4095, 115.1889],
    sights: ['Ubud Terraces', 'Uluwatu Temple', 'Nusa Penida', 'Mount Batur']
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'europe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC-WPUVLViLNu6aoyrK1SQdjNUn3PUuhiseF69tzlAwSmB4R2wVoLR5_BZOdTR-_vDo1s92HAGH_GEe0ET3HMcYO8o-KSICf1NLwGo168v-_HiTaOMfQwbiBIiWNja1y70riuor7YGa7OE934z3xbIU5YEyFYrWDIE4RL5y6A2P0trtkb1T2nNcvcrvXTcOzTn-d9JVistjKOByJ_zlCuXG8uBqOjGXsistNzFjFQOuNGzOBZDKlgJfA',
    altText: 'Picturesque alpine village in Swiss Alps beneath snow-capped mountains',
    staysCount: 15,
    toursCount: 22,
    bestSeason: 'Jun–Sep & Dec–Apr',
    avgTemp: '18°C',
    startingPrice: 3900,
    description: '15 Chalets & Lodges nestled under soaring glaciers and wildflower valleys.',
    coordinates: [46.5197, 8.0163],
    sights: ['Zermatt', 'Jungfraujoch', 'Lauterbrunnen', 'Grindelwald']
  }
];

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: 'art-solo-asia',
    title: 'The Ultimate Guide to Solo Backpacking in Southeast Asia',
    category: 'Featured Dispatch',
    readTime: '8 min read',
    author: 'Camille de la Tour',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZT7FBgieOCb-iEOfaNXJcXx2QCGUv9P6md3mwLAJV6L8F4EI8sqPUKX80n_4c7SWnQRbYdaxCmNpNImRdAdrlBg__hRv5smQFkNv7Q2U_8R_LZlKjBxcqwRD2PAFDrK-Y608SwFwX-ybaaFYcoCsWIJAB-oQki2oy_gKmQb6wCDIb_2-BOROqvvgx-XqCl24SavUkgSW09G0wJzzP-QZ9hsNBjL48OcdJ8LtmiOOr5RhNDIXfWEUjA',
    date: 'Chiang Mai • Oct 24',
    likes: 3840,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHRBcaOgSSis-AduqDr3uSqsv_Swq50LJlNLgyDWH629xsyclHnuhE1_a7Vq5mRpgJDXOwxrNMYc2fNolVypZIjsT8eBB8FPFjqnsQSeP3U1EwqX3lMn6At6Hbq375zhVFzqaWKl3c0Pa01ahseVJSdlpbIVKWPscYvjwLA_8S1GZ7MFrDMMlOw5-RY6vEwXglOzJkzJ5p2A0T6GW8ZkR8C7-oJUMwbdvn4zlGrcvxQP6bKcgtwxw-qA',
    altText: 'Solo adventurer sitting on wooden dock gazing over misty limestone karst islands in Ha Long Bay Vietnam',
    excerpt: 'Navigating quiet night trains, finding secret monastic hostels, and mastering street food markets from northern Thailand to the islands of the Gulf.',
    isFeatured: true
  },
  {
    id: 'art-southern-italy',
    title: 'Top 10 Hidden Beaches in Southern Italy',
    category: 'Coastal Escapes',
    readTime: '5 min',
    author: 'Marco Bellini',
    likes: 1420,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmmjZrQYpnCzgaD9uDVfkAXmqzTYoLGZM53rOuI5eyInF9TQT7o5SR8r_63FvHGrxH2UNkwHlNeBjvx-ZrAZ1rlnm2tQ1OyqD6xyKMXgLHS250RpIETXKwYD79OxSQdrGZWlKDm5EdUxoXb4vNg4koVTaM1_aY5pzJza_qJwJNHOS9QN8reGzIxJOChddVvAzEgszik683tYn2_rA84URkZn0Gb9aE2PEAOtENY1DUwc8sXFHzaTwF9A',
    altText: 'Hidden secluded cove beach in Puglia Southern Italy with rugged limestone arches',
    excerpt: 'Beyond the crowded beach clubs: secret sea coves accessible only by wooden dinghy or cliffside footpaths.'
  },
  {
    id: 'art-hokkaido-winter',
    title: 'Packing Essentials for Winter in Hokkaido',
    category: 'Gear & Transit',
    readTime: '6 min',
    author: 'Kenji Sato',
    likes: 980,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMq39xci7vPq_LnKps2Eap6M2gg8GYfCjIICsYO7HsXsGHj6EjMOFSRqjVLtIoQC2p3-667WemIh8HwLdg3hoka9CJYY6AP9pqd_6c4z6jOj4NsBSDJ0vlI6xQnT6L-4_LWtoWXyLi27VUXxKuqYidF_Fu8oipyShHRC9um_PYCN-vsizQLlXOVNwYtGk845HLtxPmP9RKIY0Ob7UQjaGNFpYfuJtbbtYmAE4enBIf4_Y8LGuDaXnqcw',
    altText: 'Snow covered birch forest and traditional onsen wooden pavilion in Hokkaido Japan',
    excerpt: 'From merino wool thermal baselayers to waterproof boots built for sub-zero powder days in Niseko.'
  },
  {
    id: 'art-oaxaca-culinary',
    title: 'Culinary Expeditions across Oaxaca',
    category: 'Taste Odyssey',
    readTime: '9 min',
    author: 'Sofia Morales',
    likes: 2100,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaeZmThThF7izhqmTii6Om-ntyvvFNg3SOwzOTYLDoI-5ePD-TMHyf8ZCHQd3LJdpDG6I296expSwSbojeQRxm1-6hCuNtpik7Jz-a2xtwZpp8QqY1V1i_R8QJ3MO-BN9Pts4qSd441mxFeoj8BJMvEklparvW0alH59BNwvLy4ZUEoSoEs08fMKG7O2Ih3PzfXoXDtC4pOpxDnEAMMzjKOfFaT9BmgBpsW5sbI3j0frpNrV3kE7VmsQ',
    altText: 'Vibrant open-air market in Oaxaca with terracotta clay bowls and black mole',
    excerpt: 'Tasting centuries of indigenous heritage through seven moles, artisanal mezcal distilleries, and heirloom maize.'
  },
  {
    id: 'art-kyoto-stillness',
    title: "The Art of Stillness: 48 Hours in Kyoto's Silent Monasteries",
    category: 'Cultural Guide',
    readTime: '5 min read',
    author: 'Kenji Takahashi',
    likes: 1890,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUvHQ0Tmhg2PvfMz92l9gbzToDtnedXzpOsAfALIatvrrik4zBBERDwArVU3up7JNgqeF1kuIVl0qyp6CL4pyPIvr0XbtzQgIowUT3enksXpB6uuiG3yCCIZ0s7ORTrxlGPdaaYXNMhUvgDkLkkNWJWlpBWQAgiTIAbKzQoUmCbXRie6XlCEuh7vfWyD4KVBHbOhmAh9Tf-Qi6B4MDDeqfXq4RzJyRmI6ehKnvx7wFo8iPiPh_nDf4BQ',
    altText: 'Cozy traditional Kyoto tea house room with tatami mats and moss garden view',
    excerpt: 'Experiencing temple life, dawn meditation, and silence in the outer hills of northern Kyoto.'
  },
  {
    id: 'art-nile-felucca',
    title: 'Drifting Down the Nile: From Aswan to Luxor on a Private Felucca',
    category: 'Expeditions',
    readTime: '8 min read',
    author: 'Clara Laurent',
    likes: 1540,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcVu8wEtynpbZRwNMA9d8Gdr12mtOMs2-c9d84AnuXbaX7GhUWjTMA-nw9wZk5CmzJ8-JWzoI3piP2D57PZUjcmxGiOVFegWHWbbGWo58Nrbwxtup310pTeoSRzq1RWoaLe9FchqNBIYPjyM6zEN2NgnAJb27ymuhyAoZpuDuNgTlOCKKVHvAeaObqUzDmLpSmMSzCpTo0AQ8f7F6p9OKORpLMV_08otiJFE8puUCNo5PfDlxxD-Lbnw',
    altText: 'Traditional wooden felucca boat sailing silently on the Nile River at sunset',
    excerpt: 'Gliding along the timeless waters under canvas sails, stopping at remote sandstone temples away from cruise ships.'
  }
];

export const INITIAL_ITINERARY_STOPS: ItineraryStop[] = [
  {
    id: 'stop-1',
    day: 1,
    time: '10:00 AM',
    title: 'Private Catamaran Charter to Capri',
    location: 'Marina Grande, Amalfi Coast',
    category: 'transit',
    cost: 480,
    assignedMember: 'Elena Vance',
    notes: 'Towels and champagne arranged. Captain Marco confirmed.',
    votes: { upvotes: 4, downvotes: 0, userVote: 'up' },
    coordinates: [40.6333, 14.6029]
  },
  {
    id: 'stop-2',
    day: 1,
    time: '01:30 PM',
    title: 'Cliffside Secluded Seafood Lunch at La Fontelina',
    location: 'Faraglioni Rocks, Capri',
    category: 'dining',
    cost: 160,
    assignedMember: 'Marcus Reed',
    notes: 'Table 4 reserved under Elena Vance party.',
    votes: { upvotes: 3, downvotes: 0, userVote: 'up' },
    coordinates: [40.5480, 14.2490]
  },
  {
    id: 'stop-3',
    day: 2,
    time: '09:00 AM',
    title: 'Path of the Gods Sunrise Hike',
    location: 'Bomerano to Nocelle',
    category: 'activity',
    cost: 85,
    assignedMember: 'Camille de la Tour',
    notes: 'Pack hiking shoes and water. Guide Luigi meets us at trailhead.',
    votes: { upvotes: 4, downvotes: 1, userVote: 'up' },
    coordinates: [40.6300, 14.5100]
  },
  {
    id: 'stop-4',
    day: 2,
    time: '06:00 PM',
    title: 'Private Limoncello Grove & Terrace Tasting',
    location: 'Ravello Hills',
    category: 'activity',
    cost: 120,
    assignedMember: 'Kenji Sato',
    notes: 'Includes bottle to take home per wanderer.',
    votes: { upvotes: 3, downvotes: 0 },
    coordinates: [40.6500, 14.6120]
  },
  {
    id: 'stop-5',
    day: 3,
    time: '07:30 PM',
    title: 'Michelin Star Sunset Gala at Ristorante Torre del Saracino',
    location: 'Vico Equense',
    category: 'dining',
    cost: 320,
    assignedMember: 'Elena Vance',
    notes: 'Dress code: Smart resort chic. Tasting menu with local wine pairing.',
    votes: { upvotes: 4, downvotes: 0, userVote: 'up' },
    coordinates: [40.6650, 14.4280]
  }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Villa Cimbrone Luxury Stay (3 nights)',
    category: 'lodging',
    amount: 1950,
    currency: 'USD',
    paidBy: 'Elena Vance',
    splitAmong: ['m1', 'm2', 'm3', 'm4'],
    date: '2025-07-12',
    receiptAttached: true
  },
  {
    id: 'exp-2',
    title: 'Capri Catamaran Full-Day Charter',
    category: 'transit',
    amount: 980,
    currency: 'USD',
    paidBy: 'Marcus Reed',
    splitAmong: ['m1', 'm2', 'm3', 'm4'],
    date: '2025-07-13',
    receiptAttached: true
  },
  {
    id: 'exp-3',
    title: 'Da Adolfo Cove Lunch & Wine',
    category: 'dining',
    amount: 340,
    currency: 'USD',
    paidBy: 'Camille de la Tour',
    splitAmong: ['m1', 'm2', 'm3', 'm4'],
    date: '2025-07-13',
    receiptAttached: true
  },
  {
    id: 'exp-4',
    title: 'Path of the Gods Certified Mountain Guide',
    category: 'activities',
    amount: 220,
    currency: 'USD',
    paidBy: 'Elena Vance',
    splitAmong: ['m1', 'm2', 'm3', 'm4'],
    date: '2025-07-14',
    receiptAttached: false
  },
  {
    id: 'exp-5',
    title: 'Naples Airport VIP Limousine Port Transfer',
    category: 'transit',
    amount: 280,
    currency: 'USD',
    paidBy: 'Marcus Reed',
    splitAmong: ['m1', 'm2', 'm3', 'm4'],
    date: '2025-07-12',
    receiptAttached: true
  }
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  { id: 'pack-1', text: 'Passports with 6+ months validity', category: 'documents', assignedTo: 'Elena Vance', isCompleted: true },
  { id: 'pack-2', text: 'International Driver Permit', category: 'documents', assignedTo: 'Marcus Reed', isCompleted: true },
  { id: 'pack-3', text: 'Waterproof dry bag for boat days', category: 'gear', assignedTo: 'Camille de la Tour', isCompleted: true },
  { id: 'pack-4', text: 'Polarized sunglasses & linen resort wear', category: 'clothing', assignedTo: 'Elena Vance', isCompleted: false },
  { id: 'pack-5', text: 'Compact DSLR with 24-70mm lens', category: 'gear', assignedTo: 'Kenji Sato', isCompleted: false },
  { id: 'pack-6', text: 'Electrolytes & motion sickness bands', category: 'wellness', assignedTo: 'Marcus Reed', isCompleted: true }
];

export const INITIAL_MEMORIES: MemoryPhoto[] = [
  {
    id: 'mem-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0MC84HreC0Mzou3sjBX3vxLob6I6t8LvYSkSkfBe9DF8FurICc9Z8YYHJoTneKBMLzCRGv-6ydNAEaTx9PhOKbyuJ9Go64rdI4h3q93ET6YZXJ33gH86_RpTHmQ-JPaaeFNCJdT2BSqcCXF6gHaj3J5yptJU4c572FhxpOisQfj4_R5CJYUnLOk8dR8r2K1tmCIIfnQBW2UjdI41dhYNy5LooAamc4EbH75IaD6QS9yTQ093QEfCvlA',
    caption: 'Golden hour arriving in Positano harbor. Water felt like liquid tourmaline.',
    location: 'Positano, Italy',
    dayNumber: 1,
    uploadedBy: 'Elena Vance',
    uploaderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCofZ7OiZLmV9uz0XUPQhPCpVpDUB9DGqFurHkB46fc1Rb2yQ_2iP2E4DfbtTUhgtzOaTVGQSinMHWwJQMsteZPNTsw0TiwoxBidA3ee_6k2wKwtsBzR_a2z1bijiSYNXqtZ93TxBznfqJtoU5m8tWHimWszd0itlQaGP44cGUCEkNKBVwbGEK2m-drEJTKR23bEYmvVdJsnY6p5d9qH8CfCVrl4omYNGS_9RGYvc_GEpgyYWpMr6_31Q',
    timestamp: '2 hours ago',
    likes: 12,
    userLiked: true
  },
  {
    id: 'mem-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW0nyCQQq-zKoscYXUCpKH-paxSlpRFCgujQmRjbG0EbfhBO82fAoZhHAZVQHJPTrNFCp-TsN7sP_pN_eyJwYtlAyeqw_-utUgYBqf9YQ-2lAm21VV_c6LecOgK842X2wxKZ7XcebXvdqahCgYmVQNeNaXmXFWFljsOlTinTijGY-t4J7qIuPvJGArX7zSO_JFQT1nf5LyxwM6y20-p9nkVh-WEyBL4EmH-FivfuIYTfNSicnHWNUV8A',
    caption: 'Anchored off Capri for a midday swim before lunch at La Fontelina.',
    location: 'Faraglioni, Capri',
    dayNumber: 2,
    uploadedBy: 'Marcus Reed',
    uploaderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBuUxmMlmHAHD5x_73mvzrzD_8MYWdSiC4jublF-_VONj3GB1bDMTadICrVgnBvFInVg5kZerMEV_E6CXDnKTnrrLjZte6M1WbVblBexi_qorG8cWsmMjB0MZb8kkYtsOU0sQMrMABMQ3NuTx1t7VI5lN5q53jo06p0DKYeLgGhFLTrk_hLCUsZYH351OlvfXSYDVCKJnOzEjVALn72HHY5mh0y_xmdWkhkAvAho6kNXCSPFyP8pur_Q',
    timestamp: 'Yesterday',
    likes: 8
  },
  {
    id: 'mem-3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWDL3cKYyAi-NavXBGsMfTvpSTQKNhKfstdHNJ02QIQewtbxlTkexK825e3hF0Rd9syqT6r-U2WzVPSm5G0UZDQb7oHkkNhpvfBD6L1Ro0AMGmzJQ3gHLP-wcLNs1iqmN1Nityb9rQ9fjS79-oudjhq7fqvW3PzfnvVcCdwQpodlMR5iWuVp06yObZI3ylna_vxcQLNHLGQ8VvfSBLXth8hfrSR6i5XpbJcczmMD1iCo6Jy89zH83aBw',
    caption: 'Ravello lemon groves. The air smelled of blossoms and ocean mist.',
    location: 'Ravello, Italy',
    dayNumber: 3,
    uploadedBy: 'Camille de la Tour',
    uploaderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZT7FBgieOCb-iEOfaNXJcXx2QCGUv9P6md3mwLAJV6L8F4EI8sqPUKX80n_4c7SWnQRbYdaxCmNpNImRdAdrlBg__hRv5smQFkNv7Q2U_8R_LZlKjBxcqwRD2PAFDrK-Y608SwFwX-ybaaFYcoCsWIJAB-oQki2oy_gKmQb6wCDIb_2-BOROqvvgx-XqCl24SavUkgSW09G0wJzzP-QZ9hsNBjL48OcdJ8LtmiOOr5RhNDIXfWEUjA',
    timestamp: '2 days ago',
    likes: 19,
    userLiked: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Trip Itinerary Updated',
    message: 'Marcus Reed adjusted the dinner time for Day 3 Michelin Tasting to 7:30 PM.',
    timestamp: '15 min ago',
    category: 'group',
    isRead: false,
    linkTab: 'map'
  },
  {
    id: 'notif-2',
    title: 'Price Drop Alert (-20%)',
    message: 'Business class fares on Air France (CDG ➔ NAP) just dropped for your trip window.',
    timestamp: '2 hours ago',
    category: 'flight',
    isRead: false,
    linkTab: 'packages'
  },
  {
    id: 'notif-3',
    title: 'Weather Advisory: Perfect Sailing Conditions',
    message: 'Calm seas (0.4m swell) and sunny 27°C expected for your Capri Catamaran Charter.',
    timestamp: '5 hours ago',
    category: 'trip',
    isRead: true,
    linkTab: 'map'
  },
  {
    id: 'notif-4',
    title: 'Offline Pack Downloaded',
    message: 'Amalfi Coast topological maps and booking passes are securely cached for offline access.',
    timestamp: 'Yesterday',
    category: 'security',
    isRead: true,
    linkTab: 'map'
  }
];
