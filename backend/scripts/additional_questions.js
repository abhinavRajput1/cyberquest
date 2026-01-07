
const additionalQuestions = {
    mission1Emails: [
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
    ],
    mission2Questions: [
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
    ],
    mission3Questions: [
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
    ],
    mission4Questions: [
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
    ],
    mission5Questions: [
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
    ],
    mission6Questions: [
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
    ],
    mission7Questions: [
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
};
