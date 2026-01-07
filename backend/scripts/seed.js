import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Mission from '../models/Mission.js';

dotenv.config();

const missions = [
  // Phishing Missions
  {
    title: 'Spot the Phish: Email Inbox Challenge',
    category: 'phishing',
    difficulty: 'easy',
    description: 'Review these emails and identify which ones are phishing attempts.',
    xpReward: 20,
    emails: [
      {
        subject: 'Your account has been suspended',
        sender: 'security@amazon.com',
        body: 'Dear Customer,\n\nWe have detected unusual activity on your account. Please click here to verify your identity: http://amazon-verify-now.com\n\nIf you do not act within 24 hours, your account will be permanently closed.\n\nThank you,\nAmazon Security Team',
        isPhishing: true,
        explanation: 'This is a phishing email. The link uses a suspicious domain (amazon-verify-now.com instead of amazon.com), creates urgency with a 24-hour deadline, and uses a generic greeting.',
        redFlags: ['Suspicious domain in link', 'Urgent tone with deadline', 'Generic greeting']
      },
      {
        subject: 'Order Confirmation #12345',
        sender: 'noreply@amazon.com',
        body: 'Thank you for your order!\n\nOrder #12345 has been confirmed and will be shipped to your registered address.\n\nYou can track your order in your account: https://amazon.com/orders\n\nThank you for shopping with us!',
        isPhishing: false,
        explanation: 'This is a legitimate email. It uses the official amazon.com domain, provides specific order information, and has a professional tone without urgency.',
        redFlags: []
      },
      {
        subject: 'URGENT: Verify Your PayPal Account',
        sender: 'paypal-security@paypalsecurity.net',
        body: 'Your PayPal account will be limited in 48 hours unless you verify your information immediately. Click here: http://paypalsecurity.net/verify\n\nDo not ignore this message.',
        isPhishing: true,
        explanation: 'This is a phishing email. The sender domain (paypalsecurity.net) is not the official PayPal domain (paypal.com), uses urgent language, and threatens account limitation.',
        redFlags: ['Fake sender domain', 'Urgent/threatening language', 'Suspicious link']
      },
      {
        subject: 'Password Reset Request',
        sender: 'noreply@github.com',
        body: 'We received a request to reset your password. If you made this request, click here: https://github.com/password-reset?token=abc123\n\nIf you did not request this, please ignore this email. Your password will not be changed.',
        isPhishing: false,
        explanation: 'This is a legitimate email. It uses the official github.com domain, explains what happened, and provides an option to ignore if the user did not request it.',
        redFlags: []
      },
      {
        subject: 'You Won $10,000! Claim Now!',
        sender: 'winner@lottery-prize.com',
        body: 'Congratulations! You have won $10,000 in our lottery! Click here to claim your prize: http://claim-prize-now.com\n\nYou must claim within 24 hours or the prize will be forfeited.',
        isPhishing: true,
        explanation: 'This is a phishing email. It promises an unrealistic prize, uses a suspicious domain, and creates false urgency. Legitimate lotteries do not contact winners via unsolicited emails.',
        redFlags: ['Too good to be true', 'Suspicious domain', 'Urgent deadline']
      }
    ]
  },
  {
    title: 'Advanced Phishing Detection',
    category: 'phishing',
    difficulty: 'hard',
    description: 'These phishing emails are more sophisticated. Look for subtle red flags.',
    xpReward: 40,
    emails: [
      {
        subject: 'Security Alert: New Device Login',
        sender: 'notifications@microsoft.com',
        body: 'We noticed a new sign-in to your Microsoft account from a new device.\n\nIf this was you, no action is needed.\n\nIf this wasn\'t you, secure your account: https://account.microsoft.com/security\n\nLocation: New York, USA\nDevice: Windows PC',
        isPhishing: false,
        explanation: 'This is a legitimate security notification. It provides specific details, gives the option to ignore if legitimate, and uses the official Microsoft domain.',
        redFlags: []
      },
      {
        subject: 'Re: Your recent purchase',
        sender: 'support@ebay-support.com',
        body: 'Hello,\n\nWe need to verify your recent purchase. Please review your order details and confirm your payment method.\n\nClick here to verify: http://ebay-support.com/verify-order\n\nThank you for your cooperation.',
        isPhishing: true,
        explanation: 'This is a phishing email. The domain ebay-support.com is not the official eBay domain (ebay.com). Legitimate eBay emails come from ebay.com.',
        redFlags: ['Fake domain (ebay-support.com vs ebay.com)', 'Vague request for verification']
      },
      {
        subject: 'Your subscription is expiring',
        sender: 'billing@netflix.com',
        body: 'Your Netflix subscription will expire in 3 days. To continue enjoying unlimited movies and TV shows, please update your payment method.\n\nUpdate now: https://netflix.com/account/billing',
        isPhishing: false,
        explanation: 'This is a legitimate email. It uses the official netflix.com domain and provides clear information about the subscription status.',
        redFlags: []
      }
    ]
  },
  // Network Puzzles
  {
    title: 'Network Security Basics',
    category: 'network',
    difficulty: 'easy',
    description: 'Test your knowledge of basic network security concepts.',
    xpReward: 25,
    questions: [
      {
        question: 'Which port should you close to reduce attack surface on a web server that only serves HTTPS?',
        type: 'multiple-choice',
        options: ['Port 22 (SSH)', 'Port 80 (HTTP)', 'Port 443 (HTTPS)', 'Port 3389 (RDP)'],
        correctAnswer: 'Port 80 (HTTP)',
        explanation: 'If you only serve HTTPS (port 443), you should close port 80 (HTTP) to reduce the attack surface. However, keep port 22 (SSH) open for server management, and port 443 for HTTPS traffic.'
      },
      {
        question: 'Which password policy is more secure?',
        type: 'multiple-choice',
        options: [
          'Password must be 8 characters with uppercase, lowercase, and numbers',
          'Password must be 12+ characters with complexity requirements',
          'Password must be 6 characters, any characters allowed',
          'No password policy'
        ],
        correctAnswer: 'Password must be 12+ characters with complexity requirements',
        explanation: 'Longer passwords (12+ characters) with complexity requirements are more secure than shorter passwords, even with complexity. Length is often more important than complexity alone.'
      },
      {
        question: 'What is the primary purpose of a firewall?',
        type: 'multiple-choice',
        options: [
          'To encrypt data in transit',
          'To control incoming and outgoing network traffic',
          'To store passwords securely',
          'To scan for viruses'
        ],
        correctAnswer: 'To control incoming and outgoing network traffic',
        explanation: 'A firewall acts as a barrier between your network and external networks, controlling which traffic is allowed to pass through based on security rules.'
      }
    ]
  },
  {
    title: 'Advanced Network Configuration',
    category: 'network',
    difficulty: 'hard',
    description: 'Advanced scenarios for network security configuration.',
    xpReward: 50,
    questions: [
      {
        question: 'In a network diagram, you see ports 22, 80, 443, and 3306 open. Which port poses the highest risk if exposed to the internet?',
        type: 'multiple-choice',
        options: [
          'Port 22 (SSH)',
          'Port 80 (HTTP)',
          'Port 443 (HTTPS)',
          'Port 3306 (MySQL)'
        ],
        correctAnswer: 'Port 3306 (MySQL)',
        explanation: 'Port 3306 (MySQL database) should never be exposed to the internet. Database servers should only be accessible from internal networks. SSH (22) can be exposed with proper security, and HTTP/HTTPS (80/443) are meant for public access.'
      },
      {
        question: 'Which configuration is safest for a public-facing web server?',
        type: 'multiple-choice',
        options: [
          'Open all ports, allow all traffic',
          'Only open ports 80 and 443, firewall blocks everything else',
          'Open port 22 without key authentication',
          'Disable firewall completely'
        ],
        correctAnswer: 'Only open ports 80 and 443, firewall blocks everything else',
        explanation: 'A public web server should only expose the ports it needs (80 for HTTP, 443 for HTTPS). All other ports should be blocked by the firewall to minimize attack surface.'
      }
    ]
  },
  // OSINT Missions
  {
    title: 'Privacy Awareness: Social Media Oversharing',
    category: 'osint',
    difficulty: 'easy',
    description: 'Analyze this simulated social media profile and identify privacy risks.',
    xpReward: 30,
    scenario: {
      profile: {
        name: 'Alex Johnson',
        image: 'https://via.placeholder.com/150',
        bio: 'Software developer, coffee enthusiast, living in San Francisco',
        posts: [
          {
            content: 'Just moved to my new apartment at 123 Main St, San Francisco! So excited! 🏠',
            timestamp: new Date('2024-01-15'),
            location: 'San Francisco, CA'
          },
          {
            content: 'Birthday dinner tonight at 7pm! Turning 25 today! 🎂',
            timestamp: new Date('2024-02-10'),
            location: 'San Francisco, CA'
          },
          {
            content: 'Working from home today. My home office setup is amazing!',
            timestamp: new Date('2024-01-20'),
            location: 'San Francisco, CA'
          },
          {
            content: 'Just got a new job at TechCorp! Starting Monday as a Senior Developer.',
            timestamp: new Date('2024-01-05'),
            location: 'San Francisco, CA'
          }
        ]
      },
      questions: [
        {
          question: 'Which information should Alex NOT share publicly?',
          correctAnswer: 'Home address (123 Main St)',
          explanation: 'Sharing a specific home address publicly is a major privacy risk. It allows anyone to know where you live, which can lead to physical security threats, stalking, or burglary.'
        },
        {
          question: 'What risk does sharing your birthday publicly create?',
          correctAnswer: 'Identity theft and account recovery attacks',
          explanation: 'Birthdays are often used as security questions or verification information. Combined with other public information, attackers can use this to attempt account recovery or identity theft.'
        },
        {
          question: 'Why is it risky to post about working from home?',
          correctAnswer: 'It signals when your home is empty, making it a target',
          explanation: 'Posting about being away from home or working from home can signal to potential burglars when your home might be empty or when you\'re less likely to notice suspicious activity.'
        }
      ]
    }
  },
  {
    title: 'OSINT: Digital Footprint Analysis',
    category: 'osint',
    difficulty: 'medium',
    description: 'Learn how seemingly harmless information can be pieced together.',
    xpReward: 40,
    scenario: {
      profile: {
        name: 'Sam Taylor',
        image: 'https://via.placeholder.com/150',
        bio: 'Cybersecurity student, gamer, pet lover',
        posts: [
          {
            content: 'My first car! Just bought a 2020 Honda Civic, license plate: ABC1234',
            timestamp: new Date('2024-01-10'),
            location: 'Austin, TX'
          },
          {
            content: 'Graduating in May 2024 from State University! Can\'t wait!',
            timestamp: new Date('2024-01-08'),
            location: 'Austin, TX'
          },
          {
            content: 'Coffee shop study session. Free WiFi here is great!',
            timestamp: new Date('2024-01-12'),
            location: 'Austin, TX'
          }
        ]
      },
      questions: [
        {
          question: 'What is the biggest privacy risk in Sam\'s posts?',
          correctAnswer: 'Sharing license plate number publicly',
          explanation: 'License plate numbers are personally identifiable information that can be used to track someone\'s vehicle, location, and potentially link to other personal records.'
        },
        {
          question: 'How could an attacker use the graduation information?',
          correctAnswer: 'To craft targeted phishing emails about job opportunities',
          explanation: 'Knowing someone is graduating soon makes them a target for job scam emails, fake internship offers, or other social engineering attacks tailored to new graduates.'
        }
      ]
    }
  },
  // --- STORY MISSIONS (CyberQuest: Operation Digital Fortress) ---
  {
    title: 'Mission 1: The Trap Door',
    category: 'phishing',
    difficulty: 'easy',
    description: 'Investigate a suspicious payroll update email at the Digital Defense Force.',
    story: 'It\'s your first day at DDF HQ. You settle into your station, the hum of servers surrounding you. Suddenly, your notification system pings. An email marked "URGENT: DDF PAYROLL UPDATE" lands in your inbox. It claims your direct deposit information is invalid and asks you to click a link to "verify your details immediately" or risk losing this month\'s salary. The sender address is admin@ddf-support-portal.net (DDF\'s actual domain is ddf.gov).',
    xpReward: 30,
    emails: [
      {
        subject: 'URGENT: DDF PAYROLL UPDATE',
        sender: 'admin@ddf-support-portal.net',
        body: 'Alert: Your direct deposit information is invalid. Click here to verify your details immediately or risk losing this month\'s salary.\n\nLink: http://ddf-support-portal.net/verify',
        isPhishing: true,
        explanation: 'The sender domain (ddf-support-portal.net) does not match the official organization domain (ddf.gov). This is a classic indicator of phishing.',
        redFlags: ['Mismatched domain (ddf-support-portal.net)', 'Urgency ("immediately")', 'Threat of financial loss']
      },
      {
        subject: 'Account blocked',
        sender: 'service@paypal-secure-check.com',
        body: 'Your account has been blocked due to suspicious activity. Click here to unblock: http://paypal-secure-check.com',
        isPhishing: true,
        explanation: 'Paypal uses paypal.com, not paypal-secure-check.com.',
        redFlags: ['Suspicious domain', 'Urgency']
      },
      {
        subject: 'DDF Security Policy Update',
        sender: 'security@ddf.gov',
        body: 'All employees are required to update their passwords by the end of the month. Please log in to the internal portal to proceed.',
        isPhishing: false,
        explanation: 'Sender matches the official domain (ddf.gov) and the request is a standard policy update.',
        redFlags: []
      },
      {
        subject: 'Exclusive Offer for DDF Employees',
        sender: 'promotions@partner-deals.net',
        body: 'Get 50% off on your next coffee! Click here to claim your coupon.',
        isPhishing: true,
        explanation: 'Unsolicited offer from a third-party domain targeting employees is suspicious.',
        redFlags: ['Unsolicited offer', 'External domain']
      },
      {
        subject: 'Missed meeting',
        sender: 'manager@ddf.gov',
        body: 'Hey Neon, we missed you at the briefing. Can you catch up with the notes on the server?',
        isPhishing: false,
        explanation: 'Internal email from a colleague with a reasonable request.',
        redFlags: []
      },
      {
        subject: 'IT Support: Install this update clearly',
        sender: 'support@ddf-it-support.org',
        body: 'Please download and install this critical security patch immediately. Attachment: patch.exe',
        isPhishing: true,
        explanation: 'Official IT support would not use .org domain for internal matters and would push updates via management software, not email attachments.',
        redFlags: ['Suspicious domain', 'Executable attachment', 'Urgency']
      }
    ]
  },
  {
    title: 'Mission 2: Silent Cartographer',
    category: 'network',
    difficulty: 'medium',
    description: 'Use Nmap to discreetly scan a compromised satellite uplink station.',
    story: 'You\'ve dodged the phishing attempt, but ShadowByte is on the move. Intel suggests they have compromised a satellite uplink station. You need to identify which devices on the station\'s network are active and what services they are running before you can patch the breach. You open your terminal to scan the subnet 192.168.10.0/24.',
    xpReward: 50,
    questions: [
      {
        question: 'Which Nmap command would you use to discreetly discover active hosts and open ports without aggressively sending too many packets that might trigger an IDS?',
        type: 'multiple-choice',
        options: [
          'nmap -T5 -A 192.168.10.0/24',
          'nmap -sS -T2 192.168.10.0/24',
          'nmap -p- 192.168.10.0/24',
          'nmap --script vulners 192.168.10.0/24'
        ],
        correctAnswer: 'nmap -sS -T2 192.168.10.0/24',
        explanation: '-sS is a SYN (stealth) scan, and -T2 (Polite) slows down the scan to avoid detection by Intrusion Detection Systems (IDS).'
      },
      {
        question: 'After the initial scan, you find port 80 is open. What tool would you use next to identify the specific version of the web server software?',
        type: 'multiple-choice',
        options: ['nmap -sV -p 80 192.168.10.5', 'ping 192.168.10.5', 'netstat -an', 'traceroute 192.168.10.5'],
        correctAnswer: 'nmap -sV -p 80 192.168.10.5',
        explanation: '-sV enables version detection, which allows Nmap to interrogate the open port and determine the service version.'
      },
      {
        question: 'Which Nmap flag is used to detect the operating system of the target?',
        type: 'multiple-choice',
        options: ['-O', '-sS', '-Pn', '-v'],
        correctAnswer: '-O',
        explanation: '-O (OS detection) enables Nmap\'s OS fingerprinting feature.'
      },
      {
        question: 'You want to scan for UDP services. Which flag do you use?',
        type: 'multiple-choice',
        options: ['-sU', '-sT', '-sS', '-sP'],
        correctAnswer: '-sU',
        explanation: '-sU tell Nmap to perform a UDP scan, as opposed to the default TCP scans.'
      },
      {
        question: 'The scan reveals a host is up but filtering ports. What does "filtered" mean in Nmap output?',
        type: 'multiple-choice',
        options: ['A firewall is blocking the probes', 'The port is closed', 'The service is open', 'The host is down'],
        correctAnswer: 'A firewall is blocking the probes',
        explanation: 'Filtered means Nmap cannot determine if the port is open because packet filtering (firewall) prevents its probes from reaching the port.'
      },
      {
        question: 'You need to save the scan output to a file for later analysis. Which command does this?',
        type: 'multiple-choice',
        options: ['nmap -oN output.txt 192.168.10.1', 'nmap -save 192.168.10.1', 'nmap -write 192.168.10.1', 'nmap > output'],
        correctAnswer: 'nmap -oN output.txt 192.168.10.1',
        explanation: '-oN directs normal output to the specified filename.'
      }
    ]
  },
  {
    title: 'Mission 3: The Broken Gate',
    category: 'network',
    difficulty: 'medium',
    description: 'Identify the vulnerability used to bypass the rogue server\'s login.',
    story: 'You\'ve located a rogue server used by ShadowByte to store stolen data. It\'s protected by a login portal. You try standard credentials, but they fail. You suspect the legacy code is vulnerable. You input "\' OR \'1\'=\'1" into the username field and hit Enter.',
    xpReward: 50,
    questions: [
      {
        question: 'You input "\' OR \'1\'=\'1" into the username field and hit Enter. The dashboard loads, bypassing the password check. What vulnerability did you exploit?',
        type: 'multiple-choice',
        options: [
          'Cross-Site Scripting (XSS)',
          'Cross-Site Request Forgery (CSRF)',
          'SQL Injection (SQLi)',
          'Buffer Overflow'
        ],
        correctAnswer: 'SQL Injection (SQLi)',
        explanation: 'This input manipulates the SQL query to always evaluate to true (1=1), effectively bypassing the authentication logic.'
      },
      {
        question: 'Besides \' OR \'1\'=\'1, what is another common method to test for SQL Injection?',
        type: 'multiple-choice',
        options: ['Entering a single quote (\') to see if it causes a syntax error', 'Entering <script>alert(1)</script>', 'Running a ping command', 'Checking the SSL certificate'],
        correctAnswer: 'Entering a single quote (\') to see if it causes a syntax error',
        explanation: 'A single quote is a string delimiter in SQL. If the application crashes or shows a database error, it implies the input is being interpreted as code.'
      },
      {
        question: 'Which SQL statement is typically used to extract data from a database?',
        type: 'multiple-choice',
        options: ['SELECT', 'UPDATE', 'DELETE', 'INSERT'],
        correctAnswer: 'SELECT',
        explanation: 'SELECT is the standard SQL command for determining which data to retrieve from one or more tables.'
      },
      {
        question: 'What is "Blind SQL Injection"?',
        type: 'multiple-choice',
        options: ['The attacker cannot see the direct output of the query but infers it from the application\'s behavior', 'The attacker guesses the password visually', 'The database is encrypted', 'The attack happens in the dark'],
        correctAnswer: 'The attacker cannot see the direct output of the query but infers it from the application\'s behavior',
        explanation: 'In Blind SQLi, no error messages or data are returned to the screen, so the attacker asks true/false questions to the database.'
      },
      {
        question: 'How can developers best prevent SQL Injection?',
        type: 'multiple-choice',
        options: ['Use Parameterized Queries (Prepared Statements)', 'Sanitize input by removing quotes only', 'Hide the database name', 'Use a firewall'],
        correctAnswer: 'Use Parameterized Queries (Prepared Statements)',
        explanation: 'Parameterized queries ensure that the database treats user input as data, not as executable code.'
      },
      {
        question: 'If you want to combine results from two SELECT statements in an injection attack, which operator do you use?',
        type: 'multiple-choice',
        options: ['UNION', 'JOIN', 'MERGE', 'COMBINE'],
        correctAnswer: 'UNION',
        explanation: 'The UNION operator allows an attacker to append the results of their injected query to the results of the original query.'
      }
    ]
  },
  {
    title: 'Mission 4: The Brute Force Barrier',
    category: 'network',
    difficulty: 'medium',
    description: 'Defend the firewall admin panel against a brute-force attack.',
    story: 'ShadowByte realizes you are in their system and tries to counter-attack. They are launching a script effectively guessing thousands of passwords per second against the DDF main firewall admin panel. CPU usage is spiking.',
    xpReward: 40,
    questions: [
      {
        question: 'What is the most immediate and effective mechanism to implement to stop a brute-force attack guessing thousands of passwords per second?',
        type: 'multiple-choice',
        options: [
          'Change the admin username',
          'Implement an account lockout policy that freezes the account after 5 failed attempts',
          'Encrypt the database',
          'Increase password complexity requirements'
        ],
        correctAnswer: 'Implement an account lockout policy that freezes the account after 5 failed attempts',
        explanation: 'Account lockout policies drastically reduce the effectiveness of brute-force attacks by stopping the attacker after a few failed guesses.'
      },
      {
        question: 'In addition to account lockout, what is a highly effective method to stop automated brute-force attacks?',
        type: 'multiple-choice',
        options: ['Multi-Factor Authentication (MFA)', 'Changing the logo', 'Shortening the username', 'Using HTTP'],
        correctAnswer: 'Multi-Factor Authentication (MFA)',
        explanation: 'MFA requires a second form of verification (like a code on a phone), so even if the attacker guesses the password, they cannot access the account.'
      },
      {
        question: 'What is a "Dictionary Attack"?',
        type: 'multiple-choice',
        options: ['Trying words from a pre-defined list of common passwords', 'Looking up the password in a book', 'Attacking the dictionary server', 'Guessing random characters'],
        correctAnswer: 'Trying words from a pre-defined list of common passwords',
        explanation: 'A dictionary attack uses a list of likely passwords (like "password", "123456", "admin") to guess credentials efficiently.'
      },
      {
        question: 'Rate Limiting is another defense. What does it do?',
        type: 'multiple-choice',
        options: ['Limits the number of requests a user/IP can make in a given time frame', 'Rates the quality of passwords', 'Limits the internet speed', 'Limits the number of users'],
        correctAnswer: 'Limits the number of requests a user/IP can make in a given time frame',
        explanation: 'Rate limiting slows down attackers by rejecting requests after a certain threshold is reached.'
      },
      {
        question: 'Why are longer passwords generally better than complex short ones?',
        type: 'multiple-choice',
        options: ['They exponentially increase the search space for brute-force algorithms', 'They are harder to remember', 'They use more storage', 'They look nicer'],
        correctAnswer: 'They exponentially increase the search space for brute-force algorithms',
        explanation: 'Mathematically, adding length adds far more entropy than adding character sets, making brute-force attempts take exponentially longer.'
      },
      {
        question: 'What is "Credential Stuffing"?',
        type: 'multiple-choice',
        options: ['Using leaked username/password pairs from one breach to try and login to other services', 'Creating fake credentials', 'Stuffing passwords into a file', 'Encrypting credentials'],
        correctAnswer: 'Using leaked username/password pairs from one breach to try and login to other services',
        explanation: 'Attackers know users reuse passwords, so they use credentials found in one data breach to unlock accounts on other sites.'
      }
    ]
  },
  {
    title: 'Mission 5: The Encryption Ransom',
    category: 'network',
    difficulty: 'hard',
    description: 'Respond to a critical ransomware infection at a Sector 7 hospital.',
    story: 'A alert flashes red on the big screen. "SECTOR 7 CRITICAL." A hospital\'s patient database in Sector 7 has been locked. Files look like patient_data.db.locked. A text file on the desktop reads: "Send 50 BTC to decrypt your files."',
    xpReward: 60,
    questions: [
      {
        question: 'A hospital database is locked by ransomware. Assuming you have offline backups, what is the FIRST response strategy?',
        type: 'multiple-choice',
        options: [
          'Pay the ransom immediately',
          'Disconnect infected systems from the network to prevent spread',
          'Email the attackers to negotiate',
          'Run an antivirus scan'
        ],
        correctAnswer: 'Disconnect infected systems from the network to prevent spread',
        explanation: 'Immediate isolation is crucial to prevent the ransomware from encrypting other systems on the network. Once isolated, you can proceed with remediation and restoration.'
      },
      {
        question: 'What is the "WannaCry" ransomware famous for?',
        type: 'multiple-choice',
        options: ['Using the EternalBlue exploit to spread rapidly across networks', 'Being written in Python', 'Targeting only mobile phones', 'Encrypting only music files'],
        correctAnswer: 'Using the EternalBlue exploit to spread rapidly across networks',
        explanation: 'WannaCry caused a global crisis in 2017 by using a leaked SMB vulnerability to self-propagate like a worm.'
      },
      {
        question: 'Why are backups critical for ransomware defense?',
        type: 'multiple-choice',
        options: ['They allow you to restore data without paying the ransom', 'They stop the infection', 'They hack the hackers', 'They speed up the internet'],
        correctAnswer: 'They allow you to restore data without paying the ransom',
        explanation: 'If you have a clean, recent backup, you can wipe the infected systems and restore your data, bypassing the need for a decryption key.'
      },
      {
        question: 'What is the "3-2-1" backup rule?',
        type: 'multiple-choice',
        options: ['3 copies of data, 2 different media types, 1 offsite', '3 servers, 2 hard drives, 1 cloud', '3 admins, 2 keys, 1 password', '3 days, 2 hours, 1 minute'],
        correctAnswer: '3 copies of data, 2 different media types, 1 offsite',
        explanation: 'This industry standard ensures data resilience against physical disasters, hardware failure, and ransomware.'
      },
      {
        question: 'How does ransomware typically enter an organization?',
        type: 'multiple-choice',
        options: ['Phishing emails with malicious attachments or links', 'Through the power cable', 'By magic', 'Through the monitor'],
        correctAnswer: 'Phishing emails with malicious attachments or links',
        explanation: 'Phishing remains the most common delivery vector, tricking users into downloading the payload.'
      },
      {
        question: 'What should you do if you see a "Ransomware Detected" alert on your screen?',
        type: 'multiple-choice',
        options: ['Disconnect from the network immediately (unplug ethernet/turn off Wi-Fi)', 'Restart the computer repeatedly', 'Pay the money', 'Email your friends'],
        correctAnswer: 'Disconnect from the network immediately (unplug ethernet/turn off Wi-Fi)',
        explanation: 'The priority is to stop the spread to network shares or other computers.'
      }
    ]
  },
  {
    title: 'Mission 6: The Digital Breadcrumbs',
    category: 'osint',
    difficulty: 'medium',
    description: 'Track down the location of the hacker leader using social media clues.',
    story: 'You need to find the physical location of ShadowByte\'s leader, "ZeroCool." You don\'t have access to their private GPS, but you found their public social media profile "ZeroCool_99". They posted a photo of a coffee shop view with a unique statue in the background 10 minutes ago.',
    xpReward: 40,
    scenario: {
      profile: {
        name: 'ZeroCool',
        image: 'https://via.placeholder.com/150',
        bio: 'Digital Ghost',
        posts: []
      },
      questions: [
        {
          question: 'You find a public photo of a statue posted 10 minutes ago and use geolocation tools to identify it is in Berlin. What type of intelligence gathering is this? (Enter the acronym)',
          correctAnswer: 'OSINT',
          explanation: 'OSINT (Open Source Intelligence) involves gathering information from publicly available sources, such as social media, maps, and search engines.'
        },
        {
          question: 'You see a reflection in the sunglasses of the target in a photo. It shows a street sign "Bahnhofstraße". This helps narrow down the location to German-speaking countries. What is this technique called?',
          correctAnswer: 'Image Analysis',
          explanation: 'Analyzing tiny details within an image to gather context is a core OSINT skill.'
        },
        {
          question: 'Which tool allows you to see historical versions of a website?',
          correctAnswer: 'Wayback Machine',
          explanation: 'The Wayback Machine (Internet Archive) lets you view snapshots of webpages from the past, often revealing deleted information.'
        },
        {
          question: 'You have a username "ZeroCool_99". You want to see what other social media sites this username is registered on. What tool helps with this?',
          correctAnswer: 'Sherlock',
          explanation: 'Sherlock is a popular open-source tool that searches vast numbers of social media platforms for a specific username.'
        },
        {
          question: 'The target posted a picture of their boarding pass. What specific code on the boarding pass can reveal their full itinerary and personal details?',
          correctAnswer: 'PNR',
          explanation: 'The PNR (Passenger Name Record) or the barcode often contains encoded flight and passenger data.'
        },
        {
          question: 'What is "Google Dorking"?',
          correctAnswer: 'Advanced Search Operators',
          explanation: 'Using advanced operators like "site:", "filetype:", "inurl:" to find specific information not indexed in standard searches.'
        }
      ]
    }
  },
  {
    title: 'Mission 7: The Smoking Gun',
    category: 'network',
    difficulty: 'hard',
    description: 'Recover a deleted configuration file from a neutralized server.',
    story: 'ShadowByte has been neutralized, but their main server was partially wiped. You need to recover a deleted configuration file that contains the decryption keys for the hospital. You image the hard drive and load it into your forensic tool.',
    xpReward: 50,
    questions: [
      {
        question: 'Even if a file is "deleted" by the user, why is it often still recoverable in digital forensics?',
        type: 'multiple-choice',
        options: [
          'The file is sent to the recycle bin',
          'The operating system only removes the reference (pointer) to the file, but the data remains until overwritten',
          'Hackers always leave backups',
          'The cloud automatically saves a copy'
        ],
        correctAnswer: 'The operating system only removes the reference (pointer) to the file, but the data remains until overwritten',
        explanation: 'Deletion typically only marks the file\'s space on the disk as "available" in the file table. The actual binary data remains intact until new data is written over it.'
      },
      {
        question: 'What is "RAM Forensics"?',
        type: 'multiple-choice',
        options: ['Analyzing volatile memory to find running processes, keys, and network connections', 'Checking the hard drive speed', 'Cleaning the computer memory', 'Downloading more RAM'],
        correctAnswer: 'Analyzing volatile memory to find running processes, keys, and network connections',
        explanation: 'RAM contains data that is lost when power is cut, often holding encryption keys or evidence of malware that never touches the disk.'
      },
      {
        question: 'What is a "Hash" in forensics?',
        type: 'multiple-choice',
        options: ['A unique digital fingerprint of a file used to verify integrity', 'A breakfast food', 'A social media tag', 'A type of virus'],
        correctAnswer: 'A unique digital fingerprint of a file used to verify integrity',
        explanation: 'Forensic investigators hash evidence files (e.g., MD5, SHA256) to prove that the data has not been altered during the investigation.'
      },
      {
        question: 'What is "Steganography"?',
        type: 'multiple-choice',
        options: ['Hiding secret data within an ordinary file like an image or audio', 'Encrypting a hard drive', 'Deleting files securely', 'Writing in code'],
        correctAnswer: 'Hiding secret data within an ordinary file like an image or audio',
        explanation: 'Steganography conceals the existence of the message itself, unlike encryption which hides the content.'
      },
      {
        question: 'Which file system artifact tracks every file accessed, modified, or created on Windows?',
        type: 'multiple-choice',
        options: ['$MFT (Master File Table)', 'The registry', 'The recycle bin', 'System32'],
        correctAnswer: '$MFT (Master File Table)',
        explanation: 'In NTFS, the $MFT contains a record for every file on the volume, including timestamps and attributes.'
      },
      {
        question: 'Why is "Chain of Custody" important?',
        type: 'multiple-choice',
        options: ['To prove who handled the evidence and ensure it wasn\'t tampered with for court', 'To keep the evidence clean', 'To organize the files', 'To chain the computer to the desk'],
        correctAnswer: 'To prove who handled the evidence and ensure it wasn\'t tampered with for court',
        explanation: 'Without a documented chain of custody, digital evidence can be dismissed in legal proceedings.'
      }
    ]
  }
];

const seedMissions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberquest');
    console.log('Connected to MongoDB');

    // Clear existing missions
    await Mission.deleteMany({});
    console.log('Cleared existing missions');

    // Insert new missions
    await Mission.insertMany(missions);
    console.log(`Seeded ${missions.length} missions successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding missions:', error);
    process.exit(1);
  }
};

seedMissions();


