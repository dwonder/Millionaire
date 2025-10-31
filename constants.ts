import { Question, Prize } from './types';

export const QUESTIONS: Question[] = [
  // Q1 - Easy
  {
    id: 1,
    question: 'You need to summarize a 20-page confidential company report for your manager. What is the main risk of pasting the entire document into a free, public AI chatbot?',
    options: ['The AI might give you an inaccurate summary.', 'The company will be charged a fee for using the AI.', 'The confidential data you pasted is now on an external server, can be saved, and may be used to train the AI, effectively causing a data breach.', 'The AI will save a copy on your local hard drive.'],
    correctAnswer: 'The confidential data you pasted is now on an external server, can be saved, and may be used to train the AI, effectively causing a data breach.',
    explanation: 'Treat public AI chatbots like a public postcard. Never paste any internal, confidential, or customer data into them. The data leaves the company\'s control and can be seen by others.',
  },
  // Q2 - Easy
  {
    id: 2,
    question: 'How has generative AI made phishing emails so much more dangerous?',
    options: ['It allows attackers to send 100x more emails than before.', 'It helps attackers write perfectly convincing, personalized emails with no spelling mistakes, that can mimic the tone of a real colleague or department.', 'It embeds viruses directly into the text of the email.', 'It can guess your password and include it in the email.'],
    correctAnswer: 'It helps attackers write perfectly convincing, personalized emails with no spelling mistakes, that can mimic the tone of a real colleague or department.',
    explanation: 'The old advice to "look for spelling/grammar errors" is no longer reliable. AI allows attackers to craft flawless, customized, and highly believable "spear-phishing" emails at a massive scale.',
  },
  // Q3 - Easy
  {
    id: 3,
    question: 'What is the hidden risk of an employee using their work email for a "free" online registration (like a newsletter or a shopping site)?',
    options: ['They will receive a lot of spam, which wastes company time.', 'When that shopping site is inevitably breached, your corporate email address is now in a list that hackers buy and sell.', 'It violates the company\'s "Acceptable Use" policy, which could lead to a warning.', 'All of the above.'],
    correctAnswer: 'All of the above.',
    explanation: 'All three are true, but the breach risk is most significant. Attackers will buy that list and start targeting your corporate email with phishing and password-guessing attacks, knowing it\'s a valid, active address.',
  },
  // Q4 - Easy
  {
    id: 4,
    question: 'You\'re at a coffee shop on public Wi-Fi, and your company VPN connects. You see the "lock" icon. You are now...',
    options: ['100% secure. The VPN encrypts everything, so you are safe from all hackers.', 'Secure from people on the Wi-Fi seeing your data, but you are not protected from someone looking over your shoulder ("shoulder surfing").', 'Secure from "shoulder surfing" because the VPN also blurs your screen.', 'No safer than before. Public Wi-Fi can break VPN encryption.'],
    correctAnswer: 'Secure from people on the Wi-Fi seeing your data, but you are not protected from someone looking over your shoulder ("shoulder surfing").',
    explanation: 'A VPN protects your data in transit. It does not protect your screen from being seen. You have only solved half the problem. A privacy screen is the other half.',
  },
  // Q5 - Easy (Safe Haven)
  {
    id: 5,
    question: 'What is the primary combined risk of posting "Having an amazing 10-day vacation in Spain!" on your public social media?',
    options: ['Physical Risk: It announces your home is empty, making it a target.', 'Digital Risk: It tells attackers you\'re away, making impersonation easier.', 'Both of the above are major risks created by oversharing.', 'No real risk, it\'s just a social media post.'],
    correctAnswer: 'Both of the above are major risks created by oversharing.',
    explanation: 'What you share publicly has both physical (burglary) and digital (impersonation) consequences. Be vague about travel plans and only post photos after you get back.',
  },
  // Q6 - Medium
  {
    id: 6,
    question: 'You receive an invoice from a known vendor. This month, it has a new QR code on it to "Pay Faster." Is it safe to scan and pay?',
    options: ['Yes, it\'s a convenient new feature from a trusted vendor.', 'No, any change in payment method must be verified through a separate, trusted channel.', 'Yes, but only if the email came from the correct address.', 'No, because QR codes can\'t be used for payments.'],
    correctAnswer: 'No, any change in payment method must be verified through a separate, trusted channel.',
    explanation: 'The vendor\'s email could have been hacked. An attacker can add their own QR code to divert your payment. Always verify payment changes with the vendor through a trusted, pre-existing contact.',
  },
  // Q7 - Medium
  {
    id: 7,
    question: 'You find a high-quality poster in the breakroom with your company\'s logo. It says, "Scan here to join the new AI-powered company lottery!" with a QR code. What is the risk?',
    options: ['The lottery is probably a waste of time.', 'This is likely "Quishing" (QR Phishing); the code could lead to a fake site to steal your password.', 'The QR code will install a company-approved tracking app on your phone.', 'There is no risk; if it\'s inside the office, it must be official.'],
    correctAnswer: 'This is likely "Quishing" (QR Phishing); the code could lead to a fake site to steal your password.',
    explanation: '"Inside the office" feels safe, which is the trick. Attackers can easily enter and put up a malicious poster. Never trust a QR code for a sensitive action like logging in, even in a "trusted" area.',
  },
  // Q8 - Medium
  {
    id: 8,
    question: 'You see a great new AI photo-editing app. It\'s free, but it asks for Full Access to your phone\'s photos, contacts, and microphone. What is the most likely "cost" of this "free" app?',
    options: ['The app will just show you a lot of annoying ads.', 'The app is a form of "spyware," harvesting your personal data to sell or misuse.', 'The app needs these permissions to work correctly, like for voice commands.', 'The app will just use a lot of your phone\'s battery.'],
    correctAnswer: 'The app is a form of "spyware," harvesting your personal data to sell or misuse.',
    explanation: 'An AI photo app has no legitimate need for your contacts or microphone. It is likely harvesting your personal data. This is especially risky on a work phone. Always question app permissions.',
  },
  // Q9 - Medium
  {
    id: 9,
    question: 'You\'re in a rental car and connect your phone via Bluetooth. The car\'s screen asks, "Allow contacts and recent calls to sync?" What is the true risk of clicking "Allow"?',
    options: ['It\'s no risk. The car deletes the data as soon as you disconnect.', 'The car\'s system might get a virus from your phone.', 'The car\'s system stores your contacts and call logs, and the next renter could access this data.', 'It will drain your phone battery faster, but that\'s the only risk.'],
    correctAnswer: 'The car\'s system stores your contacts and call logs, and the next renter could access this data.',
    explanation: 'Most people don\'t realize this data is stored. The next renter could browse your contacts. Always use the car\'s settings to "Forget Device" and "Delete Data" before returning it.',
  },
  // Q10 - Medium (Safe Haven)
  {
    id: 10,
    question: 'A high-level executive whom you recognize is walking behind you into the secure office, but they\'ve forgotten their badge. They say, "Oh, I forgot my badge, can you just hold the door?" What is the correct security action?',
    options: ['Let them in; being helpful to an executive is the right choice.', 'Politely say, "I\'m sorry, but policy requires everyone to badge in. Reception can help you."', 'Let them in, but then immediately email security to let them know.', 'Ask them to prove who they are before letting them in.'],
    correctAnswer: 'Politely say, "I\'m sorry, but policy requires everyone to badge in. Reception can help you."',
    explanation: 'This is a socially difficult scenario, which is what attackers exploit. A strict "no-tailgating" policy protects the company from impersonation attacks. Reporting it after the fact is too late.',
  },
  // Q11 - Hard
  {
    id: 11,
    question: 'Why is it dangerous to plug your work phone into a public USB port (like at an airport or cafe) even if your phone is locked?',
    options: ['It isn\'t dangerous if the phone is locked, as no data can be transferred.', 'The port could perform "Juice Jacking," pushing malware onto your phone or stealing data.', 'The port is only a risk for Android phones, not iPhones.', 'It will charge your phone very slowly, which is the only risk.'],
    correctAnswer: 'The port could perform "Juice Jacking," pushing malware onto your phone or stealing data.',
    explanation: '"Juice Jacking" is a real threat where a malicious USB port can install malware or initiate data theft, sometimes even on a locked phone. Always use your own power adapter or a trusted battery pack.',
  },
  // Q12 - Hard
  {
    id: 12,
    question: 'You see an ad for an exclusive, invite-only AI tool that "can predict stock market trends." The website offers a "Sign in with your Microsoft 365 / Google" button for easy access. What is the most likely trap?',
    options: ['The AI tool will probably just give you bad stock tips.', 'The "Sign in with..." button is a fake pop-up designed to steal your work password when you type it.', 'The site will try to install a cookie on your browser to track you.', 'The service will have high hidden subscription fees.'],
    correctAnswer: 'The "Sign in with..." button is a fake pop-up designed to steal your work password when you type it.',
    explanation: 'This is a "credential harvesting" attack. The "Sign in" pop-up looks identical to the real one, but it\'s a web form that sends your password directly to the attacker.',
  },
  // Q13 - Hard
  {
    id: 13,
    question: 'An attacker has your corporate password but not your "Two-Factor Authentication" (2FA) code. What is their most likely next move?',
    options: ['They will give up, as 2FA has successfully stopped them.', 'They will call you, pretending to be IT, and say, "We are testing the 2FA system. Can you please read back the code I just sent you?"', 'They will try to guess the 6-digit code.', 'They will email you asking for the code.'],
    correctAnswer: 'They will call you, pretending to be IT, and say, "We are testing the 2FA system. Can you please read back the code I just sent you?"',
    explanation: 'This is a "2FA Intercept" attack. The attacker has your password, triggers the 2FA, and then immediately calls with a believable story to trick you into giving them the code.',
  },
  // Q14 - Hard
  {
    id: 14,
    question: 'An email that appears to be from your CEO, sent from their phone, says: "I\'m in a meeting, can you urgently process a wire transfer to this new vendor?" What is the most critical next step?',
    options: ['Process the payment, as the request is from the CEO and is marked urgent.', 'Reply to the email to confirm the amount and vendor details before processing.', 'Forward the email to the finance department and let them handle the request.', 'Verify the request through a different channel, like a phone call or instant message to the CEO.'],
    correctAnswer: 'Verify the request through a different channel, like a phone call or instant message to the CEO.',
    explanation: 'This is a classic CEO Fraud tactic. Scammers spoof emails and create false urgency. Replying may go back to the attacker. Always verify unusual financial requests out-of-band.',
  },
  // Q15 - Millionaire Question
  {
    id: 15,
    question: 'You realize you have just clicked on a suspicious link in an email and may have downloaded malware. What is the absolute FIRST thing you should do?',
    options: ['Immediately shut down your computer to stop any malicious processes.', 'Run a full antivirus scan to find and remove the malware.', 'Disconnect your computer from the network (unplug ethernet or turn off Wi-Fi).', 'Delete the email from your inbox and then empty the trash folder.'],
    correctAnswer: 'Disconnect your computer from the network (unplug ethernet or turn off Wi-Fi).',
    explanation: 'Disconnecting from the network is the top priority. It contains the threat, preventing it from spreading to other computers or sending company data out to the attacker. After disconnecting, report it to IT immediately.',
  },
];

export const PRIZE_LADDER: Prize[] = [
  { level: 15, prize: '€1,000,000', title: 'Cybersecurity Millionaire', isSafeZone: false },
  { level: 14, prize: '€500,000', title: '', isSafeZone: false },
  { level: 13, prize: '€250,000', title: 'Security Champion', isSafeZone: false },
  { level: 12, prize: '€125,000', title: '', isSafeZone: false },
  { level: 11, prize: '€64,000', title: '', isSafeZone: false },
  { level: 10, prize: '€32,000', title: 'Data Defender', isSafeZone: true },
  { level: 9, prize: '€16,000', title: '', isSafeZone: false },
  { level: 8, prize: '€8,000', title: '', isSafeZone: false },
  { level: 7, prize: '€4,000', title: '', isSafeZone: false },
  { level: 6, prize: '€2,000', title: '', isSafeZone: false },
  { level: 5, prize: '€1,000', title: 'Phish Fighter', isSafeZone: true },
  { level: 4, prize: '€500', title: '', isSafeZone: false },
  { level: 3, prize: '€300', title: '', isSafeZone: false },
  { level: 2, prize: '€200', title: '', isSafeZone: false },
  { level: 1, prize: '€100', title: 'Cyber Smart Starter', isSafeZone: false },
];