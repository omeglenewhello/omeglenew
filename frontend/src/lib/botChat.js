// Bot conversation engine — runs client-side when no real user is found

export const BOT_TIMEOUT_MS = 2000; // connect bot after 2 seconds

// Opening messages sent automatically after connecting
export const OPENING_SCRIPT = [
  { delay: 800,  text: 'F' },
  { delay: 1800, text: 'hey' },
];

// Keyword -> response map (girly / Hinglish style)
const RESPONSES = [
  {
    keywords: ['hi', 'hey', 'hello', 'hii', 'heyy', 'sup', 'yo', 'helo', 'hlo'],
    replies: [
      'hiii finally koi toh aaya',
      'heyy! kitne saal ke ho?',
      'hiii, age bolo pehle',
    ],
  },
  {
    keywords: ['asl', 'a/s/l', 'age', 'how old', 'kitne saal', 'umar', 'age?', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
    replies: [
      'aww nice, main 21 hoon. kahan se ho?',
      'main bhi around same age ki hoon. tum kahan se ho?',
      'oh okay okay. main 22 f delhi. tum?',
    ],
  },
  {
    keywords: ['kaise ho', 'kaisa hai', 'how are you', 'how r u', 'how ru', 'kya haal', 'sab theek'],
    replies: [
      'theek hoon bas thodi akeli thi toh yahan aa gayi haha. tum?',
      'acha hoon! tum batao kya chal raha?',
      'mast hoon tum kaise ho?',
    ],
  },
  {
    keywords: ['kya kar rahe', 'kya kar rahi', 'what doing', 'watcha doing', 'up to', 'busy'],
    replies: [
      'kuch nahi yaar ghar pe bore ho rahi thi. tum?',
      'bas phone chala rahi hoon. tum kya kar rahe?',
      'kuch nahi seriously kuch nahi lol. tum?',
    ],
  },
  {
    keywords: ['kahan se', 'kahan ho', 'where from', 'which city', 'which state', 'location', 'city', 'state', 'place', 'konsa', 'kaun sa'],
    replies: [
      'delhi se hoon. tum?',
      'mumbai se. tum kahan se ho?',
      'UP se hoon, tum?',
    ],
  },
  {
    keywords: ['naam', 'name', 'kya naam', 'what name', 'call you', 'apna naam', 'tera naam', 'tumhara naam'],
    replies: [
      'abhi nahi bataungi haha pehle thoda baat karo. tumhara?',
      'secret abhi ke liye. tum batao apna?',
      'pehle tum batao',
    ],
  },
  {
    keywords: ['single', 'relationship', 'boyfriend', 'gf', 'dating', 'committed', 'pyaar', 'love'],
    replies: [
      'haan single hoon tabhi toh yahan hoon lol. tum?',
      'single hoon, koi nahi hai. tum?',
      'abhi koi nahi hai life mein. tum?',
    ],
  },
  {
    keywords: ['girlfriend', 'gf', 'chahiye', 'milna', 'dosti', 'friend'],
    replies: [
      'haha seedha point pe aa gaye',
      'pehle baat karo theek se phir dekhte hain lol',
      'itni jaldi? thoda toh baat karo',
    ],
  },
  {
    keywords: ['photo', 'pic', 'picture', 'selfie', 'send pic', 'dikhao', 'dekh', 'dekhna'],
    replies: [
      'nahi yaar stranger ko pic nahi deti',
      'pehle thoda baat karte hain',
      'trust toh banao pehle',
    ],
  },
  {
    keywords: ['number', 'insta', 'instagram', 'snap', 'snapchat', 'whatsapp', 'contact', 'id'],
    replies: [
      'itni jaldi yaar, abhi toh mila bhi nahi theek se',
      'pehle baat karo thoda',
      'abhi nahi, pehle baat karte hain na',
    ],
  },
  {
    keywords: ['job', 'kaam', 'work', 'student', 'college', 'school', 'padhai', 'study', 'konsa college', 'kaun sa college'],
    replies: [
      'college mein hoon 3rd year. tum padhte ho ya job?',
      'abhi padh rahi hoon. tum?',
      'student hoon. tum kya karte ho?',
    ],
  },
  {
    keywords: ['handsome', 'cute', 'smart', 'accha lagta', 'sundar', 'kaisa dikhta', 'looks'],
    replies: [
      'haha tum apne aap ko cute bolte ho',
      'acha acha, proof kahan hai lol',
      'modest nahi ho bilkul haha',
    ],
  },
  {
    keywords: ['cricket', 'ipl', 'virat', 'rohit', 'match', 'khel'],
    replies: [
      'haan cricket dekhti hoon thoda. tum?',
      'virat ko pasand karte ho? main bhi fan hoon',
      'IPL mein kaun si team?',
    ],
  },
  {
    keywords: ['bollywood', 'movie', 'film', 'netflix', 'series', 'web series', 'dekha', 'watch'],
    replies: [
      'haan koi recommendation hai? main toh netflix pe hi hoon',
      'latest kya dekha tumne?',
      'Mirzapur dekha hai? bahut acha hai',
    ],
  },
  {
    keywords: ['music', 'song', 'gaana', 'singer', 'arijit', 'atif', 'rap', 'sunna'],
    replies: [
      'arijit singh is life yaar. tum?',
      'music bahut sunti hoon. fav singer kaun hai?',
      'lofi sunti hoon mostly. tum?',
    ],
  },
  {
    keywords: ['gaming', 'game', 'bgmi', 'pubg', 'freefire', 'valorant', 'cod'],
    replies: [
      'main gamer nahi hoon lol. tum khelte ho?',
      'gaming nahi aata mujhe. tum khelate ho?',
      'mera bhai khelta hai din raat haha. tum?',
    ],
  },
  {
    keywords: ['khana', 'food', 'biryani', 'pizza', 'chai', 'coffee', 'hungry', 'bhookh'],
    replies: [
      'baat mat karo khane ki bhookh lag rahi hai ab',
      'biryani mention kiya?? bahut pasand hai mujhe',
      'chai > coffee, bas. agree karte ho?',
    ],
  },
  {
    keywords: ['bored', 'bore', 'kuch nahi', 'timepass', 'akela', 'akeli'],
    replies: [
      'main bhi bore thi isiliye yahan hoon. baat karo',
      'same yaar. chalo baat karte hain',
      'toh phir baat karo mujhse',
    ],
  },
  {
    keywords: ['lol', 'lmao', 'haha', 'hehe', 'funny', 'mast', 'pagal', 'bakwaas'],
    replies: [
      'hahaha',
      'lmaoo yaar',
      'sach mein bol raha hai?',
      'hahaha pagal ho',
    ],
  },
  {
    keywords: ['accha', 'achha', 'okay', 'ok', 'theek', 'sahi', 'haan', 'han', 'hmm'],
    replies: [
      'haan toh aur batao',
      'achha achha, phir?',
      'okay so aur kya?',
      'hmm aur batao',
    ],
  },
  {
    keywords: ['nahi', 'nope', 'no', 'nahin', 'mat'],
    replies: [
      'kyun nahi yaar',
      'arey kyun?',
      'haha okay okay',
    ],
  },
  {
    keywords: ['bye', 'byee', 'bb', 'alvida', 'chalta hoon', 'gtg', 'nikalna', 'jaana hai'],
    replies: [
      'aww itni jaldi? bye yaar',
      'arey ruko na thodi der. achha bye',
      'okay bye! achi baat hui',
    ],
  },
  {
    keywords: ['real', 'bot', 'fake', 'ai', 'robot', 'automated', 'asli'],
    replies: [
      'haha obviously real hoon yaar. aisa kyun laga?',
      'main real hoon, bot nahi',
      'arre yaar real hoon main',
    ],
  },
  {
    keywords: ['pyaar', 'love', 'pasand', 'like you', 'mil sakte', 'milna chahta'],
    replies: [
      'haha itni jaldi? abhi toh mila bhi nahi',
      'pehle dost toh bano',
      'haha seedha dil de diya',
    ],
  },
];

const FALLBACKS = [
  'haan?',
  'achha toh?',
  'sach mein?',
  'arey yaar',
  'haan bolo',
  'interesting',
  'waise suno',
  'aur batao',
  'lol yaar',
  'really?',
  'phir kya hua?',
  'hmm',
  'acha acha',
  'matlab?',
];

function randomIn(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomDelay(min = 700, max = 1800) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getBotResponse(userText) {
  const lower = (userText || '').toLowerCase();
  for (const entry of RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { text: randomIn(entry.replies), delay: randomDelay() };
    }
  }
  return { text: randomIn(FALLBACKS), delay: randomDelay(500, 1200) };
}
