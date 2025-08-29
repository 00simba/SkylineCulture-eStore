const shipping =  ["• Orders of $35 or more qualify for FREE Shipping.\n\nUSA: 4-6 business days\nCanada: 2-6 business days\nInternational: 7-15 business days"]
//curr_id = 13
const cloudFrontUrl = 'https://d38opoffv15p79.cloudfront.net';
export default [
    {
        "id" : 1,
        "title" : "R34 GTR Keychain",
        "stars" : 0,
        "img" : [`${cloudFrontUrl}/r34_keychain/r34key_main.webp`, `${cloudFrontUrl}/r34_keychain/r34key_1.webp`],
        "price" : 14.99,
        "sale_price": 9.99,
        "url" : "r34-gtr-keychain",
        "description" : [
        
        "• One of the most popular sports car out of Japan, the R34 GTR! This spec is based off the ultra rare 1 of 20 Z-TUNE!",        

        ],
        "specs": "Size: 2 inches on longest side\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",
    },
    {
        "id" : 2,
        "title" : "R32 GTR Keychain",
        "stars" : 0,
        "img" : [`${cloudFrontUrl}/r32_keychain/r32key_main.webp`],
        "price" : 14.99,
        "sale_price": 9.99,
        "url" : "r32-gtr-keychain",
        "description" : [
            
        "• Featuring the record setting sports car dubbed 'Godzilla', the R32 GTR!"
        
        ],
        "specs": "Size: 2 inches on longest side\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",
    },
    {
        "id" : 5,
        "title" : "Turbo Keychain",
        "stars" : 5,
        "img" : [`${cloudFrontUrl}/turbo_keychain/turbo_main.webp`, `${cloudFrontUrl}/turbo_keychain/turbo_Black.webp`, `${cloudFrontUrl}/turbo_keychain/turbo_Silver.webp`, `${cloudFrontUrl}/turbo_keychain/turbo_Chroma.webp`],
        "price" : 9.99,
        "sale_price": 7.99,
        "url" : "turbo-keychain",
        "description" : [
            
        "• Give your keyset a boost by getting this turbo keychain that features a spinnable turbine.",
    
        ],

        "specs": "Size: 28mm X 16mm.\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants": [{"Select Color": ["Black", "Silver", "Chroma"]}],
        "collection" : "Keychains",
    },
    {
        "id" : 6,
        "title" : "NOS Keychain",
        "stars" : 4.5,
        "img" : [`${cloudFrontUrl}/nos_keychain/nos_main.webp`, `${cloudFrontUrl}/nos_keychain/nos_1.webp`, `${cloudFrontUrl}/nos_keychain/nos_2.webp`],
        "price" : 7.99,
        "sale_price": 4.99,
        "url" : "nos-keychain",
        "description" : [
            
        "• A perfect miniature NOS bottle keychain that features an unscrewable lid to work as a stash.",
    
        ],

        "specs": "Size: 2 inches on longest side\n Material: Constructed of zinc alloy",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",
    },
    {
        "id" : 11,
        "title" : "100 Pack Stickers",
        "stars" : 5,
        "img" : [`${cloudFrontUrl}/100pc_sticker/100pc_main.webp`, `${cloudFrontUrl}/100pc_sticker/100pc_1.webp`, `${cloudFrontUrl}/100pc_sticker/100pc_2.webp`, `${cloudFrontUrl}/100pc_sticker/100pc_3.webp`],
        "price" : 14.99,
        "sale_price": 9.99,
        "url" : "100-pack-stickers",
        "description" : [
            
        "• A pack of 100 stickers containing various JDM cars to decorate your accessories.",         
        
        ],

        "specs": "Size: 4cm to 10cm\n Material: Vinyl, Eco-Friendly PVC",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Stickers",
    },
    {
        "id" : 13,
        "title" : "Nissan Skyline R34 GTR - 1/24",
        "stars" : 0,
        "img" : [`${cloudFrontUrl}/24r34_diecast/24r34_Blue.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_White.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_1.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_2.webp`,
        `${cloudFrontUrl}/24r34_diecast/24r34_3.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_4.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_5.webp`, `${cloudFrontUrl}/24r34_diecast/24r34_6.webp`,
        `${cloudFrontUrl}/24r34_diecast/24r34_7.webp`],
        "price" : 34.99,
        "sale_price": 29.99,
        "url" : "24-r34-diecast",
        "description" : [
            
        "• A well detailed 1/24 scaled version of the R34 GTR by Welly featuring doors and hood that can be opened.",         
        
        ],

        "specs": "Brand: Welly\n Scale: 1:24",
        "shipping": [shipping[0]],
        "variants" : [{"Select Color": ["Blue", "White"]}],
        "collection" : "Diecast Cars",
    },
    {
        "id" : 12,
        "title" : "Nissan Skyline R34 GTR - 1/36",
        "stars" : 5,
        "img" : [`${cloudFrontUrl}/36r34_diecast/36r34_main.webp`, `${cloudFrontUrl}/36r34_diecast/36r34_Blue.webp`, `${cloudFrontUrl}/36r34_diecast/36r34_Silver.webp`, `${cloudFrontUrl}/36r34_diecast/r36r34_Black.webp`],
        "price" : 19.99,
        "sale_price": 14.99,
        "url" : "36-r34-diecast",
        "description" : [
            
        "• Featuring the R34 GTR in Bayside Blue, Black, and Fast & Furious Silver with doors that can open.",         
        
        ],

        "specs": "Brand: Jackiekim \n Scale: 1:36",
        "shipping": [shipping[0]],
        "variants" : [{"Select Color": ["Blue", "Black", "Silver"]}],
        "collection" : "Diecast Cars",
    },
    {
        "id" : 7,
        "title" : "Gearbox Keychain",
        "stars" : 4.5,
        "img" : [`${cloudFrontUrl}/gearbox_keychain/gearbox_main.webp`, `${cloudFrontUrl}/gearbox_keychain/gearbox_1.webp`, `${cloudFrontUrl}/gearbox_keychain/gearbox_2.webp`],
        "price" : 12.99,
        "sale_price": 8.99,
        "url" : "gearbox-keychain",
        "description" : [
            
        "• A fun 6 speed gearbox keychain that you can fidgit with to mimic the gearbox of a real car.",         
        
        ],

        "specs": "Size: 2 inches on longest side\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",
    },
    {
        "id" : 8,
        "title" : "Suspension Keychain",
        "stars" : 5,
        "img" : [`${cloudFrontUrl}/suspension_keychain/suspension_main.webp`, `${cloudFrontUrl}/suspension_keychain/suspension_Blue.webp`, `${cloudFrontUrl}/suspension_keychain/suspension_Green.webp`, `${cloudFrontUrl}/suspension_keychain/suspension_Gold.webp`, `${cloudFrontUrl}/suspension_keychain/suspension_Red.webp`, `${cloudFrontUrl}/suspension_keychain/suspension_Black.webp`],
        "price" : 11.99,
        "sale_price": 7.99,
        "url" : "suspension-keychain",
        "description" : [
            
        "• An adjustable suspension keychain that can be pressed on its ends to engage the spring just like a real suspension.",         
        
        ],

        "specs": "Size: 74mm length\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants": [{"Select Colour": ["Blue", "Green", "Gold", "Red", "Black"]}],
        "collection" : "Keychains",
    },
    {
        "id" : 9,
        "title" : "TE37 Keychain",
        "stars" : 0,
        "img" : [`${cloudFrontUrl}/te37_keychain/te37_Black.webp`, `${cloudFrontUrl}/te37_keychain/te37_Chroma.webp`, `${cloudFrontUrl}/te37_keychain/te37_Silver.webp`, `${cloudFrontUrl}/te37_keychain/te37_1.webp`, `${cloudFrontUrl}/te37_keychain/te37_2.webp`, `${cloudFrontUrl}/te37_keychain/te37_3.webp`, `${cloudFrontUrl}/te37_keychain/te37_4.webp`],
        "price" : 11.99,
        "sale_price": 9.99,
        "url" : "te37-keychain",
        "description" : [
            
        "• Featuring the car community famous TE37 as a 3D miniature keychain designed as realistic as possible.",         
        
        ],

        "specs": "Size: 3.2cm rim diameter\n Material: Constructed of zinc alloy",
        "shipping": [shipping[0]],
        "variants" : [{"Select Color": ["Black", "Silver", "Chroma"]}],
        "collection" : "Keychains",
    },
    {
        "id" : 10,
        "title" : "GTR Keychain",
        "stars" : 4.5,
        "img" : [`${cloudFrontUrl}/gtr_keychain/gtr_main.webp`, `${cloudFrontUrl}/gtr_keychain/gtr_1.webp`, `${cloudFrontUrl}/gtr_keychain/gtr_2.webp`],
        "price" : 9.99,
        "sale_price": 4.99,
        "url" : "gtr-keychain",
        "description" : [
            
        "• A clean, simple, and classic GTR logo keychain for any GTR fan.",         
        
        ],

        "specs": "Size: 1.5 inches by 1.7 inches\n Material: Constructed of metal",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",
    },
    {
        "id" : 3,
        "title" : "R34 GTR Pin",
        "stars": 0,
        "img" : [`${cloudFrontUrl}/r34_pin/r34pin_main.webp`, `${cloudFrontUrl}/r34_pin/r34pin_1.webp`, `${cloudFrontUrl}/r34_pin/r34pin_2.webp`, `${cloudFrontUrl}/r34_pin/r34pin_3.webp`],
        "price" : 14.99,
        "sale_price": 9.99,
        "url" : "r34-gtr-pin",
        "description" : [
        
        "• A pin for all R34 GTR fans to bring the most out of their backpacks, hats, pin collections, and more!"],
        
        "specs": "Size: 1.5 in x 0.75 in\n Double Black Rubber Pin Clutch\n Soft Enamel Process\n Black Dyed Metal",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Pins",
    },
    {
        "id" : 4,
        "title" : "RB26 Keychain",
        "stars": 0,
        "img" : [`${cloudFrontUrl}/rb26_keychain/rb26_main.webp`],
        "price" : 9.99,
        "sale_price": 4.99,
        "url" : "rb26-keychain",
        "description" : [
            
        "• Based off the heart of Godzilla, the RB26! The RB26, inline 6 2.6L engine debuted in 1989 and contributed to motorsports history as it set records."],

        "specs": "Made of PVC material allowing for flexibility while retaining durability and quality.",
        "shipping": [shipping[0]],
        "variants" : [{}],
        "collection" : "Keychains",    
    },
]