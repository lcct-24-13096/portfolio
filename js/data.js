/* =========================================================
   PORTFOLIO DATA — every item below comes from the original site.
   Edit text here and the pages, search palette, terminal and tour update together.
   ========================================================= */
window.PF = (function(){
const EMAIL='jenabenisseredondo523@gmail.com',
      PHONE='+639665207724',
      LI='https://ph.linkedin.com/in/jena-benisse-redondo-267106449',
      SITE='https://lcct-24-13096.github.io/portfolio/';
const CV={u:'resume/Jena-Redondo-Resume.pdf',hi:'resume/resume-hires.jpg',t:'Curriculum Vitae — Jena Benisse Redondo',dl:'Jena-Redondo-Curriculum-Vitae.pdf'};

/* routes: id, label, short description, icon */
const ROUTES=[
 ['home','Home','Signature identity','fa-house'],
 ['about','About','Editorial profile','fa-user'],
 ['education','Education','Interactive journey','fa-graduation-cap'],
 ['skills','Skills','Technology constellation','fa-diagram-project'],
 ['projects','Projects','Cinematic project explorer','fa-laptop-code'],
 ['certificates','Certificates','Credential vault','fa-award'],
 ['experience','Experience','Records, workshops & work mode','fa-briefcase'],
 ['resume','Resume / CV','Document viewer','fa-file-lines'],
 ['contact','Contact','Contact portal & quick answers','fa-paper-plane']
];
/* old #section links keep working */
const LEGACY={journey:'education',work:'experience',cv:'resume',presence:'contact',interests:'about',faq:'contact',certifications:'certificates'};

/* photographs: file, title, caption, focal point (keeps the face inside the frame) */
const PHOTOS=[
 {u:'images/profile.jpg',t:'Jena — professional portrait',cap:'Professional',look:'Professional',pos:'50% 12%',alt:'Formal portrait of Jena'},
 {u:'images/casual-1.jpg',t:'Jena Benisse Redondo — casual portrait',cap:'Smart casual',look:'Smart casual',pos:'47% 28%',alt:'Jena Benisse Redondo smiling in a casual portrait'},
 {u:'images/casual-2.jpg',t:'Jena — off-duty portrait',cap:'Off-duty',look:'Everyday',pos:'50% 24%',alt:'Casual portrait of Jena'},
 {u:'images/casual-3.jpg',t:'Jena — city nights',cap:'City nights',look:'City',pos:'52% 40%',alt:'Jena in the city at night'}
];

const ROLES=['BS Information Technology Student','Web Developer in the Making','Database & Systems Builder','Networking Enthusiast'];

/* education journey */
const MS=[
 {yr:'2023',sm:'',when:'July 2023',t:'IT Department Work Immersion · Creotec Inc.',html:'<ul><li>Assisted with IT-related tasks and developed simple applications, including an Employee Monitoring Board, Payroll Calculator, and BMI Calculator.</li><li>Collaborated with team members to complete assigned projects.</li></ul>',tags:['Work Immersion','Applications']},
 {yr:'2024',sm:'→ now',when:'2024 – Present · Education',t:'Bachelor of Science in Information Technology',html:'<p>Continuing my studies at La Consolacion College Tanauan while building my foundation in programming, databases, networking, and system development.</p>',tags:['BSIT','Academic Learning']},
 {yr:'Build',sm:'',when:'Development',t:'Building Practical Systems',html:'<p>Developing academic and personal projects such as information systems, POS systems, inventory management systems, reservation systems, and an educational game.</p>',tags:['Web Development','System Development']},
 {yr:'Net',sm:'',when:'Networking',t:'Exploring Computer Networks',html:'<p>Learning about network communication, addressing, devices, protocols, configuration, troubleshooting, and network security.</p>',tags:['Networking','Troubleshooting']},
 {yr:'Cert',sm:'',when:'Certifications',t:'Turning Learning Into Milestones',html:'<p>Building knowledge through completed courses and certificates in areas such as HTML, networking, troubleshooting, network support, and security.</p>',tags:['8 Certificates','Continuous Learning']},
 {yr:'Next',sm:'',when:'Future',t:'Keep Learning. Keep Building.',html:'<p>My goal is to continue gaining practical experience, improve my technical skills, and create digital solutions that are useful, reliable, and easy to understand.</p>',tags:['Growth','Hands-on Experience']}
];
const CW=[[["Programming & Development","fa-code",["Computer Programming 1","Computer Programming 2","Object-Oriented Programming"]],["Data & Systems","fa-database",["Information Management 1","Data Structure and Algorithm","Software Engineering"]],["Networking","fa-network-wired",["Networking 101","Networking 102"]],["Design & Human Interaction","fa-pen-ruler",["Multimedia Systems","Introduction to Human Interaction"]],["Computing Foundations","fa-laptop",["Introduction to Computing","Social and Professional Issues"]]],[["Application Development & Emerging Technologies","fa-mobile-screen-button"],["Interactive Programming & Technologies","fa-diagram-project"],["IT Project Management","fa-list-check"],["Platform Technologies","fa-layer-group"],["Web System Technologies","fa-globe"]]];

/* skills */
const S=[["HTML","Frontend","fa-brands fa-html5","Creating structured and semantic web pages and interfaces."],["CSS","Frontend","fa-brands fa-css3-alt","Designing responsive, clean, and modern user interfaces."],["JavaScript","Frontend","fa-brands fa-js","Creating interactive features and dynamic web functionality."],["PHP","Backend","fa-brands fa-php","Developing dynamic web applications and backend logic."],["MySQL","Database","fa-solid fa-database","Managing, organizing, and connecting application data."],["Networking","Networking","fa-solid fa-network-wired","Understanding addressing, devices, protocols, configuration, and troubleshooting."],["UI/UX Design","Frontend","fa-solid fa-pen-ruler","Applying design concepts to build clear, user-friendly interfaces."],["Programming","Backend","fa-solid fa-terminal","Solving problems with code across academic and personal projects."],["System Development","Backend","fa-solid fa-gears","Building complete systems — from database to interface."],["Microsoft Office Suite","Productivity","fa-solid fa-file-word","Documents, spreadsheets, and presentations for everyday work."],["Robotics","Exploration","fa-solid fa-robot","Exploring robotics concepts through workshop-based learning and hands-on activities."]];
const CATS=['Frontend','Backend','Database','Networking','Productivity','Exploration'];
const CIC={Frontend:'fa-window-maximize',Backend:'fa-server',Database:'fa-database',Networking:'fa-network-wired',Productivity:'fa-file-word',Exploration:'fa-robot'};
const TECHU=['HTML','CSS','JavaScript','PHP','MySQL','CRUD','GitHub','Networking','Cisco','Robotics','UI/UX','MS Office'];
/* how these skills relate (drawn as dashed links; no proficiency levels are claimed) */
const SKLINK=[['HTML','CSS'],['CSS','JavaScript'],['PHP','MySQL'],['System Development','MySQL'],['UI/UX Design','CSS'],['JavaScript','PHP']];

/* process steps */
const PS=[['fa-comments','Listen to the goal, the users, and what the system or website needs to do.'],['fa-pen-ruler','Sketch the structure, database, and a clean, user-friendly interface.'],['fa-code','Develop with HTML, CSS, JavaScript, PHP, and MySQL — clean and organized.'],['fa-bug-slash','Check every feature, fix issues, and polish the details.'],['fa-flag-checkered','Hand over a working, easy-to-understand solution with clear explanation.']];

/* projects */
const SH=['images/kd-1.jpg','images/kd-2.jpg','images/kd-3.jpg'],SC=['Home & match preview','Match setup','Live race'];
const P=[
{v:0,t:'Knowledge Dash',cat:'Educational Game',tag:'Featured · Educational Game',d:'Race your knowledge against the Bot or challenge another player online. Every correct answer builds momentum across 10 checkpoints toward the finish line — with a 20-second timer, 4 power-ups, 3 difficulty levels, and 300+ questions.',tech:['JavaScript','UI/UX','Game Logic','Online Multiplayer'],f:'web',ic:'fa-gamepad',c1:'#0b5a52',c2:'#071029',kst:[['10','Checkpoints'],['2','Game modes'],['3','Difficulties'],['300+','Questions']],link:['https://knowledge-dash.gamer.free/','Play live demo','fa-play'],shots:SH,caps:SC},
{v:6,t:'LCCT Alumni & External Affairs Ticketing System',cat:'Ticketing System · AEA Module',tag:'Live System · Department Module',d:'My individually developed Alumni & External Affairs (AEA) department module of a multi-department ticketing system for La Consolacion College Tanauan. Each department\'s module is assigned to one developer, and all modules will be compiled into one system. Requesters sign in to submit tickets, while the office tracks active, unassigned, and overdue tickets from a live dashboard, alongside alumni records, external partners, reports, and an FAQ manager.',tech:['PHP','MySQL','UI/UX'],f:'system',ic:'fa-ticket',c1:'#17407a',c2:'#071029',shots:['images/aea-1.jpg','images/aea-2.jpg'],caps:['Sign-in page','Dashboard'],link:['https://lcct-ticketing-aea.infinityfree.io/auth/login.php','Open live system','fa-arrow-up-right-from-square']},
{v:7,t:'SALRC — St. Augustine Learning Resource Center System',cat:'Library System',tag:'Live System · Library',d:'A full-screen library kiosk system for the St. Augustine Learning Resource Center of La Consolacion College Tanauan. Visitors time in and out for attendance and search the catalog across the Lower School, High School, Senior High School, and College libraries, with a live count of people in the library and titles in the catalog.',tech:['Attendance','Catalog Search','Kiosk UI'],f:'system',ic:'fa-book-open-reader',c1:'#0b2a5c',c2:'#7a5410',shots:['images/salrc-1.jpg','images/salrc-2.jpg'],caps:['Kiosk home','Libraries & live count'],link:['https://lcct-salrc.infinityfree.io/SALRC/public','Open live system','fa-arrow-up-right-from-square']},
{v:1,t:'8 Sibs Sari-Sari Store POS',cat:'Multi-User System',tag:'POS & Inventory',d:'A multi-user Point-of-Sale and inventory management system designed to support sales, inventory, online orders, and business operations.',tech:['PHP','MySQL','JavaScript'],f:'business',ic:'fa-boxes-stacked',c1:'#d9a53a',c2:'#7a5410'},
{v:2,t:'Tinurik Point-of-Sale System',cat:'Sales & Operations',tag:'Business System',d:'A point-of-sale system developed for food business operations, featuring order management, sales monitoring, and inventory functionality.',tech:['HTML','CSS','JavaScript'],f:'business',ic:'fa-cash-register',c1:'#d9684a',c2:'#7d2f1b'},
{v:3,t:'Student Information Management System',cat:'Academic System',tag:'Web-Based System',d:'A web-based system designed to organize student records, courses, teachers, and enrollment information in one centralized system.',tech:['PHP','MySQL','CRUD'],f:'system',ic:'fa-users',c1:'#3d8bd9',c2:'#17407a'},
{v:4,t:'Resort Reservation & Booking System',cat:'Reservation Management',tag:'Booking & Reservation',d:'A reservation management system designed to organize resort bookings, customer information, and reservation details in a more convenient way.',tech:['PHP','MySQL','HTML','CSS'],f:'system',ic:'fa-hotel',c1:'#8b6fd1',c2:'#3f2d85'},
{v:5,t:'Jena Benisse Personal Portfolio',cat:'Personal Brand',tag:'Personal Project',d:'A responsive personal portfolio created to showcase my skills, academic projects, certificates, and continuous growth as an Information Technology student.',tech:['HTML','CSS','JavaScript','UI/UX'],f:'web',ic:'fa-laptop-code',c1:'#27b0a2',c2:'#0b5a52',link:[SITE,'Visit site','fa-arrow-up-right-from-square']}];
const FILT=[['all','All projects'],['web','Web'],['business','Business'],['system','Systems']];

/* certificates: title, category label, issuer & date, file type, description, tags, filter group */
const C=[["HTML Essentials","Web Development","Cisco Networking Academy · August 11, 2026","pdf","Completed the HTML Essentials course through Cisco Networking Academy in collaboration with JS Institute. The course covered structured HTML documents, semantic elements, multimedia, hyperlinks, forms, accessibility, and the relationship between HTML, CSS, and JavaScript.",["HTML","Web Structure","Accessibility"],"Web"],
["Network Addressing & Basic Troubleshooting","Networking","Cisco Networking Academy · April 13, 2026","pdf","Completed training focused on physical and data-link layer communication, network media, IPv6 addressing, routers, switches, and troubleshooting basic network connectivity issues.",["IPv6","Routing","Troubleshooting"],"Networking"],
["Networking Basics","Networking","Cisco Networking Academy · March 29, 2026","pdf","Completed Networking Basics covering network communication, network types, components, standards and protocols, Ethernet communication, IPv4 and IPv6, routers, connectivity testing, and wireless router configuration.",["IPv4","IPv6","Ethernet"],"Networking"],
["Networking Devices & Basic Configuration","Network Configuration","Cisco Networking Academy · April 8, 2026","pdf","Completed coursework covering hierarchical network design, number systems, Ethernet switching, IPv4 subnetting, DNS, DHCP, transport-layer protocols, Cisco IOS, and building basic computer networks using Cisco devices.",["Cisco IOS","Subnetting","DHCP"],"Networking"],
["Network Support & Security","Network Support","Cisco Networking Academy · April 13, 2026","pdf","Completed training focused on effective network troubleshooting, help desk best practices, common network threats, vulnerabilities, endpoint attacks, and secure user access on a network.",["Troubleshooting","Security","Help Desk"],"Networking"],
["Network Technician Career Path","Career Path","Cisco Networking Academy · April 22, 2026","pdf","Completed the Network Technician Career Path covering network standards, Ethernet, IPv4 and IPv6, wireless configuration, switching, DNS and DHCP, transport protocols, routing, troubleshooting, and secure network access.",["Networking","Routing","Security"],"Networking"],
["Bridging Business and Technology for the Next Generation","IT Week Seminar","IT Week 2026, La Consolacion College Tanauan · March 21, 2026","jpg","Certificate of Participation for the seminar held in celebration of IT Week 2026 at La Consolacion College Tanauan. The seminar explored how business processes and emerging technology intersect, encouraging IT students to connect technical skills with real-world business needs.",["IT Week 2026","Business & Technology","Seminar"],"Events"],
["Design, Build, Innovate: The Robotics Experience","Robotics Workshop","ICT Week 2026, La Consolacion College Tanauan · 2026","jpg","Certificate of Participation for a robotics workshop presented by First Eduspec Inc. in partnership with La Consolacion College Tanauan during LCCT ICT Week 2026. The workshop introduced hands-on robotics concepts, giving students the chance to explore robotics design and building beyond regular web and database coursework.",["Robotics","Hands-on Workshop","ICT Week 2026"],"Events"]];
/* file helpers */
const cu=i=>`certificates/certificate-${i+1}.${C[i][3]}`;                       /* original document */
const cthumb=i=>`certificates/thumbs/t${i+1}.jpg`;                               /* existing thumbnail */
const cview=i=>C[i][3]==='pdf'?`certificates/preview/p${i+1}.jpg`:cu(i);        /* zoomable image (rendered from the original PDF) */

/* guided tour */
const TOUR=[
 {r:'home',sel:'#sigWin',t:'The signature portrait',d:'Move your pointer over it for the 3D light, switch looks with the thumbnails, or click to open the photo explorer.'},
 {r:'home',sel:'#spine,#tabbar',t:'Direct navigation',d:'Every page opens directly — no scrolling through the others. Use the side rail, the number keys 1–9, or [ and ].'},
 {r:'home',sel:'#portalBtn',t:'The Discovery Portal',d:'Step into any room, or pick up a project, certificate or skill from the shelf. Press P any time.'},
 {r:'skills',sel:'#skStage',t:'Skills constellation',d:'Select a cluster to filter, or a node to read how I use that skill and which skills it connects to.'},
 {r:'projects',sel:'#pxStage',t:'Project explorer',d:'Click the layered screenshots to bring one forward, open them full-screen, or use Compare to put projects side by side.'},
 {r:'certificates',sel:'#vault',t:'Credential vault',d:'Open a certificate from its folder, inspect it with zoom and the lens, and download the original file.'},
 {r:'resume',sel:'#docWrap',t:'Original CV',d:'View my original Curriculum Vitae full-screen, preview the live PDF, or download it.'},
 {r:'contact',sel:'#ctCards',t:'Contact portal',d:'Copy my details in one tap, send a message, or read the quick answers recruiters usually ask for.'}
];
/* OPTIONAL — your own cartoon pictures. Put PNG/WebP files in images/cartoon/ and list them here, e.g.
   {name:'star',u:'images/cartoon/star.png'}. Names used: star, laptop, bolt, db, net, cap, ribbon, bulb, rocket, heart, sprout, spark.
   If a name is listed, your picture replaces that built-in sticker everywhere (intro, home, portal, accents). */
const CARTOONS=[];
return {EMAIL,PHONE,LI,SITE,CV,ROUTES,LEGACY,PHOTOS,ROLES,MS,CW,S,CATS,CIC,TECHU,SKLINK,PS,P,FILT,C,cu,cthumb,cview,CARTOONS,TOUR};
})();
