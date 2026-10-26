import { Question, Prize } from './types';

export const QUESTIONS: Question[] = [
  // Q1 - Easy
  {
    id: 1,
    question: 'You need to summarize a 20-page confidential company report for your manager. What is the main risk of pasting the entire document into a free, public AI chatbot?',
    options: [
      'The AI might give you an inaccurate summary.',
      'The company will be charged a fee for using the AI.',
      'The confidential data you pasted is now on an external server, can be saved, and may be used to train the AI, effectively causing a data breach.',
      'The AI will save a copy on your local hard drive.'
    ],
    correctAnswer: 'The confidential data you pasted is now on an external server, can be saved, and may be used to train the AI, effectively causing a data breach.',
    explanation: 'Treat public AI chatbots like a public postcard. Never paste any internal, confidential, or customer data into them. The data leaves company control and can train external models.',
    category: 'AI SAFETY // PRIVACY',
    hostAdvice: 'First question for €100! Read all four choices carefully—public tools are not private vaults.',
    clue: 'Rule-of-Thumb: If you wouldn\'t publish it on a billboard, never paste it into a free public chatbot.'
  },
  // Q2 - Easy
  {
    id: 2,
    question: 'How has generative AI made phishing emails so much more dangerous?',
    options: [
      'It allows attackers to send 100x more emails than before.',
      'It helps attackers write perfectly convincing, personalized emails with no spelling mistakes, that can mimic the tone of a real colleague or department.',
      'It embeds viruses directly into the text of the email.',
      'It can guess your password and include it in the email.'
    ],
    correctAnswer: 'It helps attackers write perfectly convincing, personalized emails with no spelling mistakes, that can mimic the tone of a real colleague or department.',
    explanation: 'The old advice to "look for spelling/grammar errors" is no longer reliable. AI allows attackers to craft flawless, customized, and highly believable spear-phishing messages at scale.',
    category: 'PHISHING // AI THREATS',
    hostAdvice: 'Beware of flawless grammar! Today\'s attackers use generative models to craft authentic company tones.',
    clue: 'Rule-of-Thumb: Grammatical perfection no longer equals authenticity. Always check the sender\'s actual email domain.'
  },
  // Q3 - Easy
  {
    id: 3,
    question: 'What is the hidden risk of an employee using their work email for a "free" online registration (like a newsletter or a shopping site)?',
    options: [
      'They will receive a lot of spam, which wastes company time.',
      'When that shopping site is inevitably breached, your corporate email address is now in a list that hackers buy and sell.',
      'It violates the company\'s "Acceptable Use" policy, which could lead to a warning.',
      'All of the above.'
    ],
    correctAnswer: 'All of the above.',
    explanation: 'All three are true. Attackers harvest corporate email addresses from consumer site leaks to run credential stuffing and targeted phishing against your company.',
    category: 'IDENTITY // EMAIL HYGIENE',
    hostAdvice: 'Think about where your corporate identity travels when you register on third-party sites.',
    clue: 'Rule-of-Thumb: Keep corporate and personal identities strictly segregated.'
  },
  // Q4 - Easy
  {
    id: 4,
    question: 'You\'re at a coffee shop on public Wi-Fi, and your company VPN connects. You see the "lock" icon. You are now...',
    options: [
      '100% secure. The VPN encrypts everything, so you are safe from all hackers.',
      'Secure from people on the Wi-Fi seeing your data, but you are not protected from someone looking over your shoulder ("shoulder surfing").',
      'Secure from "shoulder surfing" because the VPN also blurs your screen.',
      'No safer than before. Public Wi-Fi can break VPN encryption.'
    ],
    correctAnswer: 'Secure from people on the Wi-Fi seeing your data, but you are not protected from someone looking over your shoulder ("shoulder surfing").',
    explanation: 'A VPN protects your network data in transit. It cannot stop someone standing right behind you from filming or reading your confidential screen.',
    category: 'NETWORK // PHYSICAL SECURITY',
    hostAdvice: 'Encryption protects the wire, but what about the physical space around your laptop?',
    clue: 'Rule-of-Thumb: Digital encryption cannot stop physical eyes. A privacy filter screen is essential in public.'
  },
  // Q5 - Milestone 1 (€1,000 Safe Haven)
  {
    id: 5,
    question: 'What is the primary combined risk of posting "Having an amazing 10-day vacation in Spain!" on your public social media?',
    options: [
      'Physical Risk: It announces your home is empty, making it a target.',
      'Digital Risk: It tells attackers you\'re away, making impersonation easier.',
      'Both of the above are major risks created by oversharing.',
      'No real risk, it\'s just a social media post.'
    ],
    correctAnswer: 'Both of the above are major risks created by oversharing.',
    explanation: 'Oversharing provides recon for both physical burglaries and social engineering attacks against your workplace while you are unreachable.',
    category: 'SOCIAL MEDIA // OVERSHARING',
    hostAdvice: 'Safe haven milestone question! Lock in €1,000 guaranteed bank payout here.',
    clue: 'Rule-of-Thumb: Post trip photos after you return home, not while you are away.'
  },
  // Q6 - Medium
  {
    id: 6,
    question: 'You receive an invoice from a known vendor. This month, it has a new QR code on it to "Pay Faster." Is it safe to scan and pay?',
    options: [
      'Yes, it\'s a convenient new feature from a trusted vendor.',
      'No, any change in payment method must be verified through a separate, trusted channel.',
      'Yes, but only if the email came from the correct address.',
      'No, because QR codes can\'t be used for payments.'
    ],
    correctAnswer: 'No, any change in payment method must be verified through a separate, trusted channel.',
    explanation: 'Compromised vendor accounts frequently inject fraudulent payment details or rogue QR codes. Always verify payment detail changes via an established phone contact.',
    category: 'FRAUD // VENDOR RISK',
    hostAdvice: 'Payment route modifications are the #1 indicator of Business Email Compromise.',
    clue: 'Rule-of-Thumb: Never pay via new payment instructions without verbal out-of-band confirmation.'
  },
  // Q7 - Medium
  {
    id: 7,
    question: 'You find a high-quality poster in the breakroom with your company\'s logo. It says, "Scan here to join the new AI-powered company lottery!" with a QR code. What is the risk?',
    options: [
      'The lottery is probably a waste of time.',
      'This is likely "Quishing" (QR Phishing); the code could lead to a fake site to steal your password.',
      'The QR code will install a company-approved tracking app on your phone.',
      'There is no risk; if it\'s inside the office, it must be official.'
    ],
    correctAnswer: 'This is likely "Quishing" (QR Phishing); the code could lead to a fake site to steal your password.',
    explanation: 'Physical presence in an office is not proof of trust. Attackers routinely place physical QR stickers ("Quishing") on breakroom walls and reception areas.',
    category: 'QUISHING // SOCIAL ENGINEERING',
    hostAdvice: 'Physical trust bias is real. Bad actors easily walk into cafeterias and paste malicious QR codes.',
    clue: 'Rule-of-Thumb: Treat QR codes like unverified URL links. Inspect destination domains before entering credentials.'
  },
  // Q8 - Medium
  {
    id: 8,
    question: 'You see a great new AI photo-editing app. It\'s free, but it asks for Full Access to your phone\'s photos, contacts, and microphone. What is the most likely "cost" of this "free" app?',
    options: [
      'The app will just show you a lot of annoying ads.',
      'The app is a form of "spyware," harvesting your personal data to sell or misuse.',
      'The app needs these permissions to work correctly, like for voice commands.',
      'The app will just use a lot of your phone\'s battery.'
    ],
    correctAnswer: 'The app is a form of "spyware," harvesting your personal data to sell or misuse.',
    explanation: 'If a product is free, you and your data are the product. Excessive permissions allow predatory apps to exfiltrate company address books and confidential imagery.',
    category: 'MOBILE SECURITY // APP PERMISSIONS',
    hostAdvice: 'Ask yourself: Why does a photo filters app need your microphone and entire address book?',
    clue: 'Rule-of-Thumb: Deny all permissions not strictly required for the core function of the app.'
  },
  // Q9 - Medium
  {
    id: 9,
    question: 'You\'re in a rental car and connect your phone via Bluetooth. The car\'s screen asks, "Allow contacts and recent calls to sync?" What is the true risk of clicking "Allow"?',
    options: [
      'It\'s no risk. The car deletes the data as soon as you disconnect.',
      'The car\'s system might get a virus from your phone.',
      'The car\'s system stores your contacts and call logs, and the next renter could access this data.',
      'It will drain your phone battery faster, but that\'s the only risk.'
    ],
    correctAnswer: 'The car\'s system stores your contacts and call logs, and the next renter could access this data.',
    explanation: 'Modern vehicle infotainment systems persist local copies of synced contacts, call logs, and GPS history indefinitely until manually factory-reset.',
    category: 'IOT // VEHICLE PRIVACY',
    hostAdvice: 'Rental infotainment systems retain full address books for the next driver to browse.',
    clue: 'Rule-of-Thumb: Only allow audio streaming, never sync contacts in shared or rental vehicles.'
  },
  // Q10 - Milestone 2 (€32,000 Safe Haven)
  {
    id: 10,
    question: 'A high-level executive whom you recognize is walking behind you into the secure office, but they\'ve forgotten their badge. They say, "Oh, I forgot my badge, can you just hold the door?" What is the correct security action?',
    options: [
      'Let them in; being helpful to an executive is the right choice.',
      'Politely say, "I\'m sorry, but policy requires everyone to badge in. Reception can help you."',
      'Let them in, but then immediately email security to let them know.',
      'Ask them to prove who they are before letting them in.'
    ],
    correctAnswer: 'Politely say, "I\'m sorry, but policy requires everyone to badge in. Reception can help you."',
    explanation: 'Tailgating and piggybacking are among the most successful physical intrusion techniques. Legitimate leaders respect and reward zero-tailgating policies.',
    category: 'PHYSICAL // ANTI-TAILGATING',
    hostAdvice: 'Crucial milestone question! Lock in €32,000 guaranteed cash payout here.',
    clue: 'Rule-of-Thumb: Security procedures apply to everyone equally, regardless of corporate seniority.'
  },
  // Q11 - Hard
  {
    id: 11,
    question: 'Why is it dangerous to plug your work phone into a public USB port (like at an airport or cafe) even if your phone is locked?',
    options: [
      'It isn\'t dangerous if the phone is locked, as no data can be transferred.',
      'The port could perform "Juice Jacking," pushing malware onto your phone or stealing data.',
      'The port is only a risk for Android phones, not iPhones.',
      'It will charge your phone very slowly, which is the only risk.'
    ],
    correctAnswer: 'The port could perform "Juice Jacking," pushing malware onto your phone or stealing data.',
    explanation: 'USB cables carry both electrical power and high-speed data pins. Compromised ports exploit hardware vulnerabilities to execute data transfers without consent.',
    category: 'HARDWARE // JUICE JACKING',
    hostAdvice: 'Public power ports can hide miniature microcontrollers. Only charge through AC wall adapters.',
    clue: 'Rule-of-Thumb: Use your own AC charger plug or a "USB data blocker" dongle in public terminals.'
  },
  // Q12 - Hard
  {
    id: 12,
    question: 'You see an ad for an exclusive, invite-only AI tool that "can predict stock market trends." The website offers a "Sign in with your Microsoft 365 / Google" button for easy access. What is the most likely trap?',
    options: [
      'The AI tool will probably just give you bad stock tips.',
      'The "Sign in with..." button is a fake pop-up designed to steal your work password when you type it.',
      'The site will try to install a cookie on your browser to track you.',
      'The service will have high hidden subscription fees.'
    ],
    correctAnswer: 'The "Sign in with..." button is a fake pop-up designed to steal your work password when you type it.',
    explanation: 'Browser-in-the-Middle (BitM) and fake OAuth modal popups mimic official single sign-on screens pixel-for-pixel to harvest credentials and session tokens.',
    category: 'CREDENTIALS // FAKE OAUTH',
    hostAdvice: 'Look at the address bar inside the popup! Fake OAuth windows cannot match official Microsoft/Google domains.',
    clue: 'Rule-of-Thumb: Check whether the SSO login window is a real browser window with a verifiable SSL cert.'
  },
  // Q13 - Hard
  {
    id: 13,
    question: 'An attacker has your corporate password but not your "Two-Factor Authentication" (2FA) code. What is their most likely next move?',
    options: [
      'They will give up, as 2FA has successfully stopped them.',
      'They will call you, pretending to be IT, and say, "We are testing the 2FA system. Can you please read back the code I just sent you?"',
      'They will try to guess the 6-digit code.',
      'They will email you asking for the code.'
    ],
    correctAnswer: 'They will call you, pretending to be IT, and say, "We are testing the 2FA system. Can you please read back the code I just sent you?"',
    explanation: 'Attacker-initiated MFA fatigue and vishing (voice phishing) deceive users into reading back one-time passcodes or approving unexpected push notifications.',
    category: '2FA DEFENSE // VISHING',
    hostAdvice: 'Attackers who obtain passwords will immediately trigger 2FA prompts and phone you posing as Help Desk.',
    clue: 'Rule-of-Thumb: Legitimate IT technicians will NEVER ask you to read back a 2FA code.'
  },
  // Q14 - Hard
  {
    id: 14,
    question: 'An email that appears to be from your CEO, sent from their phone, says: "I\'m in a meeting, can you urgently process a wire transfer to this new vendor?" What is the most critical next step?',
    options: [
      'Process the payment, as the request is from the CEO and is marked urgent.',
      'Reply to the email to confirm the amount and vendor details before processing.',
      'Forward the email to the finance department and let them handle the request.',
      'Verify the request through a different channel, like a phone call or instant message to the CEO.'
    ],
    correctAnswer: 'Verify the request through a different channel, like a phone call or instant message to the CEO.',
    explanation: 'CEO Fraud and Business Email Compromise (BEC) depend on fabricated urgency and out-of-office excuses. Always verify financial transfers out-of-band.',
    category: 'CEO FRAUD // BEC',
    hostAdvice: 'One question away from the million! High urgency + money transfer = standard CEO scam blueprint.',
    clue: 'Rule-of-Thumb: Never reply to the suspected email. Call the executive on a known, verified phone number.'
  },
  // Q15 - Millionaire Question (€1,000,000)
  {
    id: 15,
    question: 'You realize you have just clicked on a suspicious link in an email and may have downloaded malware. What is the absolute FIRST thing you should do?',
    options: [
      'Immediately shut down your computer to stop any malicious processes.',
      'Run a full antivirus scan to find and remove the malware.',
      'Disconnect your computer from the network (unplug ethernet or turn off Wi-Fi).',
      'Delete the email from your inbox and then empty the trash folder.'
    ],
    correctAnswer: 'Disconnect your computer from the network (unplug ethernet or turn off Wi-Fi).',
    explanation: 'Severing network connectivity immediately halts Command & Control (C2) communication, stops lateral movement across the enterprise, and isolates the endpoint before data exfiltration occurs.',
    category: 'INCIDENT RESPONSE // CONTAINMENT',
    hostAdvice: 'The €1,000,000 question! What is the decisive golden action when an active breach is triggered?',
    clue: 'Rule-of-Thumb: Containment first! Cut network cables and disable Wi-Fi to stop lateral infection, then notify SecOps.'
  },
];

export const PRIZE_LADDER: Prize[] = [
  { level: 15, prize: '€1,000,000', title: 'Cyber Savvy Champion', isSafeZone: true },
  { level: 14, prize: '€500,000', title: 'Scam Master Detective', isSafeZone: false },
  { level: 13, prize: '€250,000', title: 'Digital Guardian', isSafeZone: false },
  { level: 12, prize: '€125,000', title: 'Phish-Buster Supreme', isSafeZone: false },
  { level: 11, prize: '€64,000', title: 'Privacy Protector', isSafeZone: false },
  { level: 10, prize: '€32,000', title: 'Cyber Safety Hero', isSafeZone: true },
  { level: 9, prize: '€16,000', title: 'Smart Surfer', isSafeZone: false },
  { level: 8, prize: '€8,000', title: 'Passcode Pro', isSafeZone: false },
  { level: 7, prize: '€4,000', title: 'Wi-Fi Watchdog', isSafeZone: false },
  { level: 6, prize: '€2,000', title: 'Inbox Inspector', isSafeZone: false },
  { level: 5, prize: '€1,000', title: 'Safety Scout', isSafeZone: true },
  { level: 4, prize: '€500', title: 'Link Checker', isSafeZone: false },
  { level: 3, prize: '€300', title: 'Privacy Junior', isSafeZone: false },
  { level: 2, prize: '€200', title: 'Password Beginner', isSafeZone: false },
  { level: 1, prize: '€100', title: 'Newbie Navigator', isSafeZone: false },
];