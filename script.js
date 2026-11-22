/* Cardistry: client-side greeting card composition and recipient experience. */

const starter = {
    occasion: 'birthday', customOccasion: '', kicker: 'A NOTE FOR A DAY WORTH KEEPING', recipient: '', sender: '', relationship: 'friend',
    profile: 'sincere', language: 'en', intensity: 38, pacing: 55, memory: '', signoff: '',
    ps: '', wish: '', variation: -1, theme: 'velvet', layout: 'editorial', pattern: 'glow', frame: 'editorial', experience: 'envelope', inviteMessage: '', frameThickness: 2,
    cornerRadius: 4, accent: '#ad8752', accentOverride: false, font: 'serif', emblem: '♥', sealColor: '#a85b59',
    backgroundColor: '#f7f0e2', backgroundOverride: false, photoData: '', photoEnabled: false, photoFrame: 'polaroid',
    modules: { teaser: false, memory: false, typewriter: false, moment: false, scratch: false, audio: false },
    teaser: '', memoryCaption: '', memoryDate: '', memoryBadge: '✳', secret: '', audioUrl: '',
    audioData: '', effects: true, chime: false,
    gate: { mode: 'instant', prompt: '', answer: '', question1: '', answer1: '', question2: '', answer2: '', unlockAt: '' },
    qrFrame: 'gold'
};
const bengaliOccasionNames = {
    birthday: 'জন্মদিন', eid: 'ঈদ', festive: 'উৎসব', wedding: 'বিবাহ',
    anniversary: 'বিবাহবার্ষিকী', thankyou: 'কৃতজ্ঞতা', apology: 'ক্ষমা প্রার্থনা',
    thinking: 'তোমার কথা মনে পড়ছে', milestone: 'অর্জন', custom: 'বিশেষ দিন'
};

const occasionDefaults = {
    birthday: { theme: 'velvet', layout: 'playful', pattern: 'dots', frame: 'editorial', emblem: '✦', kicker: 'A NOTE FOR A DAY WORTH KEEPING' },
    eid: { theme: 'emerald', layout: 'festive', pattern: 'waves', frame: 'botanical', emblem: '☾', kicker: 'EID MUBARAK' },
    festive: { theme: 'vermilion', layout: 'festive', pattern: 'dots', frame: 'botanical', emblem: '❀', kicker: 'A SEASON TO GATHER' },
    wedding: { theme: 'ivory', layout: 'polaroid', pattern: 'glow', frame: 'arch', emblem: '○', kicker: 'WITH EVERY GOOD WISH' },
    anniversary: { theme: 'ivory', layout: 'postcard', pattern: 'waves', frame: 'double', emblem: '♥', kicker: 'A LIFE, STILL UNFOLDING' },
    thankyou: { theme: 'emerald', layout: 'editorial', pattern: 'grid', frame: 'editorial', emblem: '✦', kicker: 'WITH GRATITUDE' },
    apology: { theme: 'ivory', layout: 'gallery', pattern: 'glow', frame: 'gallery', emblem: '❀', kicker: 'A NOTE, FROM THE HEART' },
    thinking: { theme: 'nordic', layout: 'postcard', pattern: 'dots', frame: 'arch', emblem: '✧', kicker: 'A NOTE FROM AFAR' },
    milestone: { theme: 'twilight', layout: 'gallery', pattern: 'grid', frame: 'gallery', emblem: '✦', kicker: 'A MOMENT WELL EARNED' },
    custom: { theme: 'nordic', layout: 'editorial', pattern: 'waves', frame: 'editorial', emblem: '✳', kicker: 'A DAY WORTH MARKING' }
};

const occasionNames = {
    birthday: 'Birthday', eid: 'Eid Mubarak', festive: 'Puja / Festive', wedding: 'Wedding & Nikah',
    anniversary: 'Anniversary', thankyou: 'Thank you', apology: 'Apology', thinking: 'Missing you',
    milestone: 'Milestone / Achievement', custom: 'Custom occasion'
};

const themeNames = {
    velvet: 'Warm Ivory & Antique Gold', ivory: 'Blush Rose & Pearl', emerald: 'Sage & Cream Stationery',
    vermilion: 'Warm Terracotta & Sand', nordic: 'Soft Lavender & Moonlight', twilight: 'Starry Twilight'
};

const library = {
    birthday: {
        sincere: ['The best thing about another year is seeing the person you continue to become. I’m glad to know you, in every season.', 'Your presence has a way of making ordinary days feel considered. I hope today returns some of that quiet goodness to you.'],
        literary: ['Time leaves its marks gently when a life is well lived. Here’s to the chapters still taking shape, and to the good company along the way.', 'A birthday is a small bookmark in a much longer story. I hope this next page feels like yours.'],
        wit: ['You have completed another orbit with most of your original opinions intact. That seems worth a proper dinner.', 'The calendar insists on keeping count. We can ignore the number and focus on the cake.'],
        playful: ['Another year, and still a better use of everyone’s time than most group chats. I hope the cake is excellent.', 'Today’s agenda: good food, good company, and absolutely no serious discussion of the number.'],
        letter: ['I wanted to write, rather than send another passing message, and say how much I value having you in my life. May the day be unhurried and the year ahead generous.', 'On this day, I find myself grateful for the conversations, the silences, and the many ways you make a place feel like home.'],
        formal: ['Please accept my warm wishes on your birthday. I hope the year ahead brings good health, meaningful work, and time with those you value.', 'With sincere good wishes on your birthday, and for a year ahead marked by contentment, good company, and worthwhile pursuits.'],
        short: ['Glad you’re here. Glad we know each other.', 'For the person you are, and the years still becoming.']
    },
    eid: {
        sincere: ['May this Eid bring a little more ease to your days and good company to your table. I’m thinking of you and wishing you peace.', 'Wishing you a gentle, generous Eid, with time for the people and rituals that make it feel like home.'],
        literary: ['May the crescent mark a season of returning—to familiar tables, open doors, and the quiet abundance of being together.', 'There is a particular light to a home prepared for guests. May some of it stay with you long after Eid.'],
        wit: ['May the visits be warm, the food excellent, and the question about when you’ll eat just one more thing remain rhetorical.', 'Wishing you an Eid with full plates, familiar stories, and no need to explain your second dessert.'],
        playful: ['May the day hold excellent company, a table worth lingering over, and at least one dessert nobody asks you to share.', 'Wishing you a generous Eid and a peaceful route between every invitation and every meal.'],
        letter: ['As Eid arrives, I wanted to send my warm wishes to you and your family. May the days be peaceful, the gathering joyful, and the year ahead kind.', 'With the arrival of Eid, please accept my affectionate wishes for health, contentment, and time well spent with those you hold close.'],
        formal: ['Please accept my sincere wishes for a peaceful Eid. May you and your family enjoy good health, contentment, and time together.', 'With warm regards on Eid Mubarak, and every good wish for the season ahead.'],
        short: ['Eid Mubarak. Peace to your home and warmth to your days.', 'A gentle Eid, and a table full of people you love.']
    },
    festive: {
        sincere: ['May the season bring good light into your home and leave you with a few new memories worth returning to. Thinking of you with affection.', 'Wishing you a festival that feels like your own: generous, grounded, and shared with the people who matter.'],
        literary: ['Every season has its own way of asking us to begin again. May this one leave a little color in the days that follow.', 'Between the lamps, the familiar songs, and the gathering of many lives, I hope you find a moment that is entirely yours.'],
        wit: ['May the plans hold, the sweets remain plentiful, and the family group chat achieve a rare week of peace.', 'Here’s to a festival with excellent food, minimal logistics, and at least one afternoon with nowhere to be.'],
        playful: ['Wishing you good food, familiar faces, and plans that survive the family group chat.', 'May the season bring bright rooms, full plates, and just enough time to enjoy both.'],
        letter: ['As the festivities begin, I wanted to send my warmest wishes. May your home be filled with welcome, your days with good company, and the season with meaning.', 'This time of year always brings familiar faces and stories back into the room. I hope it is a lovely one for you and yours.'],
        formal: ['Please accept my best wishes for the festive season. May it bring peace to your home and happiness to those gathered around you.', 'With sincere regards for a joyful celebration and a peaceful season ahead.'],
        short: ['May the season find you in good company and good spirits.', 'Light, laughter, and a little room to breathe.']
    },
    wedding: {
        sincere: ['May you build a life that feels generous in the ordinary hours, not only on the days that bring everyone together. We’re very happy for you both.', 'Wishing you a marriage with room for change, honest conversation, and the kind of laughter that makes a home.'],
        literary: ['Two lives do not become one story; they make a wider one. May yours keep finding new rooms, new seasons, and reasons to turn toward each other.', 'May the promises made today grow quieter and stronger with time, becoming part of the everyday life you make together.'],
        wit: ['A very good decision, witnessed by an excellent gathering. May you always agree on the important things, like where to order dinner.', 'Marriage: a long conversation with shared snacks. You’ve found an excellent person to have it with.'],
        playful: ['May your life together include good timing, shared snacks, and the freedom to be a little ridiculous at home.', 'Congratulations on finding someone who will hear the same story twice and still stay for dinner.'],
        letter: ['Dear both, it was a pleasure to celebrate this beginning with you. May the years ahead bring tenderness, good humor, and a home that feels like your own.', 'Please accept my warmest congratulations. I hope your life together is marked by patience, trust, and the many small kindnesses that last.'],
        formal: ['Please accept my sincere congratulations on your marriage. May your life together be guided by mutual respect, patience, and enduring affection.', 'With warm congratulations and every good wish for a rewarding life together.'],
        short: ['A good beginning, and many good ordinary days.', 'May your life together feel like home.']
    },
    anniversary: {
        sincere: ['What you have made together is visible in the small things: the shorthand, the patience, the way a day gets carried by two people. I’m glad to celebrate it.', 'A life shared is built in ordinary hours. Yours is worth pausing for, and I hope you do.'],
        literary: ['Years gather like rings in a tree: quiet evidence of weather met and seasons passed. May the next one bring shade, growth, and a little surprise.', 'The lovely thing about a long story is how much it still has room to become. Here’s to the next chapter, written at your own pace.'],
        wit: ['Another year of deciding what to eat together. The institution remains stronger than most governments.', 'Still choosing each other, even after seeing each other’s browser tabs. That is commitment.'],
        playful: ['Years together and still deciding what to eat: an enduring collaboration, and one worth celebrating.', 'Here’s to another year of shared plans, familiar jokes, and negotiating the thermostat.'],
        letter: ['I wanted to mark this day and say how lovely it is to see the care you continue to give one another. May the year ahead be full of time well spent.', 'With every passing year, I admire the life you have made together a little more. Sending my affection and every good wish.'],
        formal: ['Please accept my warm congratulations on your anniversary. May the years ahead bring continued companionship and many shared joys.', 'With sincere good wishes as you mark another year together.'],
        short: ['Still a good story. Still glad to witness it.', 'To the life you have made, and the one still ahead.']
    },
    thankyou: {
        sincere: ['You made a difference in a way I won’t forget. I wanted to say thank you properly, and let you know it mattered.', 'I’m grateful for the care and time you gave. It meant more than I managed to say at the time.'],
        literary: ['Some kindness stays with us long after the moment has passed. Yours did. Thank you for leaving that good mark.', 'I’ve been carrying your thoughtfulness with me. A small note to say it has not gone unnoticed.'],
        wit: ['Thank you for being generous with your time and remarkably patient with me. I know at least one of those was a choice.', 'You were there when it counted. I would offer a grand speech, but a sincere thank-you seems more useful.'],
        playful: ['You were generous with your time and made it look easy. I owe you a proper thank-you—and probably coffee.', 'Your help was excellent. My ability to say thank you at the time was less so; consider this the correction.'],
        letter: ['I wanted to write and tell you how much I appreciate what you did. Your thoughtfulness made a real difference, and I will remember it with gratitude.', 'Please accept my heartfelt thanks for your kindness. It was generous of you, and it meant a great deal to me.'],
        formal: ['Please accept my sincere thanks for your generosity and support. Your contribution made a meaningful difference.', 'I am grateful for your time and consideration. Thank you for your thoughtfulness.'],
        short: ['I noticed. I’m grateful. Thank you.', 'Your kindness stayed with me. Thank you.']
    },
    apology: {
        sincere: ['I’m sorry for the way I handled that. I understand it hurt you, and I should have listened more carefully.', 'I got this wrong, and I’m sorry. You deserved more care from me in that moment.'],
        literary: ['I’ve been thinking about what I said and the space it left between us. I’m sorry. I want to understand before I try to explain.', 'Some words land differently than we intend. I know mine hurt you, and I’m sorry for that.'],
        wit: ['No clever phrasing can improve this: I was wrong, and I’m sorry. I’ll do better than trying to make it sound elegant.', 'I owe you an apology, not a defense. I’m sorry for my part in this.'],
        playful: ['No joke will do the work here: I was wrong, and I’m sorry. I’ll try to make my next move more thoughtful.', 'I was not at my most considerate. That is on me, and I am sorry.'],
        letter: ['I am writing to apologize for what happened. I understand that my actions hurt you, and I take responsibility. I am sorry, and I will listen if you are willing to talk.', 'Please accept my sincere apology. I should have acted with more thought and care, and I regret that I did not.'],
        formal: ['I apologize for my words and for the hurt they caused. I take responsibility and will be more thoughtful going forward.', 'Please accept my sincere apology. I regret my actions and understand that they affected you.'],
        short: ['I was wrong. I’m sorry.', 'You deserved better from me. I’m sorry.']
    },
    thinking: {
        sincere: ['The days have their usual shape, but I notice your absence in them. I hope things are going well where you are.', 'I miss having you in the small, ordinary parts of the day. Just wanted to say so.'],
        literary: ['Distance has a way of making ordinary details feel newly dear. I’ve been thinking of you and wishing you were here.', 'Some conversations keep their place even when the people are far apart. I miss ours.'],
        wit: ['There is a noticeable shortage of your particular point of view around here. Please remedy this at your earliest convenience.', 'I miss you. The group chat is doing a poor job of filling the gap.'],
        playful: ['I miss your running commentary. The world continues without it, but less entertainingly.', 'This is a formal request for your company, preferably before the next season changes.'],
        letter: ['It has been too long since we shared a proper conversation. I hope this note finds you well, and that we can put a date on seeing each other soon.', 'I wanted to write and say that I miss your company. I hope life has been kind to you lately.'],
        formal: ['I hope this note finds you well. You have been on my mind, and I wanted to send my warm regards.', 'It has been some time since we spoke. I hope all is well and that we can meet again soon.'],
        short: ['I miss your company. That’s the whole note.', 'This place is better with you in it.']
    },
    milestone: {
        sincere: ['This took patience, judgment, and more than a little work. I hope you take a moment to see what you have made possible.', 'You earned this moment the long way: one careful decision at a time. I’m proud of you, and glad to be here for it.'],
        literary: ['Some thresholds are crossed quietly, then understood later as the point where everything changed. This is one of them. Take it in.', 'The work has become a place you can stand and look back from. May what comes next be chosen with the same care.'],
        wit: ['After all that effort, you are now legally required to enjoy the result. I don’t make the rules.', 'An impressive achievement, accomplished without becoming unbearable about it. A rare double success.'],
        playful: ['You did the hard part. Please allow yourself the less productive part: enjoying this.', 'A very good result, achieved without making the rest of us look too bad. Congratulations.'],
        letter: ['I wanted to put this in writing: your work and persistence have been noticed, and this accomplishment is thoroughly deserved. I hope you are proud of it.', 'Please accept my warm congratulations. It has been a pleasure to see the care you put into this, and I look forward to what you do next.'],
        formal: ['Please accept my congratulations on this well-earned achievement. Your dedication and judgment are evident in the result.', 'This accomplishment is a testament to your sustained effort. I offer my sincere congratulations and best wishes for what follows.'],
        short: ['Well earned. Let yourself feel it.', 'A moment worth standing still for. Congratulations.']
    },
    custom: {
        sincere: ['I’m glad this day gives us a reason to pause and tell you what can go unsaid in the usual rush: you matter to me.', 'Some days deserve their own small ceremony. This is one of them, and I’m glad to share it with you.'],
        literary: ['A date becomes meaningful when we decide to keep it. May this one open into a memory you return to with warmth.', 'Every good beginning starts before we know what to call it. I’m glad this day found its place in our story.'],
        wit: ['A completely legitimate reason to celebrate, with no paperwork required. I hope the refreshments meet expectations.', 'We could have let this day pass as an ordinary Tuesday. We have wisely chosen otherwise.'],
        playful: ['We found a good reason to interrupt the ordinary day. I support this decision.', 'A date, a person, and an excuse to gather: the arrangement seems sound.'],
        letter: ['I wanted to mark this occasion properly and tell you how much it means to share it with you. May the day feel thoughtful, unhurried, and entirely yours.', 'Whatever the calendar calls this day, it is a good reason to write and say that I am thinking of you with affection.'],
        formal: ['Please accept my warm wishes on this special occasion. I hope it brings you happiness and time with those closest to you.', 'With sincere regards and every good wish as you mark this meaningful day.'],
        short: ['A day worth keeping. A person worth celebrating.', 'For this moment, and for you.']
    }
};

const bengaliLines = {
    birthday: ['আরেকটি বছর মানে নিজের মতো করে আরও একটু বড় হওয়া। তোমাকে চিনি—এটাই আমার কাছে আনন্দের।', 'সাধারণ দিনগুলোকে আপন করে তোলার এক শান্ত ক্ষমতা তোমার আছে। আজকের দিনটি সেই উষ্ণতা তোমার কাছেও ফিরিয়ে আনুক।'],
    eid: ['এই ঈদ তোমার দিনগুলোতে একটু স্বস্তি আর ঘরে আপনজনের সঙ্গ নিয়ে আসুক। তোমার কথা মনে করে শুভেচ্ছা পাঠালাম।', 'যে মানুষ আর রীতিগুলো ঘরকে আপন করে, তাদের সঙ্গে কাটুক তোমার ঈদের সময়।'],
    festive: ['উৎসবের এই সময় তোমার ঘরে আলো আর মনে নতুন স্মৃতি নিয়ে আসুক। তোমার কথা স্নেহের সঙ্গে ভাবছি।', 'এই ঋতু নতুন করে শুরু করার কথা মনে করায়। সামনের দিনগুলোতেও তার রং একটু থেকে যাক।'],
    wedding: ['তোমাদের সংসার গড়ে উঠুক প্রতিদিনের যত্ন, খোলামেলা কথা আর একসঙ্গে হাসির মধ্যে দিয়ে। তোমাদের জন্য আমরা সত্যিই আনন্দিত।', 'আজকের প্রতিশ্রুতিগুলো সময়ের সঙ্গে আরও শান্ত, আরও দৃঢ় হয়ে উঠুক। একসঙ্গে তোমাদের নতুন পথ সুন্দর হোক।'],
    anniversary: ['একসঙ্গে কাটানো জীবন ছোট ছোট যত্নে তৈরি হয়। তোমাদের সেই পথটুকু আজ থেমে দেখে নেওয়ার মতোই সুন্দর।', 'দীর্ঘ গল্পের সৌন্দর্য হলো, তাতে এখনও নতুন অধ্যায়ের জায়গা থাকে। সামনের দিনগুলো তোমাদের মতো করেই লেখা হোক।'],
    thankyou: ['তোমার যত্ন আর সময় আমার কাছে অনেক মূল্যবান। ঠিকভাবে ধন্যবাদ বলা হয়নি—তাই আজ লিখে জানালাম, আমি কৃতজ্ঞ।', 'তোমার আন্তরিকতা আমার কঠিন সময়টাকে সহজ করেছে। এই ভালোবাসা আর সহায়তা আমি মনে রাখব।'],
    apology: ['আমি যেভাবে কথা বলেছি, তা ঠিক হয়নি। তোমার কষ্টের কথা বুঝতে পারছি—আমি সত্যিই দুঃখিত।', 'আমি ভুল করেছি, আর তার জন্য আন্তরিকভাবে ক্ষমা চাইছি। তোমার কথা আরও মন দিয়ে শোনা উচিত ছিল।'],
    thinking: ['দিনের ছোট ছোট গল্পগুলো তোমার সঙ্গে ভাগ করে নিতে ইচ্ছে করে। দূরে থেকেও খুব কাছের মানুষ তুমি।', 'তুমি পাশে নেই—দৈনন্দিন কথাবার্তায় সেই অভাবটা টের পাই। ভালো থেকো, তোমার খবরের অপেক্ষায় রইলাম।'],
    milestone: ['এই অর্জনের পেছনে আছে ধৈর্য, মনোযোগ আর নিরলস চেষ্টা। একটু থেমে নিজের কাজটাকে দেখে নাও—এটা তোমার প্রাপ্য।', 'একটি একটি সিদ্ধান্তে তুমি এই জায়গায় পৌঁছেছ। তোমার জন্য গর্ব হয়, আর এই মুহূর্তে পাশে থাকতে পেরে ভালো লাগছে।'],
    custom: ['এই দিনটি আমাদের থেমে তোমাকে বলার সুযোগ করে দিয়েছে—তুমি আমার কাছে গুরুত্বপূর্ণ।', 'কিছু দিনকে আলাদা করে মনে রাখার কারণ লাগে না; কাছের মানুষ থাকলেই যথেষ্ট।']
};

const bengaliToneOpenings = {
    literary: {
        birthday: 'সময় আরও একটি পৃষ্ঠা উল্টে দিল—',
        eid: 'চাঁদের আলোয় ফিরে আসে ঘর আর আপনজনের স্মৃতি—',
        festive: 'ঋতুর বদলের সঙ্গে ঘরও যেন নতুন করে জ্বলে ওঠে—',
        wedding: 'দুটি জীবনের পথ আজ থেকে পাশাপাশি আরও দূর এগোবে—',
        anniversary: 'বছরের পর বছর, ছোট ছোট যত্নে গড়ে ওঠে একসঙ্গে থাকা—',
        thankyou: 'কিছু আন্তরিকতা সময় পেরিয়েও মনে থেকে যায়—',
        apology: 'কিছু কথা বলতে দেরি হয়, তবু বলা জরুরি—',
        thinking: 'দূরত্বের মধ্যেও কিছু মানুষ প্রতিদিনের কথায় থেকে যায়—',
        milestone: 'দীর্ঘ চেষ্টার শেষে কিছু দরজা নতুন করে খুলে যায়—',
        custom: 'দিনটিকে আলাদা করে রাখার মানে তার স্মৃতিটুকু ধরে রাখা—'
    },
    wit: {
        birthday: 'বয়সের হিসাবটা ক্যালেন্ডারের থাক; আজকের আয়োজনটা কেকের—',
        eid: 'মিষ্টি আর আরেকবার খাবার—এ নিয়ে আজ কোনো বিচার নেই—',
        festive: 'পরিকল্পনা যত কম, উৎসবের আনন্দ তত বেশি—',
        wedding: 'দুজনের একসঙ্গে পথচলা শুরু—খাবার অর্ডারের দায়িত্বটাও ভাগ করে নিও—',
        anniversary: 'এত বছর পরেও একসঙ্গে কী খাবে ঠিক করা—এটাই আসল ধৈর্য—',
        thankyou: 'ধন্যবাদটা লিখে রাখলাম; চায়ের বিলটা পরেরবার আমার—',
        apology: 'এখানে বুদ্ধিদীপ্ত কথা নেই—ভুলটা আমার, ক্ষমা চাইছি—',
        thinking: 'তোমার অনুপস্থিতিটা এখানে বেশ লক্ষণীয়—এটুকুই জানাই—',
        milestone: 'এত পরিশ্রমের পর উদযাপনের পালা—এবার কোনো অজুহাত নয়—',
        custom: 'আজকের দিনটাকে আলাদা করার সিদ্ধান্তটা বেশ ভালোই হয়েছে—'
    },
    letter: {
        birthday: 'আজকের কথাগুলো তাড়াহুড়ো করে নয়, লিখে জানাতে চাইলাম।',
        eid: 'ঈদের শুভেচ্ছাটা আলাদা করে লিখে পাঠালাম।',
        festive: 'উৎসবের এই সময়ে তোমার জন্য কয়েকটি কথা লিখে রাখলাম।',
        wedding: 'আজকের দিনে তোমাদের জন্য কয়েকটি কথা লিখে রাখতে চাই।',
        anniversary: 'তোমাদের পথচলার কথা ভেবে এই কয়েকটি কথা লিখছি।',
        thankyou: 'ধন্যবাদটা তাড়াহুড়ো করে নয়, ঠিকভাবে জানাতে চেয়েছিলাম।',
        apology: 'এই কথাগুলো মুখে বলা কঠিন, তাই লিখে জানাচ্ছি।',
        thinking: 'কথা বলার দূরত্বটা কমাতে এই ছোট চিঠি লিখলাম।',
        milestone: 'এই অর্জনের স্বীকৃতিটা লিখে জানানো দরকার ছিল।',
        custom: 'এই দিনটিকে আলাদা করে মনে রাখার জন্য লিখলাম।'
    }
};

const themePalette = {
    velvet: ['#f7f0e2', '#392f26', '#ad8752', '#e1ceb0', '#ad8752'],
    ivory: ['#fbf0ef', '#49373a', '#bd8087', '#e8cfd2', '#bd8087'],
    emerald: ['#f4f3e9', '#3f4940', '#879b83', '#dbe3d7', '#879b83'],
    vermilion: ['#fbefe5', '#583b31', '#b8785c', '#dfa98d', '#b8785c'],
    nordic: ['#f3eff7', '#4b4051', '#9886a6', '#ded5e8', '#9886a6'],
    twilight: ['#edf0fa', '#30384e', '#8693c1', '#c4cce1', '#8693c1'],
    midnight: ['#f7f0e2', '#392f26', '#ad8752', '#e1ceb0', '#ad8752'],
    rose: ['#fbf0ef', '#49373a', '#bd8087', '#e8cfd2', '#bd8087'],
    kraft: ['#f3eff7', '#4b4051', '#9886a6', '#ded5e8', '#9886a6']
};
const valid = {
    occasion: Object.keys(occasionDefaults), relationship: ['friend', 'partner', 'family', 'mentor', 'colleague'],
    profile: ['sincere', 'literary', 'wit', 'playful', 'letter', 'formal', 'short'], language: ['en', 'bn', 'mixed'],
    theme: Object.keys(themeNames), layout: ['editorial', 'postcard', 'polaroid', 'playful', 'gallery', 'festive'],
    pattern: ['glow', 'dots', 'grid', 'waves'], photoFrame: ['rounded', 'polaroid', 'circle', 'banner'],
    frame: ['editorial', 'double', 'arch', 'polaroid', 'gallery', 'botanical'],
    font: ['serif', 'script', 'modern'], experience: ['envelope', 'giftbox', 'moment', 'direct'],
    emblem: ['♥', '✦', '♛', '✧', '☾', '❀', '○']
};

let card = structuredClone(starter);
let toastTimer;
let audioContext;
let recorder;
let recorderStream;
let recorderChunks = [];
let countdownTimer;
let typingTimer;
let blowingStream;
let blowingFrame;
let previousVariation = -1;
let soundEnabled = false;
let chimeGainNodes = [];
let wishIsCustom = false;

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const shared = readSharedCard();
    if (shared) {
        card = shared;
        document.body.classList.add('recipient-mode');
        renderRecipient();
        setupRecipient();
        return;
    }
    setupStudio();
    applyOccasionDefaults(false);
    renderStudio();
    syncControls();
    refreshSharing();
    updateGateFields();
    document.getElementById('custom-occasion-field').classList.toggle('hidden', card.occasion !== 'custom');
    updateModuleFields();
    setupScratch();
}

function readSharedCard() {
    const dataParam = new URLSearchParams(location.search).get('data');
    if (!dataParam) return null;
    try {
        const base64 = dataParam.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64 + '='.repeat((4 - base64.length % 4) % 4));
        const decoded = new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
        const parsed = JSON.parse(decoded);
        if (!parsed || typeof parsed !== 'object' || typeof parsed.recipient !== 'string' || typeof parsed.wish !== 'string') {
            throw new Error('The shared card is missing its message.');
        }
        return validateCard(parsed);
    } catch (error) {
        setTimeout(() => showToast(`This Cardistry link could not be opened: ${error.message}`), 0);
        return null;
    }
}

function validateCard(value) {
    const result = { ...structuredClone(starter), ...value };
    result.modules = { ...starter.modules, ...(value.modules || {}) };
    result.gate = { ...starter.gate, ...(value.gate || {}) };
    const legacyThemes = { midnight: 'velvet', rose: 'velvet', kraft: 'nordic' };
    if (legacyThemes[result.theme]) result.theme = legacyThemes[result.theme];
    for (const [key, values] of Object.entries(valid)) if (!values.includes(result[key])) result[key] = starter[key];
    if (!['instant', 'pin', 'quiz', 'time'].includes(result.gate.mode)) result.gate.mode = starter.gate.mode;
    for (const key of ['prompt', 'answer', 'question1', 'answer1', 'question2', 'answer2', 'unlockAt']) {
        if (typeof result.gate[key] !== 'string') result.gate[key] = '';
        result.gate[key] = result.gate[key].slice(0, key === 'unlockAt' ? 40 : 100);
    }
    for (const [key, limit] of Object.entries({
        customOccasion: 60, kicker: 80, recipient: 60, sender: 60, inviteMessage: 240, memory: 180, signoff: 80, ps: 160, wish: 1800,
        teaser: 90, memoryCaption: 120, secret: 240, audioUrl: 600,         audioData: 61000
    })) {
        if (typeof result[key] !== 'string') result[key] = '';
        result[key] = result[key].slice(0, limit);
    }
    result.intensity = clamp(Number(result.intensity) || 0, 0, 100);
    result.pacing = clamp(Number(result.pacing) || 0, 0, 100);
    result.frameThickness = clamp(Number(result.frameThickness) || 2, 1, 12);
    result.cornerRadius = clamp(Number(result.cornerRadius) || 0, 0, 36);
    result.accent = /^#[\da-f]{6}$/i.test(result.accent) ? result.accent : starter.accent;
    result.accentOverride = Boolean(result.accentOverride);
    result.backgroundColor = /^#[\da-f]{6}$/i.test(result.backgroundColor) ? result.backgroundColor : starter.backgroundColor;
    result.backgroundOverride = Boolean(result.backgroundOverride);
    if (typeof result.photoData !== 'string' || result.photoData.length > 48000 ||
        (result.photoData && !/^data:image\/jpeg;base64,[\da-z+/]+=*$/i.test(result.photoData))) result.photoData = '';
    result.photoEnabled = Boolean(result.photoEnabled && result.photoData);
    result.sealColor = /^#[\da-f]{6}$/i.test(result.sealColor) ? result.sealColor : starter.sealColor;
    Object.keys(result.modules).forEach(key => { result.modules[key] = Boolean(result.modules[key]); });
    result.effects = Boolean(result.effects);
    result.chime = Boolean(result.chime);
    if (result.experience === 'moment') result.modules.moment = true;
    return result;
}

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function setupStudio() {
    document.getElementById('card-form').addEventListener('submit', event => {
        event.preventDefault();
        readControls();
        if (!card.recipient.trim()) {
            document.getElementById('recipient').focus();
            showToast('Add a name before composing the card.');
            return;
        }
        if (!card.wish.trim()) {
            wishIsCustom = false;
            card.wish = composeWish(card, false);
            document.getElementById('wish').value = card.wish;
            updateCount();
        }
        renderStudio();
        refreshSharing();
        showToast('Your card is ready to preview.');
    });

    document.getElementById('variation-button').addEventListener('click', () => {
        readControls();
        if (!card.recipient.trim()) {
            showToast('Add a name to compose another version.');
            return;
        }
        wishIsCustom = false;
        card.wish = composeWish(card, true);
        document.getElementById('wish').value = card.wish;
        updateCount();
        renderStudio();
        refreshSharing();
    });
    document.querySelectorAll('[data-occasion-chip]').forEach(button => button.addEventListener('click', () => {
        const occasion = document.getElementById('occasion');
        occasion.value = button.dataset.occasionChip;
        occasion.dispatchEvent(new Event('change', { bubbles: true }));
    }));
    document.getElementById('occasion').addEventListener('change', () => {
        readControls();
        applyOccasionDefaults(false);
        syncControls();
        document.getElementById('custom-occasion-field').classList.toggle('hidden', card.occasion !== 'custom');
        if (card.recipient && !wishIsCustom) {
            card.variation = -1;
            card.wish = composeWish(card, true);
            document.getElementById('wish').value = card.wish;
            updateCount();
        }
        renderStudio();
        refreshSharing();
    });
    document.querySelectorAll('#card-form input, #card-form select, #card-form textarea, .customize-details input, .customize-details select, .customize-details textarea').forEach(input => {
        if (['occasion', 'wish', 'photo-upload'].includes(input.id)) return;
        input.addEventListener('input', () => onControlChange(input));
        input.addEventListener('change', () => onControlChange(input));
    });
    document.getElementById('photo-upload').addEventListener('change', handlePhotoUpload);
    document.getElementById('remove-photo').addEventListener('click', removePhoto);
    document.getElementById('surprise-design').addEventListener('click', surpriseDesign);
    document.getElementById('wish').addEventListener('input', event => {
        wishIsCustom = true;
        card.wish = event.target.value;
        updateCount();
        renderStudio();
        refreshSharing();
    });
    document.querySelectorAll('[data-group]').forEach(button => button.addEventListener('click', () => {
        card[button.dataset.group] = button.dataset.value;
        if (button.dataset.group === 'theme' && !card.accentOverride) {
            card.accent = themePalette[card.theme][4];
            document.getElementById('accent-color').value = card.accent;
        }
        document.querySelectorAll(`[data-group="${button.dataset.group}"]`).forEach(item => {
            item.classList.toggle('selected', item === button);
            item.setAttribute('aria-pressed', String(item === button));
        });
        renderStudio();
        refreshSharing();
    }));
    document.querySelectorAll('[data-edit]').forEach(element => {
        element.addEventListener('input', () => {
            const key = element.dataset.edit;
            let value = element.innerText.trim().slice(0, key === 'wish' ? 1800 : key === 'ps' ? 160 : 120);
            if (key === 'ps') value = value.replace(/^P\.S\.\s*/i, '');
            if (key === 'wish') wishIsCustom = true;
            card[key] = value;
            const input = document.getElementById(key);
            if (input) input.value = value;
            refreshSharing();
        });
        element.addEventListener('keydown', event => {
            if (event.key === 'Enter' && element.dataset.edit !== 'wish') {
                event.preventDefault();
                element.blur();
            }
        });
    });
    document.getElementById('gate-mode').addEventListener('change', () => {
        card.gate.mode = document.getElementById('gate-mode').value;
        updateGateFields();
        readGateControls();
        refreshSharing();
    });
    document.querySelectorAll('[data-qr-frame]').forEach(button => button.addEventListener('click', () => {
        card.qrFrame = button.dataset.qrFrame;
        document.querySelectorAll('[data-qr-frame]').forEach(item => item.classList.toggle('selected', item === button));
        document.getElementById('qr-frame').dataset.frame = card.qrFrame;
        document.getElementById('custom-occasion-field').classList.toggle('hidden', card.occasion !== 'custom');
        const unlockInput = document.getElementById('unlock-at');
        const unlockDate = card.gate.unlockAt ? new Date(card.gate.unlockAt) : null;
        if (unlockDate && Number.isFinite(unlockDate.getTime())) {
            unlockDate.setMinutes(unlockDate.getMinutes() - unlockDate.getTimezoneOffset());
            unlockInput.value = unlockDate.toISOString().slice(0, 16);
        } else unlockInput.value = '';
        refreshSharing();
    }));
    document.getElementById('studio-seal').addEventListener('click', () => openEnvelope('studio-stage', 'preview-caption', false));
    document.getElementById('studio-gift-lid').addEventListener('click', () => openEnvelope('studio-stage', 'preview-caption', false));
    document.getElementById('studio-close').addEventListener('click', () => {
        document.getElementById('studio-stage').classList.remove('is-open');
        document.getElementById('preview-caption').textContent = 'A quiet moment before the letter is opened.';
    });
    document.getElementById('copy-link').addEventListener('click', copyLink);
    document.getElementById('download-qr').addEventListener('click', downloadQrTag);
    document.getElementById('export-card').addEventListener('click', exportCardPng);
    document.getElementById('print-card').addEventListener('click', () => {
        if (!hasReadyCard()) return showToast('Compose a note before printing.');
        window.print();
    });
    document.getElementById('native-share').addEventListener('click', nativeShare);
    document.getElementById('studio-moment-button').addEventListener('click', doMoment);
    document.getElementById('studio-blow-button').addEventListener('click', celebrateStudioMoment);
    document.getElementById('invite-message').addEventListener('input', event => {
        card.inviteMessage = event.target.value.trim();
        refreshSharing();
    });
    document.getElementById('record-audio').addEventListener('click', beginRecording);
    document.getElementById('stop-recording').addEventListener('click', stopRecording);
    ['preview-recipient', 'whatsapp-link', 'telegram-link', 'email-link'].forEach(id => {
        document.getElementById(id).addEventListener('click', event => {
            if (!hasReadyCard()) {
                event.preventDefault();
                showToast('Compose a note before sharing.');
            }
        });
    });
}

function readControls() {
    const value = id => document.getElementById(id).value;
    card.occasion = value('occasion');
    card.customOccasion = value('custom-occasion').trim();
    card.recipient = value('recipient').trim();
    card.sender = value('sender').trim();
    card.relationship = value('relationship');
    card.profile = value('profile');
    card.language = value('language');
    card.intensity = Number(value('intensity'));
    card.pacing = Number(value('pacing'));
    card.memory = value('memory').trim();
    card.signoff = value('signoff').trim();
    card.ps = value('ps').trim();
    card.wish = value('wish');
    card.experience = value('experience');
    card.inviteMessage = value('invite-message').trim();
    card.layout = document.querySelector('[data-group="layout"].selected')?.dataset.value || card.layout;
    card.pattern = document.querySelector('[data-group="pattern"].selected')?.dataset.value || card.pattern;
    card.frameThickness = Number(value('frame-thickness'));
    card.cornerRadius = Number(value('corner-radius'));
    card.accent = value('accent-color');
    card.backgroundColor = value('background-color');
    card.backgroundOverride = document.getElementById('background-override').checked;
    card.photoEnabled = document.getElementById('photo-enabled').checked;
    card.photoFrame = value('photo-frame');
    card.font = value('font');
    card.emblem = value('emblem');
    card.sealColor = value('seal-color');
    card.teaser = value('teaser').trim();
    card.memoryCaption = value('memory-caption').trim();
    card.memoryDate = value('memory-date');
    card.memoryBadge = value('memory-badge');
    card.secret = value('secret-note').trim();
    card.audioUrl = value('audio-url').trim();
    card.effects = document.getElementById('effects-toggle').checked;
    card.chime = document.getElementById('chime-toggle').checked;
    if (card.experience === 'moment') {
        card.modules.moment = true;
        document.getElementById('module-moment').checked = true;
    }
    readGateControls();
}

function readGateControls() {
    card.gate.mode = document.getElementById('gate-mode').value;
    card.gate.prompt = document.getElementById('gate-prompt').value.trim();
    card.gate.answer = document.getElementById('gate-answer').value.trim();
    card.gate.question1 = document.getElementById('quiz-question-1').value.trim();
    card.gate.answer1 = document.getElementById('quiz-answer-1').value.trim();
    card.gate.question2 = document.getElementById('quiz-question-2').value.trim();
    card.gate.answer2 = document.getElementById('quiz-answer-2').value.trim();
    const localDate = document.getElementById('unlock-at').value;
    card.gate.unlockAt = localDate ? new Date(localDate).toISOString() : '';
}

function onControlChange(input) {
    if (input.id === 'photo-enabled' && input.checked && !card.photoData) {
        input.checked = false;
        showToast('Choose a photo first, then turn it on for the card.');
        return;
    }
    if (input.id === 'accent-color') card.accentOverride = true;
    if (input.id === 'background-color') document.getElementById('background-override').checked = true;
    readControls();
    if (input.matches('[data-gate]')) return;
    if (input.id === 'module-teaser' || input.id === 'module-memory' || input.id === 'module-typewriter' ||
        input.id === 'module-moment' || input.id === 'module-scratch' || input.id === 'module-audio') {
        const key = input.id.replace('module-', '');
        card.modules[key] = input.checked;
        updateModuleFields();
        if (key === 'scratch' && card.modules.scratch) setupScratch();
    }
    if (!wishIsCustom && card.recipient && ['recipient', 'relationship', 'profile', 'language', 'intensity', 'pacing', 'memory'].includes(input.id)) {
        card.wish = composeWish(card, false);
        document.getElementById('wish').value = card.wish;
        updateCount();
    }
    updateGateFields();
    renderStudio();
    refreshSharing();
}

function applyOccasionDefaults(updateMessage) {
    const defaults = occasionDefaults[card.occasion] || occasionDefaults.birthday;
    card.theme = defaults.theme;
    card.layout = defaults.layout;
    card.pattern = defaults.pattern;
    card.frame = defaults.frame;
    card.emblem = defaults.emblem;
    card.kicker = defaults.kicker;
    card.accentOverride = false;
    card.backgroundOverride = false;
    card.accent = themePalette[defaults.theme][4];
    if (updateMessage && card.recipient) {
        card.variation = -1;
        card.wish = composeWish(card, true);
        document.getElementById('wish').value = card.wish;
        updateCount();
    }
}

function composeWish(data, nextVariation) {
    const lines = library[data.occasion] || library.custom;
    const variants = lines[data.profile] || lines.sincere;
    const toneKey = data.profile === 'playful' ? 'wit' : data.profile === 'formal' ? 'letter' : data.profile;
    let index = data.variation;
    if (nextVariation) {
        const options = variants.map((_, option) => option).filter(option => option !== previousVariation);
        index = options[Math.floor(Math.random() * options.length)];
        previousVariation = index;
    } else if (index < 0) index = 0;
    data.variation = index;
    let body;
    if (data.language === 'bn') body = bengaliLines[data.occasion] || bengaliLines.custom;
    else body = variants;
    let line = body[index % body.length];
    if (data.language === 'bn') {
        const opening = bengaliToneOpenings[toneKey]?.[data.occasion];
        if (opening) line = `${opening} ${line}`;
        if (data.profile === 'short') line = `${line.split(/[।!?]/)[0]}।`;
    }
    const occasion = data.occasion === 'custom' && data.customOccasion ? data.customOccasion : occasionNames[data.occasion];
    const bnOccasion = data.occasion === 'custom' && data.customOccasion ? data.customOccasion : bengaliOccasionNames[data.occasion];
    const englishOpening = {
        birthday: 'Happy birthday.', eid: 'Eid Mubarak.', festive: 'Wishing you a thoughtful festive season.',
        wedding: 'Congratulations on your wedding.', anniversary: 'Happy anniversary.',
        thankyou: 'Thank you.', apology: 'I owe you an apology.', thinking: 'A note from afar.',
        milestone: 'Congratulations on this milestone.', custom: `${data.customOccasion || 'This day'} feels worth marking.`
    }[data.occasion];
    const bengaliOpening = {
        thankyou: 'তোমার প্রতি আমার আন্তরিক কৃতজ্ঞতা জানাই।',
        apology: 'আমি আমার আচরণের জন্য আন্তরিকভাবে ক্ষমা চাইছি।',
        thinking: 'আজ শুধু বলতে ইচ্ছে হলো—তোমাকে মনে পড়ছে।'
    }[data.occasion];
    const mixedOpening = {
        thankyou: 'A note of thanks —',
        apology: 'I owe you an apology —',
        thinking: 'Missing you —'
    }[data.occasion];
    let greeting;
    if (data.language === 'bn') greeting = `${data.recipient ? `প্রিয় ${data.recipient}, ` : ''}${bengaliOpening || `${bnOccasion} উপলক্ষে তোমার জন্য রইল আন্তরিক শুভেচ্ছা।`}`;
    else if (data.language === 'mixed') greeting = `${data.recipient ? `প্রিয় ${data.recipient}, ` : ''}${mixedOpening || `${occasion} —`} ${line}`;
    else greeting = `${data.recipient ? `Dear ${data.recipient},\n\n` : ''}${englishOpening}\n\n${line}`;
    let message = data.language === 'mixed'
        ? `${greeting}\n\n${data.intensity > 65 ? 'এই দিনটি তোমার জন্য অনেক আনন্দ নিয়ে আসুক।' : 'দিনটি তোমার সুন্দর কাটুক.'}`
        : data.language === 'bn'
            ? `${greeting}\n\n${line}${data.intensity > 65 ? '\n\nতোমার জীবনে আরও অনেক শান্তি, আনন্দ আর আপনজনের সঙ্গ আসুক।' : ''}`
            : `${greeting}${data.intensity > 65 ? '\n\nI hope you feel, today and often, how much you are valued.' : ''}`;
    if (data.memory) {
        const memoryLine = data.language === 'bn'
            ? `আমাদের ${data.memory} স্মৃতিটা আমার মনে রয়ে গেছে।`
            : data.language === 'mixed'
                ? `আর আমাদের ${data.memory}—এই স্মৃতিটা আমার কাছে রয়ে যাবে।`
                : `I keep thinking about ${data.memory}; it says more than a grand gesture ever could.`;
        message += `\n\n${memoryLine}`;
    }
    if (data.profile === 'short' || data.pacing < 30) {
        if (data.language === 'bn') message = message.split(/[।!?]\s*/).filter(Boolean).slice(0, 2).join('। ');
        else message = message.split(/[.!?]\s+/).slice(0, 2).join('. ').replace(/\.$/, '');
    }
    if (data.pacing > 75 && data.language !== 'bn' && data.language !== 'mixed') {
        message += '\n\nThere is no need to make too much of the day. It is enough to notice it, and to be glad you are here.';
    }
    return message.replace(/[!]{2,}/g, '!');
}

function syncControls() {
    const map = {
        occasion: card.occasion, 'custom-occasion': card.customOccasion, recipient: card.recipient, sender: card.sender,
        experience: card.experience, 'invite-message': card.inviteMessage,
        relationship: card.relationship, profile: card.profile, language: card.language, intensity: card.intensity,
        pacing: card.pacing, memory: card.memory, signoff: card.signoff, ps: card.ps, wish: card.wish,
        'frame-thickness': card.frameThickness, 'corner-radius': card.cornerRadius, 'accent-color': card.accent,
        'background-color': card.backgroundColor, 'photo-frame': card.photoFrame,
        font: card.font, emblem: card.emblem, 'seal-color': card.sealColor, teaser: card.teaser,
        'memory-caption': card.memoryCaption, 'memory-date': card.memoryDate, 'memory-badge': card.memoryBadge,
        'secret-note': card.secret, 'audio-url': card.audioUrl, 'gate-mode': card.gate.mode,
        'gate-prompt': card.gate.prompt, 'gate-answer': card.gate.answer, 'quiz-question-1': card.gate.question1,
        'quiz-answer-1': card.gate.answer1, 'quiz-question-2': card.gate.question2, 'quiz-answer-2': card.gate.answer2
    };
    Object.entries(map).forEach(([id, value]) => { document.getElementById(id).value = value ?? ''; });
    document.getElementById('wish').value = card.wish;
    document.getElementById('effects-toggle').checked = card.effects;
    document.getElementById('chime-toggle').checked = card.chime;
    document.getElementById('background-override').checked = card.backgroundOverride;
    document.getElementById('photo-enabled').checked = card.photoEnabled;
    document.getElementById('photo-status').textContent = card.photoData
        ? 'Photo included in the share link (compressed on this device).'
        : 'A photo is optional and stays in this card’s share link.';
    document.getElementById('remove-photo').classList.toggle('hidden', !card.photoData);
    for (const [key, enabled] of Object.entries(card.modules)) document.getElementById(`module-${key}`).checked = enabled;
    document.querySelectorAll('[data-group]').forEach(button => {
        const selected = card[button.dataset.group] === button.dataset.value;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-qr-frame]').forEach(button => button.classList.toggle('selected', card.qrFrame === button.dataset.qrFrame));
    document.getElementById('qr-frame').dataset.frame = card.qrFrame;
    syncOccasionChips();
    updateCount();
}

function syncOccasionChips() {
    const occasion = document.getElementById('occasion').value;
    document.querySelectorAll('[data-occasion-chip]').forEach(button => {
        const selected = button.dataset.occasionChip === occasion;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
    });
}

function updateCount() {
    const wish = document.getElementById('wish');
    document.getElementById('character-count').textContent = `${wish.value.length} / 1800`;
}

function updateModuleFields() {
    document.getElementById('teaser-field').classList.toggle('hidden', !card.modules.teaser);
    document.getElementById('memory-module-fields').classList.toggle('hidden', !card.modules.memory);
    document.getElementById('memory-meta-fields').classList.toggle('hidden', !card.modules.memory);
    document.getElementById('secret-field').classList.toggle('hidden', !card.modules.scratch);
    document.getElementById('audio-field').classList.toggle('hidden', !card.modules.audio);
    document.getElementById('studio-moment').classList.toggle('hidden', !card.modules.moment && card.experience !== 'moment');
}

function updateGateFields() {
    const mode = document.getElementById('gate-mode').value;
    document.getElementById('gate-pin-fields').classList.toggle('hidden', mode !== 'pin');
    document.getElementById('gate-quiz-fields').classList.toggle('hidden', mode !== 'quiz');
    document.getElementById('gate-time-fields').classList.toggle('hidden', mode !== 'time');
}

function renderStudio() {
    const stage = document.getElementById('studio-stage');
    paintStage(stage);
    const defaults = occasionDefaults[card.occasion];
    document.getElementById('occasion-caption').textContent = `${card.occasion === 'custom' && card.customOccasion ? card.customOccasion : occasionNames[card.occasion]} · ${themeNames[card.theme]}`;
    document.getElementById('studio-kicker').textContent = card.kicker || defaults.kicker;
    document.getElementById('studio-ornament').textContent = card.emblem;
    document.querySelector('#studio-seal .seal-emblem').textContent = card.emblem;
    document.querySelector('#studio-gift-lid .gift-box-emblem').textContent = card.emblem;
    document.getElementById('studio-recipient').textContent = card.recipient || 'Your person';
    document.getElementById('studio-message').textContent = card.wish || 'Your note will find its way here.';
    document.getElementById('studio-signoff').textContent = card.signoff || defaultSignoff();
    document.getElementById('studio-ps').textContent = card.ps ? `P.S. ${card.ps}` : '';
    document.getElementById('studio-ps').classList.toggle('hidden', !card.ps);
    document.getElementById('studio-teaser').textContent = card.teaser;
    document.getElementById('studio-teaser').classList.toggle('hidden', !card.modules.teaser || !card.teaser);
    document.getElementById('studio-gift-teaser').textContent = card.teaser;
    document.getElementById('studio-gift-teaser').classList.toggle('hidden', !card.modules.teaser || !card.teaser);
    document.getElementById('studio-seal').setAttribute('aria-label', card.experience === 'giftbox'
        ? 'Open the gift box'
        : ['direct', 'moment'].includes(card.experience) ? 'Open the card' : 'Unseal your letter');
    document.getElementById('preview-instruction').textContent = card.experience === 'giftbox'
        ? 'Lift the lid to preview the reveal.'
        : card.experience === 'moment'
            ? 'The card is ready. Try its celebration moment.'
        : card.experience === 'direct'
            ? 'A clean, immediate view of the card.'
            : 'Unseal the envelope to preview your letter.';
    setMemoryPreview('studio-memory', card.memory && !card.wish.includes(card.memory) ? card.memory : '');
    updatePhotoFrame('studio-photo-frame');
    document.getElementById('studio-secret-preview').classList.toggle('hidden', !card.modules.scratch);
    document.querySelector('#studio-secret-preview .secret-note').textContent = card.secret || 'A small wish, saved just for you.';
    document.getElementById('studio-moment').classList.toggle('hidden', !card.modules.moment && card.experience !== 'moment');
}

function paintStage(stage) {
    stage.dataset.theme = card.theme;
    stage.dataset.layout = card.layout;
    stage.dataset.pattern = card.pattern;
    stage.dataset.customBackground = String(card.backgroundOverride);
    stage.dataset.frame = card.frame;
    stage.dataset.font = card.font;
    stage.dataset.experience = card.experience;
    stage.dataset.effects = String(card.effects);
    stage.style.setProperty('--frame-size', `${card.frameThickness}px`);
    stage.style.setProperty('--frame-radius', `${card.cornerRadius}px`);
    if (card.accentOverride) stage.style.setProperty('--custom-accent', card.accent);
    else stage.style.removeProperty('--custom-accent');
    if (card.backgroundOverride) {
        stage.style.setProperty('--custom-background', card.backgroundColor);
        stage.style.setProperty('--custom-background-ink', readableInk(card.backgroundColor));
    } else {
        stage.style.removeProperty('--custom-background');
        stage.style.removeProperty('--custom-background-ink');
    }
    stage.style.setProperty('--wax-color', card.sealColor);
    const postalRecipient = stage.querySelector('[data-postal-recipient]');
    const postalOccasion = stage.querySelector('[data-postal-occasion]');
    if (postalRecipient) postalRecipient.textContent = card.recipient || 'Your person';
    if (postalOccasion) {
        postalOccasion.textContent = card.occasion === 'custom' && card.customOccasion
            ? card.customOccasion
            : occasionNames[card.occasion] || 'A personal note';
    }
}

function defaultSignoff() {
    if (card.signoff) return card.signoff;
    const english = {
        friend: 'With affection', partner: 'With love', family: 'With love',
        mentor: 'With gratitude', colleague: 'With appreciation'
    };
    const bengali = {
        friend: 'স্নেহে', partner: 'ভালোবাসায়', family: 'ভালোবাসা রইল',
        mentor: 'শ্রদ্ধা ও কৃতজ্ঞতায়', colleague: 'শুভেচ্ছাসহ'
    };
    const phrase = (card.language === 'bn' ? bengali : english)[card.relationship] || 'With care';
    return card.sender ? `${phrase}, ${card.sender}` : phrase;
}

function setMemoryPreview(id, memory) {
    const element = document.getElementById(id);
    element.textContent = memory ? `A small thing I remember: ${memory}` : '';
    element.classList.toggle('hidden', !memory);
}

function updatePhotoFrame(id) {
    const frame = document.getElementById(id);
    const showMemory = card.modules.memory || card.layout === 'polaroid';
    const hasPhoto = Boolean(card.photoEnabled && card.photoData);
    frame.classList.toggle('hidden', !showMemory && !hasPhoto);
    frame.dataset.photoFrame = card.photoFrame;
    frame.querySelector('.photo-badge').textContent = card.memoryBadge;
    frame.querySelector('.photo-caption').textContent = card.memoryCaption || 'A moment, kept close';
    frame.querySelector('time').textContent = card.memoryDate ? new Date(`${card.memoryDate}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    frame.querySelector('.photo-badge').classList.toggle('hidden', !card.modules.memory);
    frame.querySelector('.photo-caption').classList.toggle('hidden', !showMemory);
    frame.querySelector('time').classList.toggle('hidden', !card.memoryDate || !card.modules.memory);
    const image = frame.querySelector('.photo-image');
    const placeholder = frame.querySelector('.photo-placeholder');
    image.classList.toggle('hidden', !hasPhoto);
    placeholder.classList.toggle('hidden', hasPhoto);
    if (hasPhoto) {
        image.src = card.photoData;
        image.alt = card.recipient ? `Photo keepsake for ${card.recipient}` : 'Personal photo keepsake';
    } else {
        image.removeAttribute('src');
        image.alt = '';
    }
}

function readableInk(color) {
    const channels = color.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    if (!channels) return '#392f26';
    const [red, green, blue] = channels.slice(1).map(channel => parseInt(channel, 16));
    const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
    return luminance < 145 ? '#fffaf3' : '#392f26';
}

function randomDifferent(values, current) {
    const choices = values.filter(value => value !== current);
    return choices[Math.floor(Math.random() * choices.length)] || current;
}

function surpriseDesign() {
    card.layout = randomDifferent(valid.layout, card.layout);
    card.pattern = randomDifferent(valid.pattern, card.pattern);
    card.theme = randomDifferent(valid.theme, card.theme);
    card.frame = randomDifferent(valid.frame, card.frame);
    card.accentOverride = false;
    card.accent = themePalette[card.theme][4];
    card.backgroundOverride = false;
    syncControls();
    renderStudio();
    refreshSharing();
    showToast('A fresh layout, palette, and pattern are ready to explore.');
}

async function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
        const data = await compressPhoto(file);
        readControls();
        card.photoData = data;
        card.photoEnabled = true;
        document.getElementById('photo-enabled').checked = true;
        syncControls();
        renderStudio();
        refreshSharing();
        showToast('Your photo is ready and included in the card link.');
    } catch (error) {
        event.target.value = '';
        showToast(`Could not add that photo: ${error.message}`);
    }
}

async function compressPhoto(file) {
    if (!file.type.startsWith('image/')) throw new Error('Choose an image file.');
    if (file.size > 15 * 1024 * 1024) throw new Error('Choose an image smaller than 15 MB.');
    const objectUrl = URL.createObjectURL(file);
    try {
        const image = new Image();
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error('The image could not be decoded.'));
            image.src = objectUrl;
        });
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('The image has no usable dimensions.');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Your browser could not process the image.');
        let scale = Math.min(1, 720 / Math.max(image.naturalWidth, image.naturalHeight));
        while (scale >= 0.12) {
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            for (const quality of [0.72, 0.55, 0.4]) {
                const data = canvas.toDataURL('image/jpeg', quality);
                if (data.length <= 48000) return data;
            }
            scale *= 0.78;
        }
        throw new Error('This image is too detailed to fit in a share link. Try a smaller photo.');
    } finally {
        URL.revokeObjectURL(objectUrl);
    }
}

function removePhoto() {
    readControls();
    card.photoData = '';
    card.photoEnabled = false;
    document.getElementById('photo-upload').value = '';
    syncControls();
    renderStudio();
    refreshSharing();
}

function createUrl() {
    const payload = validateCard(card);
    const bytes = new TextEncoder().encode(JSON.stringify(payload));
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    const url = new URL(location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('data', encoded);
    return url.href;
}

function shareInvitation(url) {
    const message = card.inviteMessage || `${card.sender || 'Someone who cares'} made a personal card for you. Open it when you have a quiet moment.`;
    return url ? `${message}\n\n${url}` : message;
}

function refreshSharing() {
    if (!document.getElementById('qr-code')) return;
    const ready = Boolean(card.recipient.trim() && card.wish.trim());
    const url = ready ? createUrl() : '';
    const invite = ready ? shareInvitation(url) : '';
    document.getElementById('copy-link').disabled = !ready;
    document.getElementById('export-card').disabled = !ready;
    document.getElementById('print-card').disabled = !ready;
    document.getElementById('native-share').disabled = !ready;
    document.getElementById('preview-recipient').href = ready ? url : '#';
    document.getElementById('whatsapp-link').href = ready ? `https://wa.me/?text=${encodeURIComponent(invite)}` : 'https://wa.me/';
    document.getElementById('telegram-link').href = ready ? `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareInvitation(''))}` : 'https://t.me/share/url';
    document.getElementById('email-link').href = ready
        ? `mailto:?subject=${encodeURIComponent(`${card.occasion === 'custom' ? card.customOccasion : occasionNames[card.occasion]} · a card for you`)}&body=${encodeURIComponent(invite)}`
        : 'mailto:';
    document.querySelectorAll('#share-panel a').forEach(link => link.setAttribute('aria-disabled', String(!ready)));
    drawQr(url, ready);
    document.getElementById('download-qr').disabled = !ready || !document.querySelector('#qr-code canvas, #qr-code img');
}

function drawQr(url, ready) {
    const target = document.getElementById('qr-code');
    target.replaceChildren();
    if (!ready) {
        target.textContent = 'Compose a note first';
        target.classList.add('qr-error');
        return;
    }
    if (typeof QRCode === 'undefined') {
        target.textContent = 'QR library unavailable';
        target.classList.add('qr-error');
        return;
    }
    if (url.length > 2800) {
        target.textContent = card.photoData
            ? 'Photo link is too long for QR. Copy or send the link instead.'
            : 'Link is too long for QR. Remove optional extras or copy the link.';
        target.classList.add('qr-error');
        return;
    }
    try {
        target.classList.remove('qr-error');
        const palette = themePalette[card.theme];
        new QRCode(target, {
            text: url, width: 96, height: 96,
            colorDark: palette[1],
            colorLight: card.backgroundOverride && readableInk(card.backgroundColor) === '#392f26' ? card.backgroundColor : palette[0],
            correctLevel: QRCode.CorrectLevel.L
        });
    } catch (error) {
        target.textContent = 'Link too long for QR';
        target.classList.add('qr-error');
    }
}

function hasReadyCard() { return Boolean(card.recipient.trim() && card.wish.trim()); }

async function copyLink() {
    if (!hasReadyCard()) return showToast('Compose a note before sharing.');
    try {
        await navigator.clipboard.writeText(createUrl());
    } catch (error) {
        const field = document.createElement('textarea');
        field.value = createUrl();
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) return showToast(`Could not copy the link: ${error.message}`);
    }
    showToast('Card link copied to clipboard.');
}

async function nativeShare() {
    if (!hasReadyCard()) return;
    if (!navigator.share) return showToast('Device sharing is not available in this browser.');
    try { await navigator.share({ title: `A card for ${card.recipient}`, text: shareInvitation(''), url: createUrl() }); }
    catch (error) { if (error.name !== 'AbortError') showToast(`Could not open device sharing: ${error.message}`); }
}

function downloadQrTag() {
    const qr = document.querySelector('#qr-code canvas, #qr-code img');
    if (!qr) return showToast('The QR code is not ready yet or the link is too long.');
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = card.qrFrame === 'tag' ? 1200 : 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return showToast('Your browser could not prepare the gift tag.');
    const palette = themePalette[card.theme];
    ctx.fillStyle = card.backgroundOverride ? card.backgroundColor : palette[0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = palette[4];
    ctx.lineWidth = card.qrFrame === 'minimal' ? 1 : 3;
    if (card.qrFrame === 'tag') {
        ctx.beginPath(); ctx.moveTo(450, 55); ctx.lineTo(500, 115); ctx.lineTo(450, 175); ctx.lineTo(400, 115); ctx.closePath();
        ctx.stroke(); roundedRect(ctx, 45, 80, 810, 1050, 80); ctx.stroke();
    } else if (card.qrFrame === 'gold') {
        ctx.strokeRect(35, 35, 830, 930);
        ctx.strokeRect(48, 48, 804, 904);
    } else ctx.strokeRect(70, 70, 760, 860);
    ctx.textAlign = 'center';
    ctx.fillStyle = card.accentOverride ? card.accent : palette[4];
    ctx.font = '600 25px Arial';
    ctx.fillText(occasionDefaults[card.occasion].kicker, 450, 230);
    ctx.fillStyle = card.backgroundOverride ? readableInk(card.backgroundColor) : palette[1];
    ctx.font = '500 56px Georgia';
    ctx.fillText(trimText(ctx, card.recipient, 740), 450, 325);
    ctx.fillStyle = '#fff';
    ctx.fillRect(180, 385, 540, 540);
    try { ctx.drawImage(qr, 200, 405, 500, 500); }
    catch (error) { return showToast(`Could not add the QR code to the gift tag: ${error.message}`); }
    ctx.fillStyle = card.backgroundOverride ? readableInk(card.backgroundColor) : palette[1];
    ctx.font = 'italic 25px Georgia';
    ctx.fillText('Scan to open your Cardistry card', 450, 970);
    saveCanvas(canvas, `cardistry-gift-tag-${slug(card.recipient)}.png`);
}

function exportCardPng() {
    if (!hasReadyCard()) return showToast('Compose a note before exporting.');
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return showToast('Your browser could not prepare the card image.');
    const render = photo => drawExportCard(canvas, ctx, photo);
    if (card.photoEnabled && card.photoData) {
        const photo = new Image();
        photo.onload = () => render(photo);
        photo.onerror = () => showToast('The attached photo could not be decoded for export.');
        photo.src = card.photoData;
    } else render(null);
}

function drawExportCard(canvas, ctx, photo) {
    const palette = themePalette[card.theme];
    const paper = card.backgroundOverride ? card.backgroundColor : palette[0];
    const ink = card.backgroundOverride ? readableInk(paper) : palette[1];
    const accent = card.accentOverride ? card.accent : palette[4];
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCanvasPattern(ctx, card.pattern, accent, paper);
    ctx.strokeStyle = accent;
    ctx.lineWidth = Math.max(2, card.frameThickness * 2);
    const inset = card.frame === 'gallery' ? 100 : 55;
    roundedRect(ctx, inset, inset, canvas.width - inset * 2, canvas.height - inset * 2, card.cornerRadius * 3);
    ctx.stroke();
    if (card.frame === 'double' || card.layout === 'festive') {
        ctx.lineWidth = 2;
        roundedRect(ctx, inset + 18, inset + 18, canvas.width - (inset + 18) * 2, canvas.height - (inset + 18) * 2, card.cornerRadius * 3);
        ctx.stroke();
    }

    const family = card.font === 'modern' ? 'Poppins, Arial' : card.font === 'script' ? 'Caveat, cursive' : 'Playfair Display, Georgia';
    const centered = card.layout !== 'postcard';
    const left = centered ? 190 : 155;
    const messageWidth = centered ? 820 : 890;
    const textX = centered ? 600 : left;
    const alignment = centered ? 'center' : 'left';
    let headingY = 240;
    let nameY = 360;
    let ruleY = 405;
    let messageY = 500;
    if (card.layout === 'gallery') { headingY = 330; nameY = 500; ruleY = 550; messageY = 640; }
    if (card.layout === 'playful') { headingY = 250; nameY = 385; ruleY = 435; messageY = 530; }
    if (card.layout === 'polaroid') {
        if (photo) drawCanvasPhoto(ctx, photo, 325, 170, 550, 385, card.photoFrame);
        else {
            ctx.fillStyle = '#fffdf8';
            ctx.fillRect(315, 160, 570, 430);
            ctx.fillStyle = colorMix(paper, accent, .18);
            ctx.fillRect(335, 180, 530, 380);
        }
        ctx.fillStyle = '#51443a'; ctx.textAlign = 'center'; ctx.font = 'italic 21px Georgia';
        ctx.fillText(trimText(ctx, card.memoryCaption || 'A moment, kept close', 490), 600, 580);
        if (card.memoryDate) {
            ctx.fillStyle = '#8c7d70'; ctx.font = '14px Arial';
            ctx.fillText(card.memoryDate, 600, 606);
        }
        headingY = 680; nameY = 790; ruleY = 830; messageY = 920;
    }
    ctx.textAlign = alignment;
    ctx.fillStyle = accent;
    ctx.font = '600 22px Arial';
    ctx.fillText(trimText(ctx, card.kicker || occasionDefaults[card.occasion].kicker, centered ? 900 : 700), textX, headingY);

    if (card.layout === 'postcard') {
        ctx.save();
        ctx.translate(950, 210);
        ctx.rotate(.055);
        ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.strokeRect(-42, -52, 84, 104);
        ctx.textAlign = 'center'; ctx.fillStyle = accent; ctx.font = '30px Georgia'; ctx.fillText(card.emblem, 0, -2);
        ctx.font = '600 11px Arial'; ctx.fillText('POST', 0, 29);
        ctx.restore();
    } else if (card.layout === 'playful') {
        ctx.fillStyle = colorMix(paper, accent, .2);
        ctx.beginPath(); ctx.arc(1040, 205, 72, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(154, 1270, 48, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = accent; ctx.textAlign = 'center'; ctx.font = '38px Georgia'; ctx.fillText(card.emblem, 600, 168);
    }
    ctx.fillStyle = ink;
    ctx.textAlign = alignment;
    ctx.font = `500 ${card.layout === 'playful' ? 78 : 70}px ${family}`;
    ctx.fillText(trimText(ctx, card.recipient, centered ? 960 : 780), textX, nameY);
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centered ? 540 : left, ruleY);
    ctx.lineTo(centered ? 660 : left + 120, ruleY);
    ctx.stroke();

    ctx.fillStyle = ink;
    ctx.textAlign = alignment;
    ctx.font = `26px ${family}`;
    const messageLines = wrapText(ctx, card.wish, messageWidth).slice(0, card.layout === 'polaroid' ? 9 : 12);
    messageLines.forEach((line, index) => ctx.fillText(line, textX, messageY + index * 43));
    const messageEnd = messageY + messageLines.length * 43;
    if (photo && card.layout !== 'polaroid') {
        const dimensions = card.photoFrame === 'circle' ? [170, 170] : card.photoFrame === 'banner' ? [720, 155] : [230, 160];
        const photoX = card.photoFrame === 'banner' ? 240 : 600 - dimensions[0] / 2;
        drawCanvasPhoto(ctx, photo, photoX, Math.min(1200, messageEnd + 28), dimensions[0], dimensions[1], card.photoFrame);
    }
    const signoffY = Math.min(1340, Math.max(messageEnd + (photo && card.layout !== 'polaroid' ? 205 : 40), card.layout === 'gallery' ? 1220 : 0));
    ctx.textAlign = alignment;
    ctx.fillStyle = accent;
    ctx.font = `italic 30px ${family}`;
    ctx.fillText(trimText(ctx, card.signoff || defaultSignoff(), centered ? 800 : 840), textX, signoffY, centered ? 800 : 840);
    if (card.ps) {
        ctx.fillStyle = ink; ctx.font = `italic 22px ${family}`;
        ctx.fillText(trimText(ctx, `P.S. ${card.ps}`, 800), textX, signoffY + 55, 800);
    }
    if (card.modules.memory && card.memoryCaption && card.layout !== 'polaroid') {
        ctx.fillStyle = accent; ctx.font = `italic 23px ${family}`;
        ctx.fillText(trimText(ctx, card.memoryCaption, 800), 600, 1410, 800);
    }
    saveCanvas(canvas, `cardistry-${slug(card.recipient)}.png`);
}

function drawCanvasPattern(ctx, pattern, accent, paper) {
    ctx.save();
    ctx.globalAlpha = .14;
    ctx.strokeStyle = accent;
    ctx.fillStyle = accent;
    if (pattern === 'dots') {
        for (let x = 70; x < 1200; x += 35) for (let y = 70; y < 1500; y += 35) {
            ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
    } else if (pattern === 'grid') {
        for (let x = 60; x < 1200; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1500); ctx.stroke(); }
        for (let y = 60; y < 1500; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1200, y); ctx.stroke(); }
    } else if (pattern === 'waves') {
        for (let offset = -480; offset < 1600; offset += 58) {
            ctx.beginPath(); ctx.moveTo(0, offset); ctx.bezierCurveTo(340, offset - 130, 760, offset + 130, 1200, offset); ctx.stroke();
        }
    } else {
        const glow = ctx.createRadialGradient(1030, 160, 15, 1030, 160, 480);
        glow.addColorStop(0, colorMix(paper, accent, .32)); glow.addColorStop(1, paper);
        ctx.globalAlpha = .48; ctx.fillStyle = glow; ctx.fillRect(0, 0, 1200, 1500);
    }
    ctx.restore();
}

function drawCanvasPhoto(ctx, image, x, y, width, height, frame) {
    if (frame === 'polaroid') {
        ctx.fillStyle = '#fffdf8'; ctx.fillRect(x - 12, y - 12, width + 24, height + 54);
        ctx.strokeStyle = '#e6ded2'; ctx.lineWidth = 1; ctx.strokeRect(x - 12, y - 12, width + 24, height + 54);
    }
    ctx.save();
    if (frame === 'circle') {
        ctx.beginPath(); ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, Math.PI * 2); ctx.clip();
    } else {
        roundedRect(ctx, x, y, width, height, frame === 'rounded' ? 24 : 5);
        ctx.clip();
    }
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const sourceWidth = width / scale, sourceHeight = height / scale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2, sourceY = (image.naturalHeight - sourceHeight) / 2;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    ctx.restore();
    if (frame === 'rounded' || frame === 'banner') {
        ctx.strokeStyle = '#ffffffc9'; ctx.lineWidth = 3; roundedRect(ctx, x, y, width, height, frame === 'rounded' ? 24 : 5); ctx.stroke();
    }
}

function colorMix(first, second, amount) {
    const parse = color => color.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)?.slice(1).map(channel => parseInt(channel, 16)) || [247, 240, 226];
    const a = parse(first), b = parse(second);
    return `rgb(${a.map((channel, index) => Math.round(channel * (1 - amount) + b[index] * amount)).join(' ')})`;
}

function roundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r); ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r); ctx.closePath();
}
function wrapText(ctx, text, maxWidth) {
    const lines = [];
    text.split(/\n/).forEach(paragraph => {
        if (!paragraph) { lines.push(''); return; }
        let line = '';
        paragraph.split(/\s+/).forEach(word => {
            const test = line ? `${line} ${word}` : word;
            if (line && ctx.measureText(test).width > maxWidth) { lines.push(line); line = word; }
            else line = test;
        });
        if (line) lines.push(line);
    });
    return lines;
}
function trimText(ctx, text, maxWidth) {
    let value = text || 'A greeting for you';
    while (value.length > 1 && ctx.measureText(value).width > maxWidth) value = `${value.slice(0, -2)}…`;
    return value;
}
function saveCanvas(canvas, filename) {
    canvas.toBlob(blob => {
        if (!blob) return showToast('Your browser could not export this image.');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = filename; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
}
function slug(text) { return (text || 'card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'card'; }

function setupRecipient() {
    soundEnabled = card.chime;
    syncSoundControl();
    renderGate();
    const stage = document.getElementById('recipient-stage');
    if (['direct', 'moment'].includes(card.experience) && !stage.classList.contains('hidden')) {
        document.getElementById('replay-experience').classList.remove('hidden');
        if (card.modules.typewriter) typewriterReveal();
    }
    document.getElementById('recipient-seal').addEventListener('click', () => openEnvelope('recipient-stage', 'recipient-prompt', true));
    document.getElementById('recipient-gift-lid').addEventListener('click', () => openEnvelope('recipient-stage', 'recipient-prompt', true));
    document.getElementById('create-own-card').addEventListener('click', createOwnCard);
    document.getElementById('gate-submit').addEventListener('click', checkGate);
    document.getElementById('moment-button').addEventListener('click', doMoment);
    document.getElementById('blow-button').addEventListener('click', celebrateMoment);
    document.getElementById('mic-blow-button').addEventListener('click', listenForBlow);
    document.getElementById('replay-experience').addEventListener('click', replayExperience);
    document.getElementById('sound-toggle').addEventListener('click', toggleSound);
    setupScratch();
}

function renderRecipient() {
    const stage = document.getElementById('recipient-stage');
    paintStage(stage);
    document.getElementById('recipient-kicker').textContent = card.kicker || occasionDefaults[card.occasion].kicker;
    document.getElementById('recipient-ornament').textContent = card.emblem;
    document.querySelector('#recipient-seal .seal-emblem').textContent = card.emblem;
    document.querySelector('#recipient-gift-lid .gift-box-emblem').textContent = card.emblem;
    document.getElementById('recipient-card-name').textContent = card.recipient;
    document.getElementById('recipient-card-message').textContent = card.wish;
    document.getElementById('recipient-card-signoff').textContent = defaultSignoff();
    document.getElementById('recipient-card-ps').textContent = card.ps ? `P.S. ${card.ps}` : '';
    document.getElementById('recipient-card-ps').classList.toggle('hidden', !card.ps);
    document.getElementById('recipient-teaser').textContent = card.teaser;
    document.getElementById('recipient-teaser').classList.toggle('hidden', !card.modules.teaser || !card.teaser);
    document.getElementById('recipient-gift-teaser').textContent = card.teaser;
    document.getElementById('recipient-gift-teaser').classList.toggle('hidden', !card.modules.teaser || !card.teaser);
    document.getElementById('recipient-seal').setAttribute('aria-label', card.experience === 'giftbox'
        ? 'Open your gift box'
        : ['direct', 'moment'].includes(card.experience) ? 'Open your card' : 'Unseal your letter');
    document.getElementById('recipient-prompt').textContent = card.experience === 'giftbox'
        ? 'A small gift, wrapped just for you.'
        : ['direct', 'moment'].includes(card.experience)
            ? 'A note, ready when you are.'
            : 'A note, sealed with care.';
    setMemoryPreview('recipient-card-memory', card.memory && !card.wish.includes(card.memory) ? card.memory : '');
    updatePhotoFrame('recipient-photo-frame');
    document.getElementById('recipient-moment').classList.toggle('hidden', !card.modules.moment && card.experience !== 'moment');
    const birthday = card.occasion === 'birthday';
    const art = document.getElementById('occasion-art');
    art.classList.remove('moment-glow', 'candles-out');
    art.innerHTML = '<span>✦</span><span>✧</span><span>✦</span>';
    document.getElementById('blow-button').classList.add('hidden');
    document.getElementById('mic-blow-button').classList.add('hidden');
    document.getElementById('moment-button').classList.remove('hidden');
    document.getElementById('moment-button').textContent = birthday ? 'Reveal the cake' : 'Reveal a small wish';
    document.getElementById('recipient-secret').classList.toggle('hidden', !card.modules.scratch);
    document.querySelector('#recipient-secret .secret-note').textContent = card.secret || 'A small wish, saved just for you.';
    const audio = document.getElementById('recipient-audio');
    const audioSource = card.audioData || card.audioUrl;
    audio.classList.toggle('hidden', !card.modules.audio || !audioSource);
    if (audioSource) audio.src = audioSource;
}

function renderGate() {
    const gate = card.gate;
    const screen = document.getElementById('gate-screen');
    const stage = document.getElementById('recipient-stage');
    const revealName = card.experience === 'giftbox' ? 'gift box' : ['direct', 'moment'].includes(card.experience) ? 'card' : 'letter';
    document.getElementById('gate-submit').textContent = card.experience === 'giftbox' ? 'Unlock the gift box' : ['direct', 'moment'].includes(card.experience) ? 'Open the card' : 'Unseal the letter';
    if (gate.mode === 'instant') {
        screen.classList.add('hidden');
        stage.classList.remove('hidden');
        return;
    }
    if (gate.mode === 'time') {
        const unlock = Date.parse(gate.unlockAt);
        if (!Number.isFinite(unlock) || unlock <= Date.now()) {
            screen.classList.add('hidden');
            stage.classList.remove('hidden');
            return;
        }
        document.getElementById('gate-title').textContent = 'A little patience, then your card';
        document.getElementById('gate-question').textContent = `This ${revealName} opens in:`;
        document.getElementById('gate-inputs').replaceChildren();
        document.getElementById('gate-submit').classList.add('hidden');
        screen.classList.remove('hidden');
        stage.classList.add('hidden');
        countdownTimer = setInterval(() => {
            const left = Math.max(0, unlock - Date.now());
            const days = Math.floor(left / 86400000);
            const hours = Math.floor(left / 3600000) % 24;
            const minutes = Math.floor(left / 60000) % 60;
            const seconds = Math.floor(left / 1000) % 60;
            document.getElementById('gate-countdown').textContent = `${days}d  ${hours}h  ${minutes}m  ${seconds}s`;
            if (!left) {
                clearInterval(countdownTimer);
                screen.classList.add('hidden');
                stage.classList.remove('hidden');
                if (['direct', 'moment'].includes(card.experience)) document.getElementById('replay-experience').classList.remove('hidden');
                if (['direct', 'moment'].includes(card.experience) && card.modules.typewriter) typewriterReveal();
            }
        }, 1000);
        return;
    }
    stage.classList.add('hidden');
    screen.classList.remove('hidden');
    document.getElementById('gate-submit').classList.remove('hidden');
    document.getElementById('gate-countdown').textContent = '';
    const inputs = document.getElementById('gate-inputs');
    inputs.replaceChildren();
    if (gate.mode === 'pin') {
        document.getElementById('gate-title').textContent = 'A small clue before the reveal';
        document.getElementById('gate-question').textContent = gate.prompt || 'Enter the secret answer to open your card.';
        inputs.appendChild(makeGateInput('gate-answer-input', 'Your answer'));
    } else {
        document.getElementById('gate-title').textContent = 'A memory unlocks this card';
        document.getElementById('gate-question').textContent = `Answer a question or two to open the ${revealName}.`;
        if (gate.question1) inputs.appendChild(makeGateQuestion(gate.question1, 'gate-quiz-answer-1'));
        if (gate.question2) inputs.appendChild(makeGateQuestion(gate.question2, 'gate-quiz-answer-2'));
        if (!gate.question1 && !gate.question2) inputs.appendChild(makeGateInput('gate-quiz-answer-1', 'Your answer'));
    }
}

function makeGateInput(id, placeholder) {
    const input = document.createElement('input');
    input.id = id; input.className = 'gate-answer'; input.placeholder = placeholder; input.autocomplete = 'off';
    input.setAttribute('aria-label', placeholder);
    return input;
}
function makeGateQuestion(question, id) {
    const wrapper = document.createElement('label');
    wrapper.className = 'gate-question-row';
    const text = document.createElement('span'); text.textContent = question;
    wrapper.append(text, makeGateInput(id, 'Your answer'));
    return wrapper;
}
function checkGate() {
    const gate = card.gate;
    let correct = false;
    if (gate.mode === 'pin') {
        correct = normalizeAnswer(document.getElementById('gate-answer-input')?.value) === normalizeAnswer(gate.answer);
    } else if (gate.mode === 'quiz') {
        const answers = [];
        if (gate.question1) answers.push(normalizeAnswer(document.getElementById('gate-quiz-answer-1')?.value) === normalizeAnswer(gate.answer1));
        if (gate.question2) answers.push(normalizeAnswer(document.getElementById('gate-quiz-answer-2')?.value) === normalizeAnswer(gate.answer2));
        correct = answers.length > 0 && answers.every(Boolean);
    }
    if (!correct) {
        document.getElementById('gate-error').textContent = 'That does not quite match. Take another moment.';
        return;
    }
    document.getElementById('gate-screen').classList.add('hidden');
    document.getElementById('recipient-stage').classList.remove('hidden');
    document.getElementById('gate-error').textContent = '';
    if (['direct', 'moment'].includes(card.experience)) document.getElementById('replay-experience').classList.remove('hidden');
    if (['direct', 'moment'].includes(card.experience) && card.modules.typewriter) typewriterReveal();
}
function normalizeAnswer(value) { return String(value || '').trim().toLocaleLowerCase(); }

function openEnvelope(stageId, promptId, recipient) {
    const stage = document.getElementById(stageId);
    if (stage.classList.contains('is-open')) return;
    stage.classList.add('is-open');
    const prompt = document.getElementById(promptId);
    if (prompt) prompt.textContent = card.experience === 'giftbox'
        ? 'A little something, opened just for you.'
        : 'Take your time. This one is yours.';
    if (recipient) document.getElementById('replay-experience').classList.remove('hidden');
    if (card.effects) burstParticles();
    if (card.chime && (recipient || !soundEnabled)) playChime();
    if (recipient && card.modules.typewriter) typewriterReveal();
}

function replayExperience() {
    stopBlowDetection();
    clearInterval(typingTimer);
    const audio = document.getElementById('recipient-audio');
    audio.pause();
    audio.currentTime = 0;
    const stage = document.getElementById('recipient-stage');
    stage.classList.remove('is-open', 'is-replaying');
    document.getElementById('recipient-prompt').textContent = card.experience === 'giftbox'
        ? 'A small gift, wrapped just for you.'
        : ['direct', 'moment'].includes(card.experience)
            ? 'A note, ready when you are.'
            : 'A note, sealed with care.';
    renderRecipient();
    setupScratch();
    if (['direct', 'moment'].includes(card.experience)) {
        void stage.offsetWidth;
        stage.classList.add('is-replaying');
        if (card.modules.typewriter) typewriterReveal();
        setTimeout(() => stage.classList.remove('is-replaying'), 1100);
    }
    document.getElementById('confetti-layer').replaceChildren();
}

function syncSoundControl() {
    const button = document.getElementById('sound-toggle');
    if (!button) return;
    button.textContent = soundEnabled ? 'Sound on' : 'Sound off';
    button.setAttribute('aria-pressed', String(soundEnabled));
    button.setAttribute('aria-label', soundEnabled ? 'Mute sound' : 'Turn sound on');
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    syncSoundControl();
    if (soundEnabled) {
        playChime();
        return;
    }
    if (audioContext) {
        const now = audioContext.currentTime;
        chimeGainNodes.forEach(gain => {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setTargetAtTime(0.0001, now, 0.015);
        });
    }
}

function typewriterReveal() {
    const element = document.getElementById('recipient-card-message');
    const fullText = card.wish;
    clearInterval(typingTimer);
    element.textContent = '';
    let index = 0;
    typingTimer = setInterval(() => {
        element.textContent = fullText.slice(0, ++index);
        if (index >= fullText.length) clearInterval(typingTimer);
    }, 22);
}

function burstParticles() {
    const layer = document.getElementById('confetti-layer');
    const colors = themePalette[card.theme];
    for (let index = 0; index < 56; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'confetti-piece';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.backgroundColor = colors[index % colors.length];
        particle.style.animationDelay = `${Math.random() * 0.6}s`;
        particle.style.setProperty('--drift', `${Math.random() * 200 - 100}px`);
        layer.appendChild(particle);
        setTimeout(() => particle.remove(), 3400);
    }
}

function playChime() {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return showToast('Audio chimes are not supported in this browser.');
    try {
        audioContext = audioContext || new AudioClass();
        if (audioContext.state === 'suspended') audioContext.resume();
        const time = audioContext.currentTime;
        [523.25, 659.25, 783.99].forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.type = 'sine'; oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(0.0001, time + index * .17);
            gain.gain.exponentialRampToValueAtTime(.1, time + index * .17 + .04);
            gain.gain.exponentialRampToValueAtTime(.0001, time + index * .17 + .55);
            chimeGainNodes.push(gain);
            oscillator.onended = () => { chimeGainNodes = chimeGainNodes.filter(active => active !== gain); };
            oscillator.connect(gain); gain.connect(audioContext.destination);
            oscillator.start(time + index * .17); oscillator.stop(time + index * .17 + .58);
        });
    } catch (error) { showToast(`Could not play the chime: ${error.message}`); }
}

function doMoment() {
    if (!document.body.classList.contains('recipient-mode')) {
        const art = document.getElementById('studio-occasion-art');
        const previewButton = document.getElementById('studio-moment-button');
        if (card.occasion === 'birthday') {
            art.innerHTML = '<span class="cake">🎂</span>';
            previewButton.classList.add('hidden');
            document.getElementById('studio-blow-button').classList.remove('hidden');
        } else {
            art.classList.add('moment-glow');
            art.innerHTML = '<span class="wish-revealed">A wish, sent with care.</span>';
            previewButton.textContent = 'Send the wish again';
            if (card.effects) burstParticles();
            if (card.chime) playChime();
        }
        return;
    }
    if (card.occasion === 'birthday') {
        document.getElementById('occasion-art').innerHTML = '<span class="cake">🎂</span>';
        document.getElementById('moment-button').classList.add('hidden');
        document.getElementById('blow-button').classList.remove('hidden');
        document.getElementById('mic-blow-button').classList.toggle('hidden', !navigator.mediaDevices?.getUserMedia);
    } else {
        const art = document.getElementById('occasion-art');
        art.classList.add('moment-glow');
        document.getElementById('moment-button').textContent = 'A wish, sent with care';
        showToast(card.occasion === 'eid' ? 'Eid Mubarak. May the good stay with you.' : 'A small wish, sent with care.');
        if (card.effects) burstParticles();
        if (soundEnabled) playChime();
    }
}

function celebrateMoment() {
    const art = document.getElementById('occasion-art');
    art.classList.add('candles-out');
    art.innerHTML = '<span class="cake">🎂</span><span class="wish-revealed">Make a wish.</span>';
    document.getElementById('blow-button').classList.add('hidden');
    document.getElementById('mic-blow-button').classList.add('hidden');
    if (card.effects) burstParticles();
    if (soundEnabled) playChime();
}

function celebrateStudioMoment() {
    const art = document.getElementById('studio-occasion-art');
    art.classList.add('moment-glow');
    art.innerHTML = '<span class="cake">🎂</span><span class="wish-revealed">Make a wish.</span>';
    document.getElementById('studio-blow-button').textContent = 'Celebrate again';
    if (card.effects) burstParticles();
    if (card.chime) playChime();
}

async function listenForBlow() {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!navigator.mediaDevices?.getUserMedia || !AudioClass) return showToast('Microphone detection is unavailable; tap the candle button instead.');
    try {
        blowingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = audioContext || new AudioClass();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(blowingStream);
        source.connect(analyser);
        analyser.fftSize = 512;
        const samples = new Uint8Array(analyser.fftSize);
        const started = Date.now();
        const detect = () => {
            analyser.getByteTimeDomainData(samples);
            let power = 0;
            samples.forEach(sample => { const delta = (sample - 128) / 128; power += delta * delta; });
            const volume = Math.sqrt(power / samples.length);
            if (volume > .19 && Date.now() - started > 450) {
                stopBlowDetection(); celebrateMoment(); return;
            }
            if (Date.now() - started < 9000) blowingFrame = requestAnimationFrame(detect);
            else { stopBlowDetection(); showToast('Did not catch a blow. Use the tap-to-celebrate option instead.'); }
        };
        showToast('Blow gently toward your microphone.');
        detect();
    } catch (error) { stopBlowDetection(); showToast(`Microphone access was not available: ${error.message}`); }
}
function stopBlowDetection() {
    if (blowingFrame) cancelAnimationFrame(blowingFrame);
    blowingStream?.getTracks().forEach(track => track.stop());
    blowingStream = null;
}

function setupScratch() {
    if (!card.modules.scratch) return;
    document.querySelectorAll('#scratch-canvas, #studio-scratch-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#927143'); gradient.addColorStop(.45, '#f4dda1'); gradient.addColorStop(.72, '#c6a665'); gradient.addColorStop(1, '#8e7045');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#51432e'; ctx.font = '600 23px "DM Sans", Arial'; ctx.textAlign = 'center';
        ctx.fillText('Scratch to reveal', canvas.width / 2, canvas.height / 2 + 8);
        if (canvas.dataset.listenersReady) return;
        canvas.dataset.listenersReady = 'true';
        let scratching = false;
        const point = event => {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) * canvas.width / rect.width;
            const y = (event.clientY - rect.top) * canvas.height / rect.height;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
        };
        canvas.addEventListener('pointerdown', event => { scratching = true; canvas.setPointerCapture(event.pointerId); point(event); });
        canvas.addEventListener('pointermove', event => { if (scratching) point(event); });
        canvas.addEventListener('pointerup', () => { scratching = false; });
        canvas.addEventListener('pointercancel', () => { scratching = false; });
    });
}

async function beginRecording() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return showToast('Voice recording is not supported in this browser.');
    try {
        recorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorderChunks = [];
        recorder = new MediaRecorder(recorderStream, { audioBitsPerSecond: 24000 });
        recorder.ondataavailable = event => { if (event.data.size) recorderChunks.push(event.data); };
        recorder.onstop = async () => {
            try {
                const blob = new Blob(recorderChunks, { type: recorder.mimeType || 'audio/webm' });
                if (blob.size > 45000) {
                    showToast('That recording is too large to fit reliably in a share link. Try a shorter note.');
                    return;
                }
                card.audioData = await blobToDataUrl(blob);
                document.getElementById('recording-status').textContent = `${Math.ceil(blob.size / 1024)} KB voice note attached`;
                refreshSharing();
            } catch (error) { showToast(`Could not attach the recording: ${error.message}`); }
            finally { recorderStream?.getTracks().forEach(track => track.stop()); recorderStream = null; }
        };
        recorder.start();
        document.getElementById('record-audio').classList.add('hidden');
        document.getElementById('stop-recording').classList.remove('hidden');
        document.getElementById('recording-status').textContent = 'Recording…';
        setTimeout(() => { if (recorder?.state === 'recording') stopRecording(); }, 12000);
    } catch (error) { showToast(`Microphone access was not available: ${error.message}`); }
}
function stopRecording() {
    if (recorder?.state === 'recording') recorder.stop();
    document.getElementById('record-audio').classList.remove('hidden');
    document.getElementById('stop-recording').classList.add('hidden');
}
function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Could not read the voice recording.'));
        reader.readAsDataURL(blob);
    });
}

function createOwnCard() {
    const url = new URL(location.href);
    url.search = ''; url.hash = '';
    location.assign(url.href);
}
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3300);
}
