
import { Question, Prize } from './types';

export const QUESTIONS: Question[] = [
  // Easy: Q1-5
  {
    id: 1,
    question: 'You receive an email from your "bank" asking for your password to "verify your account." What should you do?',
    options: ['Reply with your password', 'Click the link and log in', 'Delete the email and report it as phishing', 'Call the number in the email'],
    correctAnswer: 'Delete the email and report it as phishing',
    explanation: 'Banks will never ask for your password via email. This is a classic phishing attempt to steal your credentials.',
  },
  {
    id: 2,
    question: 'What is the best way to create a strong password?',
    options: ['Use your pet\'s name and birthday', 'Use a long, random mix of letters, numbers, and symbols', 'Use "password123"', 'Write it on a sticky note on your monitor'],
    correctAnswer: 'Use a long, random mix of letters, numbers, and symbols',
    explanation: 'Strong passwords are long and complex, making them hard for attackers to guess or crack.',
  },
  {
    id: 3,
    question: 'You find a USB drive in the office parking lot. What is the safest course of action?',
    options: ['Plug it into your computer to find the owner', 'Give it to the IT/Security department', 'Keep it for personal use', 'Plug it into a colleague\'s computer to be safe'],
    correctAnswer: 'Give it to the IT/Security department',
    explanation: 'Unknown USB drives can contain malware. The security team has safe ways to inspect them.',
  },
  {
    id: 4,
    question: 'When using public Wi-Fi (e.g., at a coffee shop), it is safest to:',
    options: ['Do your online banking', 'Assume it\'s secure and use it freely', 'Avoid logging into sensitive accounts', 'Share your password with the barista'],
    correctAnswer: 'Avoid logging into sensitive accounts',
    explanation: 'Public Wi-Fi is often unencrypted, meaning attackers could intercept your data. Avoid sensitive activities unless using a VPN.',
  },
  {
    id: 5,
    question: 'What does "2FA" stand for in cybersecurity?',
    options: ['Two-Factor Authentication', 'Two-Friend Agreement', 'Twice-Failed Access', 'Two-Fold Application'],
    correctAnswer: 'Two-Factor Authentication',
    explanation: '2FA adds a second layer of security to your logins, usually a code from your phone, making it much harder for attackers to get in.',
  },
  // Medium: Q6-10
  {
    id: 6,
    question: 'A caller claiming to be from IT support asks for remote access to your computer to "install updates." This could be a form of:',
    options: ['Social Engineering', 'A Denial-of-Service attack', 'Hardware failure', 'A software bug'],
    correctAnswer: 'Social Engineering',
    explanation: 'Social engineering is the art of manipulating people into giving up confidential information. Always verify such requests through official channels.',
  },
  {
    id: 7,
    question: 'What is the main purpose of a password manager?',
    options: ['To share passwords with your team easily', 'To generate and store unique, complex passwords for all your accounts', 'To remember one simple password for everything', 'To automatically log you out of websites'],
    correctAnswer: 'To generate and store unique, complex passwords for all your accounts',
    explanation: 'Password managers securely store complex, unique passwords, so you only have to remember one master password.',
  },
  {
    id: 8,
    question: 'An "insider threat" in cybersecurity refers to a risk posed by:',
    options: ['A hacker from a competing company', 'A virus from an external website', 'A current or former employee, contractor, or partner', 'A poorly configured firewall'],
    correctAnswer: 'A current or former employee, contractor, or partner',
    explanation: 'Insider threats come from individuals who have legitimate access to an organization\'s assets but misuse it, either maliciously or unintentionally.',
  },
  {
    id: 9,
    question: 'What type of malware encrypts your files and demands a payment to restore them?',
    options: ['Spyware', 'Adware', 'Ransomware', 'A Trojan Horse'],
    correctAnswer: 'Ransomware',
    explanation: 'Ransomware holds your data hostage by encrypting it and demands a ransom, usually in cryptocurrency, for the decryption key.',
  },
  {
    id: 10,
    question: 'Under the Nigeria Data Protection Regulation (NDPR), a key principle is "data minimization." What does this mean?',
    options: ['Collect as much data as possible', 'Collect only the data that is absolutely necessary for a specific purpose', 'Minimize the font size of your privacy policy', 'Store data for a minimum of 10 years'],
    correctAnswer: 'Collect only the data that is absolutely necessary for a specific purpose',
    explanation: 'Data minimization is a core privacy principle that requires organizations to limit the collection of personal information to what is directly relevant and necessary.',
  },
  // Hard: Q11-15
  {
    id: 11,
    question: 'Which of these is a common indicator of a "zero-day" exploit?',
    options: ['A security patch is already available for the vulnerability', 'Unusual network traffic or system behavior for which no known threat exists', 'An employee losing their company laptop', 'A phishing email with many spelling errors'],
    correctAnswer: 'Unusual network traffic or system behavior for which no known threat exists',
    explanation: 'A zero-day exploit targets a vulnerability that is unknown to software vendors, meaning no patch exists, making it a critical threat.',
  },
  {
    id: 12,
    question: 'What is the primary function of a Web Application Firewall (WAF)?',
    options: ['To block all incoming internet traffic', 'To filter, monitor, and block malicious HTTP traffic to and from a web application', 'To scan employee emails for viruses', 'To provide Wi-Fi access to visitors'],
    correctAnswer: 'To filter, monitor, and block malicious HTTP traffic to and from a web application',
    explanation: 'A WAF acts as a shield between a web app and the internet, protecting against common attacks like SQL injection and cross-site scripting (XSS).',
  },
  {
    id: 13,
    question: 'In incident response, what is the main goal of the "Containment" phase?',
    options: ['To completely erase all evidence of the attack', 'To immediately restore all systems from backups', 'To prevent the security breach from spreading further and causing more damage', 'To notify the press about the incident'],
    correctAnswer: 'To prevent the security breach from spreading further and causing more damage',
    explanation: 'Containment is a critical step to limit the impact of an incident, such as by isolating affected systems from the network.',
  },
  {
    id: 14,
    question: 'Under GDPR, what is the maximum fine an organization can face for a severe violation?',
    options: ['€1 million or 1% of global annual turnover', '€10 million or 2% of global annual turnover', '€20 million or 4% of global annual turnover', 'A strongly worded letter of warning'],
    correctAnswer: '€20 million or 4% of global annual turnover',
    explanation: 'GDPR imposes substantial fines for non-compliance, with the higher tier being up to €20 million or 4% of the company\'s worldwide annual revenue, whichever is higher.',
  },
  {
    id: 15,
    question: 'Which cryptographic concept ensures that a sender cannot deny having sent a message?',
    options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
    correctAnswer: 'Non-repudiation',
    explanation: 'Non-repudiation is achieved through digital signatures and provides proof of the origin, integrity, and submission of data, making it difficult for the sender to deny.',
  },
];

export const PRIZE_LADDER: Prize[] = [
  { level: 15, prize: '₦1,000,000', title: 'Cybersecurity Millionaire', isSafeZone: false },
  { level: 14, prize: '₦750,000', title: '', isSafeZone: false },
  { level: 13, prize: '₦500,000', title: 'Security Champion', isSafeZone: false },
  { level: 12, prize: '₦250,000', title: '', isSafeZone: false },
  { level: 11, prize: '₦100,000', title: '', isSafeZone: false },
  { level: 10, prize: '₦50,000', title: 'Data Defender', isSafeZone: true },
  { level: 9, prize: '₦40,000', title: '', isSafeZone: false },
  { level: 8, prize: '₦30,000', title: '', isSafeZone: false },
  { level: 7, prize: '₦20,000', title: '', isSafeZone: false },
  { level: 6, prize: '₦10,000', title: '', isSafeZone: false },
  { level: 5, prize: '₦5,000', title: 'Phish Fighter', isSafeZone: true },
  { level: 4, prize: '₦4,000', title: '', isSafeZone: false },
  { level: 3, prize: '₦3,000', title: '', isSafeZone: false },
  { level: 2, prize: '₦2,000', title: '', isSafeZone: false },
  { level: 1, prize: '₦1,000', title: 'Cyber Smart Starter', isSafeZone: false },
];
