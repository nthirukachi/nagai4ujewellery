export const SITE_DETAILS = {
  myName: 'nagaraju thirukachi',
  firstName: 'Nagaraju',
  businessName: 'nagai4u',
  whoIHelp: 'Jewellery Store, Real Estate, Industries',
  city: 'Hyderabad',
  promiseBefore: 'Every enquiry ',
  promiseHighlight: 'answered,',
  promiseAfter: ' every buyer followed up.',
  whatISetUpSentence:
    'I set up a short enquiry form that sorts and flags each buyer, a follow-up board that shows who to chase and how much money is still open, and a daily morning note for the store.',
  price: 'Rs 15,000 setup + Rs 4,000 a month',
  bookingUrl: 'https://cal.com/nagai4u/20-min-ai-business-discovery-call-with-nag',
  whatsappUrl: 'https://wa.me/918978967171',
  whatsappDisplay: '+91 8978967171',
  emailUrl: 'mailto:nagaraju.thirukachi@gmail.com',
  emailDisplay: 'nagaraju.thirukachi@gmail.com',
  year: '2026',
  problemSentence:
    'While you are with a buyer in front of you, new enquiries wait in your messages, open quotes go quiet in old chats, and your evening disappears into checking who still needs an answer.',
  aboutLetter:
    'I am Nagaraju. I have been working as a software engineer, mainly with Java and enterprise applications. I have been working with AI for the last 3 years now, and I have helped 5+ businesses automate their processes with the help of AI. I am very passionate about making the business process clear and simple.',
} as const;

export interface WorkItem {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  today: string;
  withBrand: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    number: '01',
    title: 'Short enquiry form',
    image: '/work-1.jpg',
    imageAlt: 'Buyer enquiry sorted and flagged by nagai4u',
    today: 'Buyer enquiries arrive scattered across calls and chats with key details missing.',
    withBrand: 'A short enquiry form sorts and flags each buyer when they reach out.',
  },
  {
    number: '02',
    title: 'Follow-up board',
    image: '/work-2.jpg',
    imageAlt: 'nagai4u follow-up board showing open buyer enquiries',
    today: 'Serious buyers go quiet because nobody can see which quotes are still waiting.',
    withBrand: 'A follow-up board shows who to chase and how much money is still open.',
  },
  {
    number: '03',
    title: 'Daily morning note',
    image: '/work-3.jpg',
    imageAlt: 'Store owner reviewing the daily morning note on a phone',
    today: 'Your team opens for the day asking what came in yesterday and who needs a call.',
    withBrand: 'A daily morning note gives the store a clear list of buyers to reach.',
  },
];

export const BEFORE_AFTER = {
  withoutLabel: 'Without nagai4u',
  withLabel: 'With nagai4u',
  withoutLines: [
    'You close for the evening with unread buyer enquiries still sitting in your phone.',
    'You scroll through old chats trying to recall which buyer asked for a price.',
    'Open money stays stuck because nobody marked who needed a follow-up call.',
    'Your next morning begins with guesswork over who your team should contact.',
  ],
  withLines: [
    'Each buyer enquiry from the day is sorted and flagged through your short form.',
    'Your follow-up board shows who to chase and how much money is still open.',
    'You end the evening knowing every enquiry is tracked in a clear place.',
    'Your team starts the day with a daily morning note ready for the store.',
  ],
} as const;

export interface StepItem {
  number: string;
  title: string;
  body: string;
}

export const HOW_WE_START_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'A 20 minute call',
    body: 'You walk me through how enquiries reach your Jewellery Store, Real Estate, or Industries business today and where buyers slip away.',
  },
  {
    number: '02',
    title: 'A plan for your business',
    body: 'I map out your short enquiry form, your follow-up board, and your daily morning note around how your team works.',
  },
  {
    number: '03',
    title: 'I set it up and show your team',
    body: 'I set each piece up in days, walk your team through using it, and keep it running for a small monthly amount.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who is nagai4u for?',
    answer:
      'I help Jewellery Store, Real Estate, and Industries businesses in Hyderabad who want every enquiry answered and every buyer followed up.',
  },
  {
    question: 'What do you set up?',
    answer:
      'nagai4u builds a short enquiry form that sorts and flags each buyer, a follow-up board that shows who to chase and how much money is still open, and a daily morning note for the store.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'I set each part up in days, and we agree the exact schedule for your business on our call.',
  },
  {
    question: 'What does it cost?',
    answer: 'Rs 15,000 setup + Rs 4,000 a month.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a 20 minute call using the button on this page, or reach out on WhatsApp or email. On the call we look at your current enquiries and agree how to begin.',
  },
];
