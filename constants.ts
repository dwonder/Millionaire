import { Question, Prize } from './types';

export const QUESTIONS: Question[] = [
  // Q1 - Easy
  {
    id: 1,
    question: 'In a majority of successful cyberattacks, what is the weakest point that attackers exploit to gain entry?',
    options: ['The company\'s firewall or network perimeter.', 'Weak server configurations.', 'Human error (e.g., clicking a bad link).', 'Lack of encryption on databases.'],
    correctAnswer: 'Human error (e.g., clicking a bad link).',
    explanation: 'Humans, not hardware, are the most common attack vector. Your awareness is the first line of defense.',
  },
  // Q2 - Easy
  {
    id: 2,
    question: 'You receive an email from “IT Support” asking you to verify your password to prevent account suspension. What is the correct action?',
    options: ['Click the link and follow the instructions.', 'Reply to the email to confirm if it’s a real request.', 'Report it using the official “Report Phish” button, then delete it.', 'Forward it to colleagues so they are also aware of the scam.'],
    correctAnswer: 'Report it using the official “Report Phish” button, then delete it.',
    explanation: 'Ignoring a phish helps you, but reporting it protects everyone. Security is a collective responsibility, not a silent one.',
  },
  // Q3 - Easy
  {
    id: 3,
    question: 'A LinkedIn post from “GlobalTech Recruiters” says: “We’re hiring! Comment ‘Interested’ and we’ll DM you the application link.” What should you do?',
    options: ['Comment “Interested” — it’s how recruiters track engagement.', 'Check the recruiter’s company profile for legitimacy before engaging.', 'DM them privately to get the link directly.', 'Share the post to help your friends find opportunities.'],
    correctAnswer: 'Check the recruiter’s company profile for legitimacy before engaging.',
    explanation: 'Even a simple comment can expose you to scam DMs. This tactic, known as engagement bait, is a modern form of phishing.',
  },
  // Q4 - Easy
  {
    id: 4,
    question: 'Your coworker is hospitalized. You post on Facebook: “Please pray for Funmi Ade, she’s recovering after surgery.” What is the primary issue here?',
    options: ['It’s a kind gesture showing support for a colleague.', 'You are sharing sensitive personal health information without consent.', 'It’s fine, especially if other people have posted similar updates.', 'The colleague is unlikely to mind the public show of support.'],
    correctAnswer: 'You are sharing sensitive personal health information without consent.',
    explanation: 'Health data is sensitive personal data. While the intent is compassionate, posting it without consent is a privacy violation. Compassion ≠ compliance.',
  },
  // Q5 - Easy (Safe Haven)
  {
    id: 5,
    question: 'You want to celebrate your colleague’s birthday on LinkedIn with a picture of the team at work. What is the essential first step?',
    options: ['Post it immediately to surprise them—it shows great company culture.', 'Ask for your colleague’s explicit consent before posting their photo online.', 'Tag the company’s official page for maximum visibility.', 'Blur the company logo in the background and then post it.'],
    correctAnswer: 'Ask for your colleague’s explicit consent before posting their photo online.',
    explanation: 'Consent isn’t optional. Even a friendly post constitutes “data processing,” and employees have the right to control their own image.',
  },
  // Q6 - Medium
  {
    id: 6,
    question: 'A LinkedIn user claiming to be a recruiter from “TechHire Global” asks for your CV and most recent payslip. How should you respond?',
    options: ['Send only your CV, as payslips are too confidential to share.', 'Verify the recruiter via the company’s official website or HR email before sending anything.', 'Reply with your details using your corporate email to appear more credible.', 'Accept their connection request first, and then decide later if you will send the documents.'],
    correctAnswer: 'Verify the recruiter via the company’s official website or HR email before sending anything.',
    explanation: 'Verification should always be the first step, not an afterthought. Scammers often request sensitive documents to commit fraud.',
  },
  // Q7 - Medium
  {
    id: 7,
    question: 'You get a DM from an “influencer” saying: “We love your brand! Can we collaborate? Just fill this form so our agency can reach you.” The form asks for your corporate ID and email.',
    options: ['Fill out the form, since collaborations are great for brand visibility.', 'Verify the request with Corporate Communications or Marketing before responding.', 'Share a link to your public LinkedIn profile instead of filling out the form.', 'Reply to the DM asking for more details on the proposed collaboration first.'],
    correctAnswer: 'Verify the request with Corporate Communications or Marketing before responding.',
    explanation: 'Always route potential brand engagements through official channels. Marketing and collaboration scams are a growing social engineering frontier.',
  },
  // Q8 - Medium
  {
    id: 8,
    question: 'A colleague from another department asks you for “a copy of customer data” for an analysis they are running. What is the correct protocol?',
    options: ['Share it via email or internal chat since it’s an internal request.', 'Ask your manager or Data Protection Officer (DPO) to approve the request before sharing.', 'Compress the file and protect it with a password before sending.', 'Tell them which shared drive to find the data on themselves.'],
    correctAnswer: 'Ask your manager or Data Protection Officer (DPO) to approve the request before sharing.',
    explanation: 'An internal request does not automatically mean it is an authorized one. Data sharing must follow the principle of least privilege and requires documented approval.',
  },
  // Q9 - Medium
  {
    id: 9,
    question: 'Your company posts your photo celebrating an achievement. Later, you find fake social media profiles using your image. What should you do?',
    options: ['Ignore it, since it’s just online engagement and will fade away.', 'Report the fake accounts and immediately alert Corporate Communications.', 'Comment “Thanks!” on all the posts to show you are aware.', 'Quietly block the fake profiles and hope they stop.'],
    correctAnswer: 'Report the fake accounts and immediately alert Corporate Communications.',
    explanation: 'Impersonation scams leverage stolen visibility. Always involve official channels to manage the company\'s brand and your personal reputation.',
  },
  // Q10 - Medium (Safe Haven)
  {
    id: 10,
    question: 'A farewell post on a public forum says: “Goodbye Sarah! After 5 amazing years in our Nairobi data center, she’s moving to Amazon Cloud!” What is the main privacy concern?',
    options: ['You revealed her work history, specific location, and new employer without her consent.', 'There is no concern, as it’s a positive farewell message.', 'It’s fine as long as Sarah herself liked or commented on the post.', 'The new company won’t mind the free publicity.'],
    correctAnswer: 'You revealed her work history, specific location, and new employer without her consent.',
    explanation: 'This post aggregates sensitive personal and professional data, which can be exploited by social engineers. Always get consent before sharing such details.',
  },
  // Q11 - Hard
  {
    id: 11,
    question: 'Your manager says, "Give your password to Alice. She needs to review a spreadsheet on your account, and we don\'t have time for IT." What is the primary security risk here?',
    options: ['Alice might secretly change the spreadsheet to give herself a raise.', 'The budget information might be exposed to the rest of the company.', 'Alice could accidentally lock you out of your account by mistyping the password.', 'Sharing the password destroys the audit trail (non-repudiation), making it impossible to prove who made changes.'],
    correctAnswer: 'Sharing the password destroys the audit trail (non-repudiation), making it impossible to prove who made changes.',
    explanation: 'Sharing credentials breaks accountability. If an action is taken using your account, it is attributed to you, creating a major compliance and security risk.',
  },
  // Q12 - Hard
  {
    id: 12,
    question: 'Your manager insists they need a list of their team\'s salaries on a personal device to work from home. What is the correct response?',
    options: ['Ask them to get formal, written approval from both HR and Finance first.', 'Send a password-protected file to their personal email.', 'Decline the request, stating it violates company policy.', 'Email the data to their corporate account so they can transfer it themselves.'],
    correctAnswer: 'Ask them to get formal, written approval from both HR and Finance first.',
    explanation: 'Transferring sensitive data like salaries to personal devices creates significant risk. Such an exception requires formal, documented approval from the relevant governance bodies.',
  },
  // Q13 - Hard
  {
    id: 13,
    question: 'A document contains the personal contact details (home address, phone number) for all senior executives. How should this data be classified?',
    options: ['Internal, because all employees should have access to leadership\'s contact info.', 'Confidential, but you can share it if the person asking is also a senior manager.', 'Restricted/Secret, as it contains highly sensitive PII that requires strict need-to-know access.', 'Public, as long as the document is password-protected.'],
    correctAnswer: 'Restricted/Secret, as it contains highly sensitive PII that requires strict need-to-know access.',
    explanation: 'This is highly sensitive Personally Identifiable Information (PII). Its exposure could lead to direct threats against leadership, so access must be strictly controlled and audited.',
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