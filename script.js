/* BIRTHDAY WISH GENERATOR - CONTROLLER */

// Shared State
let activeWish = "";
let lastInputs = null;
let savedWishes = [];

// Curated Template Wishes Database
const templateWishes = {
    short: [
        "Happy Birthday! Hope your day is filled with lots of love and laughter. 🎂",
        "Wishing you a wonderful birthday filled with sweet moments. Have a blast! 🎉",
        "Happy Birthday! Cheers to another great year of health, joy, and success. 🥂",
        "May this year bring you endless reasons to smile. Happy Birthday! 💫"
    ],
    emotional: [
        "Happy Birthday! I want you to know how much your presence means to me. Thank you for your warmth, your guidance, and for always being a light in my darkest days. May this year return all the love you give so selflessly. ❤️",
        "On this special day, I find myself reflecting on all the moments we've shared. You have a heart of gold, and I feel so lucky to have you in my life. Wishing you a birthday that's as beautiful as your soul. 🌸",
        "Happy Birthday to someone who has been a constant source of strength and comfort. Your kindness inspires me daily, and I hope this new chapter of your life brings you deep peace and ultimate happiness. 🌟"
    ],
    funny: [
        "Happy Birthday! Statistically, people who have more birthdays live longer. So here's to many more! 😂🎂",
        "Happy Birthday! Don't think of it as getting older, think of it as becoming a classic. Classic things are highly valuable! 🚗✨",
        "Congratulations on surviving another year! I think you deserve a medal, or at least a very large slice of cake. Have a great one! 🍰",
        "Happy Birthday! I'm so glad you were born. Otherwise, who would listen to my terrible jokes and laugh? Have an awesome day! 🎉"
    ],
    'best-friend': [
        "Happy Birthday to my absolute partner-in-crime! From late-night talks to crazy adventures, there's no one else I'd rather have by my side. Thank you for being the truest best friend. Let's celebrate you today! 🥳💖",
        "To my best friend: Happy Birthday! You know me better than anyone else and still choose to hang out with me. That's true friendship. Wishing you an incredible year ahead!",
        "Happy Birthday! You are more than a best friend—you are family. Here's to another year of creating unforgettable memories, laughing till our stomachs hurt, and supporting each other through it all. 🌟"
    ],
    family: [
        "Happy Birthday to the pillar of our family! Your love keeps us grounded, and your wisdom guides us. Wishing you a day filled with relaxation, comfort, and the warmth of family. 🏡❤️",
        "To my amazing sibling: Happy Birthday! Thank you for the shared memories, the childhood fights, and the unconditional support. You are truly one of a kind. Have a beautiful day!",
        "Happy Birthday! Sending you warmest hugs and wishes. Family is everything, and having you as a part of my life is the greatest gift of all. May your day be spectacular!"
    ],
    professional: [
        "Wishing you a very happy birthday! It is a true pleasure working alongside you. May this year bring you exciting new professional milestones, happiness, and excellent health. 💼📈",
        "Happy Birthday! On behalf of the team, we wish you a wonderful day. Thank you for your hard work, dedication, and positive energy in the workplace. Have a great celebration!",
        "Wishing you a successful and rewarding year ahead. Happy Birthday! Hope you get some well-deserved rest and celebrate with your loved ones today."
    ],
    bengali: [
        "শুভ জন্মদিন! আশা করি আজকের এই বিশেষ দিনটি তোমার জীবনে অনেক সুখ ও আনন্দ বয়ে নিয়ে আসবে। খুব ভালো কাটাও দিনটি! 🎂🌸",
        "জন্মদিনের অনেক অনেক শুভেচ্ছা ও শুভকামনা! তোমার আগামী দিনগুলো যেন হাসিখুশি, সুস্থতা আর সাফল্যে ভরে ওঠে। 🌟😊",
        "প্রিয় বন্ধু, শুভ জন্মদিন! সবসময় পাশে থাকার জন্য ধন্যবাদ। আজকের দিনটি তোমার দারুণ কাটুক, পার্টি কবে দিচ্ছো জানাও! 🥳🎉",
        "আপনার জন্মদিনে জানাই আন্তরিক শ্রদ্ধা ও শুভেচ্ছা। আপনার সুস্বাস্থ্য, দীর্ঘায়ু এবং সর্বাঙ্গীণ সাফল্য কামনা করি। 💖"
    ]
};

// Advanced Client-Side Generator Engine (Loveable AI Simulation)
const wishGeneratorEngine = {
    // English templates
    en: {
        openings: {
            friend: (name) => `Happy Birthday, ${name}! `,
            'best friend': (name) => `Happy Birthday to my absolute best friend, ${name}! `,
            brother: (name) => `Happy Birthday, bro! To the best brother ever, ${name} - `,
            sister: (name) => `Happy Birthday, sis! To my wonderful sister, ${name} - `,
            parent: (name) => `Happy Birthday, ${name}! Sending you all my love on your special day. `,
            partner: (name) => `Happy Birthday to my love, ${name}! `,
            colleague: (name) => `Dear ${name}, wishing you a very Happy Birthday! `,
            teacher: (name) => `Dear Teacher ${name}, wishing you a wonderful birthday celebration! `,
            other: (name) => `Happy Birthday, ${name}! `
        },
        bodies: {
            sweet: {
                friend: "May your day be filled with sweet surprises, bright smiles, and beautiful memories. You deserve all the joy in the world.",
                'best friend': "You bring so much sweetness and light into my life. I hope your day is as lovely and wonderful as your heart is.",
                brother: "I hope your day is filled with everything that makes you happy. You've always been so sweet and supportive of me.",
                sister: "Wishing you a magical day filled with joy, laughter, and endless sweet moments. You're the best sister anyone could ask for.",
                parent: "Thank you for your warmth, your guidance, and your sweet love that keeps our family together. Wishing you relaxation and happiness today.",
                partner: "Every moment with you is sweet. I hope today brings you as much happiness as you bring to my heart every single day.",
                colleague: "Wishing you a warm and pleasant celebration. It is always a sweet experience collaborating and working with you.",
                teacher: "Thank you for your patience and sweet encouragement. May your day be filled with the respect and joy you bring to your students.",
                other: "May this day bring a smile to your face and fill your heart with sweet moments that last all year long."
            },
            emotional: {
                friend: "Looking back at our journey, I'm so grateful for your friendship. You've been there for me through thick and thin, and I cherish you deeply.",
                'best friend': "You are my rock, my confidant, and the family I chose. I honestly don't know what I'd do without you. Your presence is a true blessing.",
                brother: "We've shared so many childhood memories and life struggles. Having you as a brother is a source of strength that I value more than words can say.",
                sister: "From sharing secrets to navigating life's ups and downs, you are my constant support. You hold a very special place in my heart, always.",
                parent: "Your endless sacrifices and unconditional love have shaped who I am today. I hope I can make you even half as proud as I am to be your child.",
                partner: "You are my home, my anchor, and my soulmate. Loving you is the easiest and most beautiful thing I have ever done. Happy Birthday, my whole heart.",
                colleague: "I truly appreciate your support and friendship in the workplace. Working with you has been a significant and meaningful part of my professional journey.",
                teacher: "You didn't just teach subjects; you taught life lessons. Your wisdom has touched my life in ways I can never fully express. Thank you.",
                other: "On your special day, I hope you realize how deeply loved and appreciated you are. You make the world a warmer place just by being in it."
            },
            funny: {
                friend: "Another year older, but definitely not wiser! Let's eat too much cake and pretend we still know how to party like youngsters.",
                'best friend': "Happy Birthday! I'm so glad we're best friends. Who else would tolerate my weirdness and still call me normal? Let's get wild!",
                brother: "Happy Birthday! Remember, you might be older now, but I will always be the better-looking and smarter sibling. Deal with it!",
                sister: "Happy Birthday! I was going to get you a expensive gift, but then I remembered having me as a sister is already the greatest gift of all.",
                parent: "Happy Birthday! Thanks for passing down your amazing genes—and your slightly questionable sense of humor. Don't count the candles!",
                partner: "Happy Birthday to my favorite person! I love you even when you steal the blanket and leave empty milk cartons in the fridge.",
                colleague: "Happy Birthday! I hope you have a great day, and more importantly, I hope there is free cake in the office breakroom today.",
                teacher: "Happy Birthday, teacher! We promise to behave extra well today... or at least try not to fall asleep during lectures.",
                other: "Happy Birthday! Don't think of it as getting older—think of it as upgrading to a newer, more seasoned version of yourself."
            },
            heartfelt: {
                friend: "Wishing you a birthday filled with love, laughter, and genuine happiness. Thank you for being such a wonderful and reliable friend.",
                'best friend': "You have a rare, beautiful soul. Thank you for listening without judgment, laughing with me, and always holding my hand. I wish you the best.",
                brother: "I am incredibly lucky to have you. You've always had my back, and I want you to know I'll always have yours. Have an amazing birthday.",
                sister: "You are my best friend and sister combined. I wish you a year ahead filled with peace, opportunities, and beautiful adventures.",
                parent: "May your day be filled with the peace and joy you deserve. You've given us everything, and today we celebrate you with all our hearts.",
                partner: "Wishing you a lifetime of joy and success. You make every day brighter, and I'm so grateful to walk this life beside you.",
                colleague: "Wishing you a wonderful birthday. Your dedication, helpful attitude, and integrity are truly appreciated by everyone on the team.",
                teacher: "Thank you for dedicating your time to guide us. Your mentorship has been invaluable, and we wish you a long, healthy, and happy life.",
                other: "May this birthday bring you closer to all your dreams, and may you be surrounded by people who cherish you as much as I do."
            },
            formal: {
                friend: "May your birthday bring you happiness and prosperity. I wish you all the best in your personal and professional endeavors.",
                'best friend': "I wish you a very happy birthday. May this year be characterized by peace of mind, good health, and significant accomplishments.",
                brother: "On your birthday, I wish you success, good health, and stable progress in all aspects of your life. Have a pleasant celebration.",
                sister: "Wishing you a highly successful and healthy year ahead. May all your goals and ambitions be realized. Happy Birthday.",
                parent: "Wishing you a peaceful and respected birthday. Your guidance remains our family's greatest asset. May you enjoy excellent health.",
                partner: "Wishing you a joyful and prosperous birthday. I hope this year brings you abundant happiness, health, and fulfillment.",
                colleague: "Wishing you a very happy birthday and continued success in your career. It is a privilege to work with you on our team.",
                teacher: "On this occasion of your birthday, I would like to express my gratitude for your instruction. Wishing you peace, health, and happiness.",
                other: "May this day mark the start of a year filled with good health, happiness, and success. Happy Birthday."
            },
            short: {
                friend: "Hope your day is packed with fun and cake! Have an awesome birthday!",
                'best friend': "Wishing you the absolute best birthday ever! Cheers to you!",
                brother: "Hope your birthday is epic, bro! Have a great one!",
                sister: "Happy Birthday! Wishing you lots of love, smiles, and cake today!",
                parent: "Wishing you a beautiful and relaxing birthday. Love you always!",
                partner: "Happy Birthday, sweetheart! Hope your day is as special as you are!",
                colleague: "Wishing you a wonderful birthday celebration. Have a great day!",
                teacher: "Wishing you a happy and peaceful birthday. Thank you, teacher!",
                other: "Wishing you a very happy birthday! Hope you have a wonderful day!"
            }
        },
        closings: [
            " Cheers to another amazing year! 🥂",
            " Have an unforgettable celebration! 🎉",
            " Sending you warm hugs and positive vibes! 💖",
            " Enjoy every single moment of your day! ⭐",
            " Best wishes,"
        ]
    },

    // Bengali templates
    bn: {
        openings: {
            friend: (name) => `শুভ জন্মদিন, ${name}! `,
            'best friend': (name) => `আমার প্রিয় বন্ধু ${name}, তোমাকে জন্মদিনের অনেক শুভেচ্ছা! `,
            brother: (name) => `শুভ জন্মদিন ভাইয়া! প্রিয় ${name}, `,
            sister: (name) => `শুভ জন্মদিন আপু! প্রিয় ${name}, `,
            parent: (name) => `শুভ জন্মদিন, ${name}! জন্মদিনের এই বিশেষ ক্ষণে আমার ভালোবাসা নিও। `,
            partner: (name) => `শুভ জন্মদিন আমার ভালোবাসা, ${name}! `,
            colleague: (name) => `প্রিয় ${name}, আপনাকে জন্মদিনের আন্তরিক শুভেচ্ছা! `,
            teacher: (name) => `শ্রদ্ধেয় শিক্ষক ${name}, আপনাকে জন্মদিনের ভক্তিপূর্ণ শুভেচ্ছা! `,
            other: (name) => `শুভ জন্মদিন, ${name}! `
        },
        bodies: {
            sweet: {
                friend: "তোমার এই বিশেষ দিনটি যেন তোমার মতোই মিষ্টি ও আনন্দময় হয়। তোমার জীবন সুন্দর মুহূর্তে ভরে উঠুক।",
                'best friend': "তোমার সাথে বন্ধুত্ব আমার জীবনের অন্যতম মিষ্টি একটি বিষয়। প্রার্থনা করি তোমার সব স্বপ্ন সত্যি হোক।",
                brother: "আজকের দিনটি যেন তোমার সব পছন্দের জিনিসে ভরে ওঠে। তোমার জীবন যেন অনেক সুন্দর হয়।",
                sister: "তোমার সুন্দর হাসির মতো তোমার এই জন্মদিনটিও মিষ্টি ও সুন্দর হোক। অনেক ভালো কাটো দিনটি!",
                parent: "তোমার স্নেহ আর ভালোবাসা আমাদের পরিবারকে আগলে রেখেছে। আজকের দিনটি তোমার অনেক শান্তিতে কাটুক।",
                partner: "তোমার সাথে কাটানো প্রতিটি মুহূর্ত আমার কাছে অনেক মিষ্টি ও স্পেশাল। আজকের দিনটি তোমার চমৎকার কাটুক।",
                colleague: "আপনার সাথে কাজ করার অভিজ্ঞতা দারুণ। আশা করি আজকের দিনটি আপনার অনেক আনন্দের হবে।",
                teacher: "আপনার মিষ্টি ব্যবহার ও ধৈর্য আমাদের অনুপ্রাণিত করে। জন্মদিনে আপনার সুস্বাস্থ্য ও দীর্ঘায়ু কামনা করি।",
                other: "তোমার মুখে সবসময় যেন এই মিষ্টি হাসিটা লেগে থাকে। আগামী দিনগুলো অনেক সুখের হোক।"
            },
            emotional: {
                friend: "জীবনের চড়াই-উতরাইয়ে তোমার মতো একজন বন্ধু পাশে পাওয়া ভাগ্যের ব্যাপার। আমার জীবনে তোমার ভূমিকা অনেক গভীর।",
                'best friend': "তুমি শুধু আমার বন্ধুই নও, আমার সুখ-দুঃখের আশ্রয়। তোমার সাথে কাটানো প্রতিটি স্মৃতি আমার হৃদয়ে জমা থাকবে চিরকাল।",
                brother: "শৈশবের খুনসুটি থেকে শুরু করে আজ পর্যন্ত তুমি আমার বড় শক্তি। তুমি ছাড়া আমার জীবন অসম্পূর্ণ।",
                sister: "তোমার সাথে সব কথা শেয়ার করা, বিপদে পাশে পাওয়া—তুমি আমার বোন ও সেরা বন্ধুই। তোমার জন্য অনেক আবেগ ও ভালোবাসা রইল।",
                parent: "তোমার অবদান আর ত্যাগের ঋণ কোনোদিন শোধ করতে পারব না। তোমার সন্তান হতে পেরে আমি সত্যিই গর্বিত।",
                partner: "তুমি আমার জীবনের সেই নোঙর যা আমাকে শান্ত রাখে। তোমাকে ভালোবাসতে পারা আমার জীবনের সবচেয়ে বড় প্রাপ্তি।",
                colleague: "কর্মক্ষেত্রে আপনার সহযোগিতা ও অনুপ্রেরণা আমার কর্মজীবনকে সমৃদ্ধ করেছে। আপনার প্রতি আমি আন্তরিকভাবে কৃতজ্ঞ।",
                teacher: "আপনি কেবল বইয়ের শিক্ষাই দেননি, আমাদের জীবন গড়তে শিখিয়েছেন। আপনার আদর্শ আমার জীবনে চিরকাল প্রেরণা হয়ে থাকবে।",
                other: "তুমি অনেক মানুষের মুখে হাসি ফোটাও। প্রার্থনা করি সৃষ্টিকর্তা যেন তোমাকে সবসময় ভালো ও শান্তিতে রাখেন।"
            },
            funny: {
                friend: "বয়স তো আরেক বছর বেড়ে গেল, এবার অন্তত একটু বুদ্ধি বাড়ুক! পার্টি কবে দিচ্ছো তাড়াতাড়ি জানাও!",
                'best friend': "শুভ জন্মদিন! আমার পাগলামি সহ্য করার জন্য তোমাকে একটা মেডেল দেওয়া উচিত। যাই হোক, আজকে বেশি করে কেক খাবো!",
                brother: "শুভ জন্মদিন ভাই! বয়স যত বাড়ছে, তুমি কিন্তু ততই বুড়ো হচ্ছো। যদিও দেখতে আমার চেয়ে একটু খারাপই লাগে!",
                sister: "শুভ জন্মদিন আপু! আজকে বেশি ঝগড়া করব না, কারণ আজকে তোমার দিন। তবে কাল থেকে আবার শুরু হবে!",
                parent: "শুভ জন্মদিন! বয়স নিয়ে চিন্তা করো না, মোমবাতি বেশি হলে কেকের সাইজ বড় করে নিলেই হবে!",
                partner: "শুভ জন্মদিন! আমি তোমাকে তখনও ভালোবাসব যখন তোমার মাথায় একটাও চুল থাকবে না বা সব দাঁত পড়ে যাবে!",
                colleague: "শুভ জন্মদিন! আশা করি আজকে কাজ কম হবে আর অফিসে ফ্রিতে ভালো কেক খাওয়া যাবে!",
                teacher: "শুভ জন্মদিন স্যার! আজকের দিনে আমাদের হোমওয়ার্ক না দিলেই সবচেয়ে বড় উপহার দেওয়া হতো!",
                other: "শুভ জন্মদিন! বয়স বাড়লে কি হবে, মনে মনে তো তুমি এখনো সেই ১৮ বছরের বাচ্চার মতোই আছো!"
            },
            heartfelt: {
                friend: "তোমার জন্মদিনটি অনেক আনন্দে কাটুক। সবসময় পাশে থাকার জন্য তোমাকে অনেক অনেক ধন্যবাদ ও শুভকামনা।",
                'best friend': "তোমার মতো খাঁটি মনের মানুষ আজকাল মেলা ভার। আজকের দিনে তোমার জীবনের সব সুখ ও শান্তি কামনা করি।",
                brother: "তুমি সবসময় আমার পাশে বটবৃক্ষের মতো ছায়া দিয়েছো। তোমার উজ্জ্বল ভবিষ্যৎ ও ভালো স্বাস্থ্য কামনা করি।",
                sister: "তুমি আমার বোন ও পথপ্রদর্শক। তোমার আগামী দিনগুলো যেন নতুন সুযোগ ও আনন্দে ভরে ওঠে, এই কামনাই করি।",
                parent: "তোমার এই শুভ জন্মদিনে আমার অন্তরের গভীর থেকে শ্রদ্ধা ও ভালোবাসা। সৃষ্টিকর্তা তোমাকে দীর্ঘজীবী করুন।",
                partner: "আমার জীবনে আলো এনে দেওয়ার জন্য তোমাকে ধন্যবাদ। আজকের দিনটি তোমার অনেক সুন্দর ও সার্থক হোক।",
                colleague: "আপনার এই শুভ জন্মদিনে সুস্বাস্থ্য ও আনন্দময় জীবন কামনা করি। আপনার কর্মজীবন আরও সফল হোক।",
                teacher: "আমাদের পথ দেখানোর জন্য আপনার প্রতি কৃতজ্ঞতা। আপনার জীবনের প্রতিটি দিন যেন শান্তিময় ও সুন্দর হয়।",
                other: "তোমার জীবনের সকল নেতিবাচকতা দূর হয়ে যাক, আর চারিদিক যেন খুশি আর সাফল্যে ভরে ওঠে।"
            },
            formal: {
                friend: "আপনার জন্মদিনে আন্তরিক অভিনন্দন ও শুভেচ্ছা। আপনার সর্বাঙ্গীন সাফল্য ও মঙ্গল কামনা করি।",
                'best friend': "আপনার শুভ জন্মদিনে আমার পক্ষ থেকে শুভেচ্ছা গ্রহণ করুন। আপনার আগামী বছরটি আনন্দময় হোক।",
                brother: "আপনার এই জন্মদিনে আপনার পেশাগত ও ব্যক্তিগত জীবনের সাফল্য কামনা করি। দিনটি সুন্দরভাবে উদযাপিত হোক।",
                sister: "জন্মদিন উপলক্ষে আপনাকে শুভকামনা জানাচ্ছি। আপনার স্বাস্থ্য ও সার্বিক সমৃদ্ধি কামনা করি।",
                parent: "আপনার জন্মদিনে আমাদের পরম শ্রদ্ধা ও শুভকামনা। আপনার সুস্থতা এবং দীর্ঘায়ু আমাদের একমাত্র প্রার্থনা।",
                partner: "আপনার শুভ জন্মদিনে আমার আন্তরিক শুভেচ্ছা রইল। আপনার আগামী পথচলা সুগম ও সাফল্যমণ্ডিত হোক।",
                colleague: "জন্মদিন উপলক্ষে আপনাকে অনেক শুভেচ্ছা। আমাদের সাথে আপনার কাজের সম্পর্ক আরও দৃঢ় ও ফলপ্রসূ হোক।",
                teacher: "শ্রদ্ধেয় শিক্ষক, আপনার জন্মদিনে আমার বিনম্র শ্রদ্ধা। আপনার দীর্ঘায়ু ও নিরাময় জীবন কামনা করি।",
                other: "আপনার শুভ জন্মদিনে আন্তরিক মঙ্গলকামনা রইল। আপনার দিনটি আনন্দদায়ক হোক।"
            },
            short: {
                friend: "জন্মদিনের অনেক অনেক শুভেচ্ছা ও ভালোবাসা! খুব মজা করো আজকের দিনে!",
                'best friend': "শুভ জন্মদিন বন্ধু! আজকের দিনটি অনেক ভালো কাটুক তোমার!",
                brother: "শুভ জন্মদিন ভাইয়া! অনেক আনন্দ করো আজকের দিনে!",
                sister: "শুভ জন্মদিন আপু! দিনটি কেক আর মজায় কাটুক!",
                parent: "শুভ জন্মদিন! সবসময় ভালো ও হাসিখুশি থাকো এই প্রার্থনাই করি।",
                partner: "শুভ জন্মদিন প্রিয়! আমার জীবনের শ্রেষ্ঠ উপহার তুমি!",
                colleague: "আপনাকে জন্মদিনের শুভেচ্ছা ও শুভকামনা। দিনটি ভালো কাটুক!",
                teacher: "শুভ জন্মদিন স্যার/ম্যাডাম। আপনার সুস্বাস্থ্য কামনা করি।",
                other: "শুভ জন্মদিন! আপনার দিনটি অনেক ভালো ও আনন্দের কাটুক!"
            }
        },
        closings: [
            " দিনটি দারুণভাবে উদযাপিত হোক! 🎂",
            " আগামী দিনগুলো অনেক সুন্দর কাটুক। 🌟",
            " অনেক অনেক শুভকামনা রইল। 💖",
            " শুভ জন্মদিন!",
            " অনেক ভালোবাসা সহ,"
        ]
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadSavedWishes();
    setupNavigation();
    setupTemplates();
    
    // Check if system share is supported
    if (!navigator.share) {
        const shareBtn = document.getElementById('system-share-btn');
        if (shareBtn) shareBtn.classList.add('hidden');
    }
});

/* =========================================================================
   SPA VIEW SWITCHER
   ========================================================================= */

function setupNavigation() {
    // Top Tabs Event Listeners
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-target');
            switchView(target);
        });
    });

    // Mobile Bottom Nav Event Listeners
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            switchView(target);
        });
    });
}

function switchView(viewId) {
    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show active view
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active state in Desktop Nav
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.getAttribute('data-target') === viewId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update active state in Mobile Nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        if (btn.getAttribute('data-target') === viewId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Special view triggers
    if (viewId === 'saved-view') {
        renderSavedWishes();
    }
}


/* =========================================================================
   WISH GENERATOR CONTROLLER
   ========================================================================= */

function handleGenerate(e) {
    e.preventDefault();

    const name = document.getElementById('recipient-name').value.trim();
    const relation = document.getElementById('recipient-relation').value;
    const tone = document.getElementById('wish-tone').value;
    const lang = document.getElementById('wish-lang').value;
    const detail = document.getElementById('wish-detail').value.trim();

    if (!name || !relation || !tone || !lang) {
        showToast("Please fill all required fields!");
        return;
    }

    // Save inputs for "Generate Again" trigger
    lastInputs = { name, relation, tone, lang, detail };

    // Generate Wish
    activeWish = generateWishText(name, relation, tone, lang, detail);

    // Populate and show Card
    const resultSection = document.getElementById('generated-result-section');
    const wishOutput = document.getElementById('wish-output');
    const saveBtn = document.getElementById('save-card-btn');

    // Reset Save Button text/icon
    saveBtn.innerHTML = `<span class="btn-icon">⭐</span> <span class="btn-text">Save Favorite</span>`;
    saveBtn.removeAttribute('disabled');

    wishOutput.value = activeWish;
    wishOutput.setAttribute('readonly', 'true');
    document.getElementById('edit-toggle-btn').textContent = "✏️ Edit Wish";

    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate the customizable template-based wish
function generateWishText(name, relation, tone, lang, detail) {
    const db = wishGeneratorEngine[lang];
    if (!db) return "";

    const opening = db.openings[relation] ? db.openings[relation](name) : db.openings.other(name);
    const body = db.bodies[tone][relation] ? db.bodies[tone][relation] : db.bodies[tone].other;
    
    // Inject detail into message naturally if present
    let detailClause = "";
    if (detail) {
        const detailText = detail.toLowerCase();
        if (lang === 'bn') {
            detailClause = ` আশা করি তোমার এই বিশেষ দিনটিতে তুমি ${detail} দিয়ে দারুণ ও স্মরণীয় কিছু মুহূর্ত কাটাবে!`;
        } else {
            detailClause = ` Knowing how much you enjoy ${detailText}, I truly hope your special day gives you plenty of time to celebrate that!`;
        }
    }

    const closings = db.closings;
    const closing = closings[Math.floor(Math.random() * closings.length)];

    return `${opening}\n\n${body}${detailClause}\n\n${closing}`;
}

// Edit Toggle function
function toggleEditWish() {
    const textarea = document.getElementById('wish-output');
    const editBtn = document.getElementById('edit-toggle-btn');

    if (textarea.hasAttribute('readonly')) {
        // Switch to EDIT mode
        textarea.removeAttribute('readonly');
        textarea.focus();
        editBtn.textContent = "💾 Save Changes";
        showToast("You can now edit the card text!");
    } else {
        // Switch to READONLY mode (Save changes)
        textarea.setAttribute('readonly', 'true');
        activeWish = textarea.value;
        editBtn.textContent = "✏️ Edit Wish";
        showToast("Changes saved inside card!");
    }
}

// Copy Action
function copyActiveWish() {
    const text = document.getElementById('wish-output').value;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Wish copied to clipboard! 📋");
    }).catch(err => {
        showToast("Failed to copy text.");
    });
}

// Regenerate Trigger
function regenerateActiveWish() {
    if (!lastInputs) return;
    
    // Generate new random ending/combination
    activeWish = generateWishText(
        lastInputs.name, 
        lastInputs.relation, 
        lastInputs.tone, 
        lastInputs.lang, 
        lastInputs.detail
    );

    const wishOutput = document.getElementById('wish-output');
    wishOutput.value = activeWish;
    wishOutput.setAttribute('readonly', 'true');
    document.getElementById('edit-toggle-btn').textContent = "✏️ Edit Wish";
    
    // Reset Save Button
    const saveBtn = document.getElementById('save-card-btn');
    saveBtn.innerHTML = `<span class="btn-icon">⭐</span> <span class="btn-text">Save Favorite</span>`;
    saveBtn.removeAttribute('disabled');

    showToast("Regenerated new wish variation! ✨");
}


/* =========================================================================
   TEMPLATES VIEW
   ========================================================================= */

function setupTemplates() {
    // Add Event Listeners for category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-category');
            renderCategoryTemplates(category);
        });
    });

    // Render default category
    renderCategoryTemplates('short');
}

function renderCategoryTemplates(category) {
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = "";

    const wishes = templateWishes[category] || [];
    wishes.forEach(text => {
        const card = document.createElement('div');
        card.className = 'template-card';

        card.innerHTML = `
            <p class="card-text">${text}</p>
            <div class="template-card-footer">
                <button class="card-icon-btn" onclick="copyTemplateText(this)" title="Copy text">📋</button>
                <button class="card-icon-btn" onclick="openShareModalDirect(\`${text.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)" title="Share wish">📤</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function copyTemplateText(btn) {
    const text = btn.parentElement.previousElementSibling.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied template text! 📋");
    });
}


/* =========================================================================
   SAVED / FAVORITES VIEW (LocalStorage)
   ========================================================================= */

function loadSavedWishes() {
    try {
        const stored = localStorage.getItem('saved_birthday_wishes');
        savedWishes = stored ? JSON.parse(stored) : [];
        updateSavedBadges();
    } catch (e) {
        savedWishes = [];
    }
}

function saveActiveWish() {
    const text = document.getElementById('wish-output').value.trim();
    if (!text) return;

    if (savedWishes.includes(text)) {
        showToast("This wish is already in your Saved folder! 💖");
        return;
    }

    savedWishes.push(text);
    localStorage.setItem('saved_birthday_wishes', JSON.stringify(savedWishes));
    updateSavedBadges();

    // Update Save button style to disabled / saved state
    const saveBtn = document.getElementById('save-card-btn');
    saveBtn.innerHTML = `<span class="btn-icon">💖</span> <span class="btn-text">Saved</span>`;
    saveBtn.setAttribute('disabled', 'true');

    showToast("Added to Saved Wishes! 💖");
}

function renderSavedWishes() {
    const grid = document.getElementById('saved-wishes-grid');
    const emptyState = document.getElementById('saved-empty-state');

    grid.innerHTML = "";

    if (savedWishes.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        savedWishes.forEach((text, index) => {
            const card = document.createElement('div');
            card.className = 'saved-card';

            card.innerHTML = `
                <p class="card-text">${text}</p>
                <div class="saved-card-footer">
                    <button class="card-icon-btn delete-btn" onclick="deleteSavedWish(${index})" title="Delete wish">🗑️</button>
                    <button class="card-icon-btn" onclick="copySavedTextDirect(\`${text.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)" title="Copy text">📋</button>
                    <button class="card-icon-btn" onclick="openShareModalDirect(\`${text.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)" title="Share wish">📤</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function deleteSavedWish(index) {
    savedWishes.splice(index, 1);
    localStorage.setItem('saved_birthday_wishes', JSON.stringify(savedWishes));
    updateSavedBadges();
    renderSavedWishes();
    showToast("Wish deleted from Saved! 🗑️");
}

function copySavedTextDirect(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied wish text! 📋");
    });
}

function updateSavedBadges() {
    const count = savedWishes.length;
    
    // Desktop badge count
    document.querySelectorAll('.saved-count').forEach(el => {
        el.textContent = count;
    });

    // Mobile nav badge
    const mobileBadge = document.querySelector('.mobile-badge');
    if (mobileBadge) {
        mobileBadge.textContent = count;
        if (count > 0) {
            mobileBadge.classList.remove('hidden');
        } else {
            mobileBadge.classList.add('hidden');
        }
    }
}


/* =========================================================================
   SHARING SYSTEMS
   ========================================================================= */

let currentShareText = "";

function openShareModal() {
    const text = document.getElementById('wish-output').value.trim();
    if (!text) return;

    currentShareText = text;
    document.getElementById('share-preview').textContent = text;
    document.getElementById('share-modal').classList.remove('hidden');
}

function openShareModalDirect(text) {
    currentShareText = text;
    document.getElementById('share-preview').textContent = text;
    document.getElementById('share-modal').classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
}

function shareToWhatsApp() {
    const encoded = encodeURIComponent(currentShareText);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
}

function shareToFacebook() {
    // Direct text sharing in FB feed requires FB SDK or custom page link. 
    // Fallback creates custom card URL, or open FB sharing dialog. We will copy & trigger fb.com
    navigator.clipboard.writeText(currentShareText).then(() => {
        showToast("Copied to clipboard! Opening Facebook...");
        setTimeout(() => {
            window.open('https://www.facebook.com/', '_blank');
        }, 1200);
    });
}

function shareNative() {
    if (navigator.share) {
        navigator.share({
            title: 'Birthday Wish',
            text: currentShareText
        }).then(() => {
            showToast("Shared successfully!");
            closeShareModal();
        }).catch(err => {
            console.log("Error sharing", err);
        });
    }
}

function copySharedText() {
    navigator.clipboard.writeText(currentShareText).then(() => {
        showToast("Copied to clipboard! 📋");
    });
}


/* =========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================= */

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    // Auto-destroy after transition ends (2.3s matches animation)
    setTimeout(() => {
        toast.remove();
    }, 2300);
}
