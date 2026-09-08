import { useState, useEffect } from 'react';
import LeadershipMatrix from './LeadershipMatrix';
import directorPhoto from './img/Prof_Suhaily.jpg';
import secretaryPhoto from './img/Puan_Salwa.jpg';
import sulamPhoto from './img/Sherliaty.jpg';
import elearningPhoto from './img/Sharifah_Nadia.jpg';
import ablPhoto from './img/Farhan_Ahlaamie.jpg';
import apelPhoto from './img/Siti_Fajar.jpg';
import mcPhoto from './img/Jihadah.jpg';
import obePhoto from './img/Aziah.jpg';
import odlPhoto from './img/Syalina.jpg';
import studentsImg from './img/IMG_4.jpg';
import aesLogo from './img/AESnewlogo.jpg';
import elLogo from './img/ELlogo.jpg';
import ablLogo from './img/ABLlogo.jpg';
import odlLogo from './img/ODLlogo.jpg';
import apelLogo from './img/APELlogo.jpg';
import heroBg from './img/herobg2.jpg';


// Custom Announcement Banner Component
function AnnouncementTicker() {
    return (
        <div className="bg-gradient-to-r from-uptm-navy-900 via-uptm-crimson to-uptm-gold text-white py-2 px-4 text-xs font-semibold text-center tracking-wide flex items-center justify-center gap-2 relative overflow-hidden">
            <span className="bg-white text-uptm-navy-900 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold animate-pulse">New Announcement</span>
            <span>APEL.C Open Registration for Intake 2026! Accelerate your professional qualification now.</span>
        </div>
    );
}


// Main App Component
export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [activeUnit, setActiveUnit] = useState('elearning');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackData, setFeedbackData] = useState({ name: '', email: '', message: '', category: 'General' });

    // Hero Feed Carousel State
    const [feedIndex, setFeedIndex] = useState(0);
    const [likedFeedItems, setLikedFeedItems] = useState([]);
    
    // APEL Calculator State
    const [apelAge, setApelAge] = useState(21);
    const [apelExp, setApelExp] = useState(3);
    const [apelTarget, setApelTarget] = useState('Bachelor');
    const [apelResult, setApelResult] = useState(null);

    // OBE Matrix State
    const [obeClos, setObeClos] = useState([
        { id: 1, text: 'Apply advanced computational principles to complex technical challenges.', plos: [1, 3], domain: 'Cognitive (C3)' },
        { id: 2, text: 'Design secure networking configurations addressing contemporary security vulnerabilities.', plos: [2, 4], domain: 'Psychomotor (P4)' },
        { id: 3, text: 'Collaborate ethically in professional software development ecosystems.', plos: [5], domain: 'Affective (A3)' }
    ]);
    const [newCloText, setNewCloText] = useState('');
    const [newCloDomain, setNewCloDomain] = useState('Cognitive (C1)');
    const [newCloPlos, setNewCloPlos] = useState([]);

    // Micro-Credential Stacking State
    const [selectedMicroCourses, setSelectedMicroCourses] = useState([]);

    // Chatbot Assistant State
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: 'Welcome to UPTM Academic Excellence Sector (AES) Helpdesk! How can I assist you with eLearning, ODL, SULAM, OBE, APEL, ABL, or Micro-Credentials today?' }
    ]);
    const [chatInput, setChatInput] = useState('');

    // eLearning Readiness Quiz State
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(null);

    // SULAM showcase search filter
    const [sulamFilter, setSulamFilter] = useState('All');

    // Quick Pathway Advisor State
    const [advisorProfile, setAdvisorProfile] = useState({
        type: 'student', // student, working, academic
        interest: 'flexible-learning', // community, assessment, digital, speed
    });
    const [advisorRecommendation, setAdvisorRecommendation] = useState(null);

    // Mock Databases
    const unitsData = {
        elearning: {
            title: "E-Learning Unit",
            tagline: "Empowering digital classrooms, flexible modules, and contemporary educational pedagogy.",
            description: "UPTM’s e-Learning Unit drives the frontier of digital education by anchoring the university's blended and distance learning ecosystems. Through the robust deployment of the OpenLearning platform, interactive virtual sandboxes, and modern instructional media, we ensure academic continuity and strict compliance with flexible education standards. We empower educators to design high-engagement, portfolio-driven courses that reduce friction and elevate student retention across all programs.",
            lead: "Pn. Sharifah Nadia Binti Syed Khastudin",
            highlights: [
                "Next-Gen LMS Integration (UPTM Virtual Campus)",
                "Academic Tech Support & Comprehensive Training for Educators",
                "High-Definition Video Recording Studios for Micro-Lectures",
                "Digital Content Gamification Consulting"
            ],
            icon: "fa-laptop-code",
            logo: elLogo,
            color: "from-blue-600 to-indigo-700"
        },
        odl: {
            title: "ODL Unit (Open and Distance Learning)",
            shortTitle: "ODL Unit",
            tagline: "Unlocking education without borders for professionals, adult learners, and career builders.",
            description: "The Open and Distance Learning (ODL) Unit specializes in administering degree programs that require zero traditional geographic limits. Our curated learning pathways respect the demanding schedules of modern working adults, integrating structural self-study packages, peer mentoring, and hyper-flexible examinations.",
            lead: "Pn. Noorsyalina Binti Nordin",
            highlights: [
                "100% Flexible Asynchronous Course Delivery",
                "Direct Access to Dedicated Virtual Academic Mentors",
                "Industry-Calibrated Curriculums Tailored for Executives",
                "Flexible Assessments and Synchronous Consultations"
            ],
            icon: "fa-globe-asia",
            logo: odlLogo,
            color: "from-purple-600 to-pink-700"
        },
        sulam: {
            title: "SULAM Unit (Service Learning Malaysia - University for Society)",
            shortTitle: "SULAM Unit",
            tagline: "Connecting classroom scholarship to impactful local community programs.",
            description: "SULAM translates cognitive academic competencies into real-world altruism. Under this credit-bearing community-engaged program, students design high-impact projects addressing contemporary infrastructure, educational, technological, and socio-economic gaps directly within Malaysian societal cohorts.",
            lead: "Pn. Sherliaty Binti Saad",
            highlights: [
                "Credit-bearing Experiential Community Engagement Projects",
                "Interdisciplinary Teamwork and Direct Stakeholder Partnerships",
                "Sustainable Social Development Alignment (UN SDGs Integration)",
                "Systematic Reflective Assessment Rubrics"
            ],
            icon: "fa-users-cog",
            color: "from-emerald-600 to-teal-700"
        },
        obe: {
            title: "OBE Unit (Outcome-Based Education)",
            shortTitle: "OBE Unit",
            tagline: "Rigorous alignment of course learning goals with national accreditation benchmarks.",
            description: "The Outcome-Based Education (OBE) unit oversees structural academic quality assurance at UPTM. We verify that all modules tightly map Course Learning Outcomes (CLOs) to Program Learning Outcomes (PLOs) and Program Educational Objectives (PEOs) to produce highly employable, specialized graduates.",
            lead: "Pn. Nor Aziah Binti Sulaiman",
            highlights: [
                "Continuous Quality Improvement (CQI) Auditing Systems",
                "Taxonomy Benchmarking (Cognitive, Affective, Psychomotor Domains)",
                "Student Learning Time (SLT) & Credit Hour Auditing Protocols",
                "Outcome Assessment Rubric Standardization Workshops"
            ],
            icon: "fa-chart-line",
            color: "from-rose-600 to-orange-600"
        },
        apel: {
            title: "APEL Unit (Accreditation of Prior Experiential Learning)",
            shortTitle: "APEL Unit",
            tagline: "Convert your skills and professional working experience into academic credentials.",
            description: "Authorized under Malaysian Qualifications Agency (MQA) protocols, the APEL unit facilitates non-traditional pathways. Work history can be assessed for Admission to Degree Programs (APEL.A), Credit Transfers for specific courses (APEL.C), or full Academic Qualifications (APEL.Q).",
            lead: "Pn. Siti Fajar Binti Jalal",
            highlights: [
                "APEL.A - Access Entry Pathways (Diploma, Degree, Master's Level)",
                "APEL.C - Assessment for Course Exemption (Up to 30% credit savings)",
                "Portfolio Development & Interview Coaching Kits",
                "Certified Prior Learning Assessors Matrix"
            ],
            icon: "fa-user-graduate",
            logo: apelLogo,
            color: "from-amber-600 to-red-700"
        },
        abl: {
            title: "ABL Unit (Activity-Based Learning)",
            shortTitle: "ABL Unit",
            tagline: "Transforming classrooms through immersive, practical, action-centric pedagogy.",
            description: "The Activity-Based/Action Learning (ABL) unit stands as an opponent to passive instruction. ABL re-engineers classrooms around simulated hackathons, professional debates, physical prototypes, and case-study analysis, ensuring concepts are cemented through deep hands-on experiences.",
            lead: "Pn. Farhan Ahlaamie Binti Pakrudin",
            highlights: [
                "Flipped-Classroom & Cooperative Learning Designs",
                "Collaborative Classroom Spatial Re-engineering Kits",
                "Simulation and Serious-Gaming Lesson Integrations",
                "Gamified Assessment Guidelines"
            ],
            icon: "fa-puzzle-piece",
            logo: ablLogo,
            color: "from-cyan-600 to-blue-700"
        },
        microcredential: {
            title: "Micro-Credential Unit",
            tagline: "Bite-sized, industry-recognized certificates stackable directly towards full-scale degrees.",
            description: "UPTM's Micro-Credential Framework delivers specialized talent development in manageable chunks. Industry personnel can pick up stand-alone certificates (e.g., Cloud Operations, Digital Marketing Analytics) that validate localized professional competency and can later stack into official UPTM degrees.",
            lead: "Pn. Jihadah Binti Ahmad",
            highlights: [
                "Direct HRD Corp Claimable Technical Certificates",
                "Flexible Digital Badge System Integrated with Credly",
                "Direct Equivalency and Credit Stacking onto Diplomas/Degrees",
                "Co-Developed with Leading Global Industry Partners"
            ],
            icon: "fa-award",
            color: "from-fuchsia-600 to-pink-700"
        }
    };

    const sulamProjects = [
        { id: 1, title: 'Smart Retail Advisory for Gombak Small Traders', category: 'Business', impact: '24 Merchants Trained', unit: 'SULAM', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400' },
        { id: 2, title: 'Basic Scratch Programming for B40 Primary Pupils', category: 'Technology', impact: '45 Youth Empowered', unit: 'SULAM', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400' },
        { id: 3, title: 'Eco-Sustained Waste Auditing in Cheras Housing Area', category: 'Environment', impact: '120 Households Participating', unit: 'SULAM', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' },
        { id: 4, title: 'Legal Literacy and Consumer Rights Webinar Series', category: 'Social', impact: '350 Live Stream Observers', unit: 'SULAM', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400' }
    ];

    const microCoursesList = [
        { id: 'mc01', name: 'Cloud Operations & Cybersecurity Basics', credits: 3, fee: 'RM 450', badge: '☁️' },
        { id: 'mc02', name: 'Strategic Corporate Communication in Crisis', credits: 3, fee: 'RM 400', badge: '📣' },
        { id: 'mc03', name: 'Data Visualization & Predictive Analytics with Python', credits: 4, fee: 'RM 550', badge: '📊' },
        { id: 'mc04', name: 'Creative Content Marketing & SEO Strategy', credits: 2, fee: 'RM 300', badge: '✍️' },
        { id: 'mc05', name: 'Agile Project Management & Scrum Framework', credits: 3, fee: 'RM 480', badge: '🏃' },
    ];

    const faqItems = [
        { q: "What is the primary difference between ODL and traditional programs?", a: "Open and Distance Learning (ODL) utilizes virtual asynchronous delivery where you complete assignments, study video lectures, and consult instructors 100% online, requiring minimal or zero campus visits." },
        { q: "How can working experience count towards credit hours in UPTM?", a: "Through our APEL Unit. Applying under APEL.C allows examiners to assess your professional portfolio and match your skills against specific subject learning outcomes, providing direct course credit exemptions." },
        { q: "Can Micro-Credential credits be used for degree entries?", a: "Yes. All our Micro-Credentials correspond to credit equivalencies mapped directly to standard academic programs. Upon gathering required micro-courses in a specialization, you can transfer and stack those credits to achieve a diploma or bachelor's degree." }
    ];

    // Hero Feed Data — styled as a social feed of unit updates & AES news
    const feedItems = [
        {
            id: 'f1',
            unitKey: null,
            author: 'AES Portal',
            icon: 'fa-bullhorn',
            color: 'from-uptm-gold to-amber-500',
            category: 'Announcement',
            date: 'Sep 2026',
            title: 'APEL.C Open Registration for Intake 2026',
            description: 'Accelerate your professional qualification and explore prior-learning opportunities through the AES pathway.',
            image: null,
            likes: 128,
            comments: 24
        },
        {
            id: 'f2',
            unitKey: 'sulam',
            author: unitsData.sulam.lead,
            icon: unitsData.sulam.icon,
            color: unitsData.sulam.color,
            category: 'SULAM',
            date: 'May 2026',
            title: 'Smart Retail Advisory for Gombak Small Traders',
            description: '24 local merchants trained in digital point-of-sale and inventory systems by our student volunteers.',
            image: sulamProjects[0].img,
            likes: 214,
            comments: 31
        },
        {
            id: 'f3',
            unitKey: 'elearning',
            author: unitsData.elearning.lead,
            icon: unitsData.elearning.icon,
            color: unitsData.elearning.color,
            category: 'E-Learning',
            date: 'Jun 2026',
            title: 'UPTM LMS System Upgrade',
            description: 'Virtual Campus servers underwent scheduled maintenance to improve streaming quality and course navigation.',
            image: null,
            likes: 76,
            comments: 9
        },
        {
            id: 'f4',
            unitKey: null,
            author: 'AES Portal',
            icon: 'fa-award',
            color: 'from-uptm-navy-900 to-uptm-crimson',
            category: 'Milestone',
            date: '2026',
            title: 'ISO 9001:2015 Certified',
            description: 'AES was officially awarded ISO 9001:2015 institutional certification for our Outcome-Based Quality Assurance systems.',
            image: null,
            likes: 302,
            comments: 45
        },
        {
            id: 'f5',
            unitKey: 'microcredential',
            author: unitsData.microcredential.lead,
            icon: unitsData.microcredential.icon,
            color: unitsData.microcredential.color,
            category: 'Micro-Credential',
            date: 'Aug 2026',
            title: 'New Stackable Course Launched',
            description: '"Data Visualization & Predictive Analytics with Python" is now open for HRD Corp claimable enrolment.',
            image: null,
            likes: 58,
            comments: 6
        },
        {
            id: 'f6',
            unitKey: 'abl',
            author: unitsData.abl.lead,
            icon: unitsData.abl.icon,
            color: unitsData.abl.color,
            category: 'ABL',
            date: 'Jul 2026',
            title: 'Hackathon Week Wraps Up',
            description: 'Student teams built working prototypes in 48 hours as part of our Collaborative Hack activity module.',
            image: null,
            likes: 141,
            comments: 18
        }
    ];

    // Programs under ODL
    const programs = [
        {
            id: 'mba-odl',
            title: 'Master in Business Administration (MBA-ODL)',
            period: 'Study Period: 1 Year / 2 Years',
            credits: '40 Credit Hours',
            href: 'https://www.openlearning.com/uptm/programs/mba-demo/'
        },
        {
            id: 'mis-odl',
            title: 'Master in Information System (MIS-ODL)',
            period: 'Study Period: - Year',
            credits: '- Credit Hours',
            href: 'https://www.openlearning.com/uptm/programs/msiso/'
        },
        {
            id: 'bhrm-odl',
            title: 'Bachelor of Business Administration (Honours) Human Resource Management (BHRM-ODL)',
            period: 'Study Period: 3 Years / 5 Years',
            credits: '120 Credit Hours',
            href: 'https://www.openlearning.com/uptm/programs/bbao_hrm/'
        },
        {
            id: 'bba-odl',
            title: 'Bachelor of Business Administration (Honours) (BBA-ODL)',
            period: 'Study Period: 3 Years / 5 Years',
            credits: '120 Credit Hours',
            href: 'https://www.openlearning.com/uptm/programs/bbaodl/'
        },
        {
            id: 'bece-odl',
            title: 'Bachelor of Early Childhood Education (Honours) (BECE-ODL)',
            period: 'Study Period: 3 Years / 4 Years',
            credits: '120 Credit Hours',
            href: 'https://www.openlearning.com/uptm/programs/bceo/'
        }
    ]

    // About Us Content Dataset
    const aboutData = {
        vision: "To be a leading catalyst for innovative, inclusive, and technology driven teaching and learning excellence that empowers lifelong learning and academic success.",
        mission: "To enhance teaching and learning by effectively integrating educational technologies, empowering academic staff through continuous professional development in digital pedagogy, fostering innovative, high-quality flexible learning experiences, and ensuring robust governance across the University's e-learning ecosystem.",
        milestones: [
            { year: "2024", event: "Official Structural Establishment of combined Academic Excellence Sector (AES) under UPTM Council Directive." },
            { year: "2025", event: "Attained 100% digital platform deployment benchmarks on next-gen LMS integration for blended learning modules." },
            { year: "2026", event: "Awarded ISO 9001:2015 institutional certificate for Outcome-Based Quality Assurance & Continuous Quality Improvement Systems." }
        ],
        strategicPillars: [
            { title: "Pedagogical Innovation", desc: "Transforming the physical and virtual classrooms via Activity-Based and immersive experiential sandbox scenarios." },
            { title: "Flexible Accessibility", desc: "Lowering barriers to higher education via customized APEL access entry pathways and stackable corporate micro-badges." },
            { title: "Societal Integrity", desc: "Merging scholarship directly into local societal gaps via robust credit-bearing SULAM projects." }
        ]
    };

    // Auto-advance Hero Feed Carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setFeedIndex((prev) => (prev + 1) % feedItems.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Run APEL.A  calculation on state changes
    useEffect(() => {
        let status = "Needs More Information";
        let colorClass = "text-amber-600 bg-amber-50 border-amber-200";
        let summary = "";

        if (apelTarget === 'Diploma') {
            if (apelAge >= 20 && apelExp >= 2) {
                status = "Highly Eligible for APEL.A (Diploma)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "You qualify to bypass formal high school certificate limitations and apply directly for Diploma entry. Consider APEL.C to also attempt course exemptions!";
            } else {
                status = "Insufficient Experience / Age Criteria";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "APEL.A for Diploma requires a minimum age of 20 years and relevant working experience. Consider standard admission pathways.";
            }
        } else if (apelTarget === 'Bachelor') {
            if (apelAge >= 21 && apelExp >= 3) {
                status = "Highly Eligible for APEL.A (Bachelor's Degree)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "Excellent! You meet MQA's benchmark of 21 years old and 3+ years of experience. You can pursue admission to any UPTM Bachelor program of equivalent background.";
            } else {
                status = "Below Baseline Age / Experience";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "Bachelor's APEL access requires 21 years of age and sustained working expertise. Contact our APEL unit to outline your progression roadmap.";
            }
        } else if (apelTarget === 'Master') {
            if (apelAge >= 30 && apelExp >= 5) {
                status = "Highly Eligible for APEL.A (Master's Degree)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "Superb leadership profile. With 30 years of age and 5+ years of strategic work experience, you are poised to apply for UPTM Post-Graduate Master programs.";
            } else {
                status = "Criteria Not Met for Post-Graduate APEL";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "Master's level APEL entry requires candidates to be at least 30 years old with 5+ years of proven professional output.";
            }
        }

        setApelResult({ status, colorClass, summary });
    }, [apelAge, apelExp, apelTarget]);

    // Run APEL.C  calculation on state changes
    useEffect(() => {
        let status = "Needs More Information";
        let colorClass = "text-amber-600 bg-amber-50 border-amber-200";
        let summary = "";

        if (apelTarget === 'Diploma') {
            if (apelAge >= 20 && apelExp >= 2) {
                status = "Highly Eligible for APEL.C (Diploma)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "You qualify to bypass formal high school certificate limitations and apply directly for Diploma entry. Consider APEL.C to also attempt course exemptions!";
            } else {
                status = "Insufficient Experience / Age Criteria";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "APEL.C for Diploma requires a minimum age of 20 years and relevant working experience. Consider standard admission pathways.";
            }
        } else if (apelTarget === 'Bachelor') {
            if (apelAge >= 21 && apelExp >= 3) {
                status = "Highly Eligible for APEL.C (Bachelor's Degree)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "Excellent! You meet MQA's benchmark of 21 years old and 3+ years of experience. You can pursue admission to any UPTM Bachelor program of equivalent background.";
            } else {
                status = "Below Baseline Age / Experience";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "Bachelor's APEL access requires 21 years of age and sustained working expertise. Contact our APEL unit to outline your progression roadmap.";
            }
        } else if (apelTarget === 'Master') {
            if (apelAge >= 30 && apelExp >= 5) {
                status = "Highly Eligible for APEL.C (Master's Degree)";
                colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
                summary = "Superb leadership profile. With 30 years of age and 5+ years of strategic work experience, you are poised to apply for UPTM Post-Graduate Master programs.";
            } else {
                status = "Criteria Not Met for Post-Graduate APEL";
                colorClass = "text-rose-700 bg-rose-50 border-rose-200";
                summary = "Master's level APEL entry requires candidates to be at least 30 years old with 5+ years of proven professional output.";
            }
        }

        setApelResult({ status, colorClass, summary });
    }, [apelAge, apelExp, apelTarget]);

    // Handle Quiz Answers submission
    const submitReadinessQuiz = () => {
        let score = 0;
        Object.values(quizAnswers).forEach(val => {
            score += parseInt(val);
        });
        setQuizScore(score);
    };

    // Calculate overall recommendations from Pathway Advisor
    const processRecommendation = (e) => {
        e.preventDefault();
        let title = "";
        let details = "";
        let targetUnit = "elearning";

        if (advisorProfile.type === 'working') {
            if (advisorProfile.interest === 'flexible-learning') {
                title = "Open and Distance Learning (ODL) Hub";
                details = "Since you are managing full-time career roles but wish to accelerate your education, ODL is your best pathway. It allows asynchronous modules matching your pacing.";
                targetUnit = "odl";
            } else if (advisorProfile.interest === 'assessment') {
                title = "Accreditation of Prior Experiential Learning (APEL) Office";
                details = "Your extensive work history represents immense academic capital. Our APEL.A and APEL.C models can translate that work history directly into degree access and credit exemptions.";
                targetUnit = "apel";
            } else {
                title = "Micro-Credential Ecosystem";
                details = "Stackable Micro-Credentials give you targeted competencies. Take short, fast modules claimable via HRD Corp, perfect for working professionals.";
                targetUnit = "microcredential";
            }
        } else if (advisorProfile.type === 'student') {
            if (advisorProfile.interest === 'community') {
                title = "SULAM Social Enterprise Hub";
                details = "You possess a distinct drive for society-oriented leadership. SULAM projects let you secure academic credits while implementing tangible local solutions.";
                targetUnit = "sulam";
            } else {
                title = "Activity-Based Learning (ABL) Interactive Tracks";
                details = "You thrive on doing rather than passive listening. ABL classes at UPTM integrate live-case simulators, hackathons, and physical models into standard assessments.";
                targetUnit = "abl";
            }
        } else {
            // Academic Profile
            if (advisorProfile.interest === 'digital') {
                title = "eLearning Pedagogical Development";
                details = "Discover cutting-edge gamification frameworks and e-content pipelines. Access our professional studios to craft modern micro-lectures.";
                targetUnit = "elearning";
            } else {
                title = "Outcome-Based Education (OBE) Quality Control Group";
                details = "Access our standardized syllabus matrix tooling to review, write, and map cognitive taxonomies (CLO-to-PLO) with ease.";
                targetUnit = "obe";
            }
        }

        setAdvisorRecommendation({ title, details, targetUnit });
    };

    // OBE matrix functions
    const addClo = (e) => {
        e.preventDefault();
        if (!newCloText.trim()) return;
        const newId = obeClos.length + 1;
        setObeClos([...obeClos, {
            id: newId,
            text: newCloText,
            plos: newCloPlos,
            domain: newCloDomain
        }]);
        setNewCloText('');
        setNewCloPlos([]);
    };

    const togglePloSelection = (ploNum) => {
        if (newCloPlos.includes(ploNum)) {
            setNewCloPlos(newCloPlos.filter(item => item !== ploNum));
        } else {
            setNewCloPlos([...newCloPlos, ploNum]);
        }
    };

    // Micro credential actions
    const toggleMicroCourse = (course) => {
        if (selectedMicroCourses.some(item => item.id === course.id)) {
            setSelectedMicroCourses(selectedMicroCourses.filter(item => item.id !== course.id));
        } else {
            setSelectedMicroCourses([...selectedMicroCourses, course]);
        }
    };

    // Hero feed social actions
    const toggleFeedLike = (id) => {
        setLikedFeedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const goToFeedTarget = (item) => {
        if (item.unitKey) {
            setActiveTab('units');
            setActiveUnit(item.unitKey);
        } else {
            setActiveTab('resources');
        }
    };

    // Feedback submit
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setFeedbackSubmitted(true);
        setTimeout(() => {
            setFeedbackSubmitted(false);
            setFeedbackData({ name: '', email: '', message: '', category: 'General' });
        }, 3000);
    };

    // Chat input processor
    const sendChatMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userText = chatInput.toLowerCase();
        const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
        setChatMessages(newMessages);
        setChatInput('');

        setTimeout(() => {
            let botReply = "I understand you are asking about UPTM AES. Please feel free to consult on: eLearning portals, ODL courses, SULAM criteria, APEL portfolios, OBE mappings, ABL activities, or Micro-Credential pathways.";
            
            if (userText.includes('apel') || userText.includes('prior learning')) {
                botReply = "Our APEL Unit manages alternative entry (APEL.A) and course credit exemptions (APEL.C). You can use our customized APEL Eligibility Calculator on this portal to see your criteria!";
            } else if (userText.includes('odl') || userText.includes('distance')) {
                botReply = "Open and Distance Learning at UPTM provides 100% online courses. Try utilizing the ODL planner in our units section to calculate course loads and explore programs!";
            } else if (userText.includes('elearning') || userText.includes('lms') || userText.includes('virtual campus')) {
                botReply = "UPTM's eLearning platform delivers a robust learning management environment. Check our eLearning section on this page to take the quick Digital Readiness Assessment!";
            } else if (userText.includes('sulam') || userText.includes('community')) {
                botReply = "SULAM links academic course structures directly to impactful community work. We have featured our current local community initiatives under the SULAM tab above.";
            } else if (userText.includes('obe') || userText.includes('clo') || userText.includes('plo')) {
                botReply = "Outcome-Based Education ensures course outputs align beautifully with Malaysian Qualification Framework specs. Try mapping dynamic CLOs inside our Interactive Mapping Matrix!";
            } else if (userText.includes('micro') || userText.includes('credential') || userText.includes('badge')) {
                botReply = "Micro-Credentials let you stack certificates to gain full degrees. Select any courses in our Micro-Credential stacker module to view potential degree credit rewards.";
            } else if (userText.includes('abl') || userText.includes('activity')) {
                botReply = "Activity-Based Learning leverages hand-on modules. Explore our interactive Sandbox inside the ABL section to build customizable structural lesson plans.";
            }

            setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 800);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <AnnouncementTicker />

            {/* HEADER NAVIGATION */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40 transition-all shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Logo Branding */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
                            <img 
                                src={aesLogo} // Update with your actual image path or import
                                alt="AES Logo" 
                                className="h-20 w-auto object-contain"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg font-extrabold tracking-tight text-uptm-navy-900">AES PORTAL</h1>
                                    <span className="text-[8.5px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">UPTM</span>
                                </div> 
                            </div>
                        </div>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex space-x-1">
                            <button 
                                onClick={() => setActiveTab('home')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-uptm-navy-50 text-uptm-navy-900 shadow-sm' : 'text-slate-600 hover:text-uptm-navy-900 hover:bg-slate-50'}`}>
                                <i className="fa-solid fa-house mr-1.5"></i> Home
                            </button>
                            <button 
                                onClick={() => setActiveTab('about')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'about' ? 'bg-uptm-navy-50 text-uptm-navy-900 shadow-sm' : 'text-slate-600 hover:text-uptm-navy-900 hover:bg-slate-50'}`}>
                                <i className="fa-solid fa-circle-info mr-1.5"></i> About Us
                            </button>
                            <button 
                                onClick={() => { setActiveTab('units'); setActiveUnit('elearning'); }}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'units' ? 'bg-uptm-navy-50 text-uptm-navy-900 shadow-sm' : 'text-slate-600 hover:text-uptm-navy-900 hover:bg-slate-50'}`}>
                                <i className="fa-solid fa-cubes mr-1.5"></i> Core Units
                            </button>
                            <button 
                                onClick={() => setActiveTab('pathway')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'pathway' ? 'bg-uptm-navy-50 text-uptm-navy-900 shadow-sm' : 'text-slate-600 hover:text-uptm-navy-900 hover:bg-slate-50'}`}>
                                <i className="fa-solid fa-compass mr-1.5"></i> Pathway Finder
                            </button>
                            <button 
                                onClick={() => setActiveTab('resources')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'resources' ? 'bg-uptm-navy-50 text-uptm-navy-900 shadow-sm' : 'text-slate-600 hover:text-uptm-navy-900 hover:bg-slate-50'}`}>
                                <i className="fa-solid fa-file-invoice mr-1.5"></i> Resources
                            </button>   
                        </nav>

                        {/* Quick CTA */}
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setChatOpen(!chatOpen)}
                                className="bg-uptm-navy-900 hover:bg-uptm-crimson text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm">
                                <i className="fa-solid fa-circle-question text-uptm-gold"></i>
                                <span>AES Helpdesk</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE NAV DRAWER OVERLAY */}
            <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex justify-around items-center sticky top-20 z-30 shadow-sm">
                <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-0.5 text-xs font-bold ${activeTab === 'home' ? 'text-uptm-crimson' : 'text-slate-500'}`}>
                    <i className="fa-solid fa-house text-sm"></i>
                    <span>Home</span>
                </button>
                <button onClick={() => { setActiveTab('units'); }} className={`flex flex-col items-center gap-0.5 text-xs font-bold ${activeTab === 'units' ? 'text-uptm-crimson' : 'text-slate-500'}`}>
                    <i className="fa-solid fa-cubes text-sm"></i>
                    <span>Units</span>
                </button>
                <button onClick={() => setActiveTab('pathway')} className={`flex flex-col items-center gap-0.5 text-xs font-bold ${activeTab === 'pathway' ? 'text-uptm-crimson' : 'text-slate-500'}`}>
                    <i className="fa-solid fa-compass text-sm"></i>
                    <span>Pathway</span>
                </button>
                <button onClick={() => setActiveTab('resources')} className={`flex flex-col items-center gap-0.5 text-xs font-bold ${activeTab === 'resources' ? 'text-uptm-crimson' : 'text-slate-500'}`}>
                    <i className="fa-solid fa-file-invoice text-sm"></i>
                    <span>Resources</span>
                </button>
                <button onClick={() => setActiveTab('about')} className={`flex flex-col items-center gap-0.5 text-xs font-bold ${activeTab === 'about' ? 'text-uptm-crimson' : 'text-slate-500'}`}>
                    <i className="fa-solid fa-circle-info text-sm"></i>
                    <span>About Us</span>
                </button>
            </div>

            {/* MAIN CONTAINER */}
            <main className="flex-grow">
                
                {/* 1. HOME TAB */}
                {activeTab === 'home' && (
                    <div>
                        {/* Hero Section */}
                        <section className="hero-banner text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                            {/* Use a direct string path starting with '/' */}
                            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroBg})` }}></div>
                            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                <div className="lg:col-span-7 space-y-6">
                                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                                        Spearheading Academic <span className="text-uptm-gold">Excellence</span> & Strategic Innovation
                                    </h2>
                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        Welcome to the Academic Excellence Sector (AES) department at Universiti Poly-Tech Malaysia. We orchestrate pioneering methodologies in digital, community-oriented, outcome-based, and experiential learning across UPTM.
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <button 
                                            onClick={() => { setActiveTab('units'); setActiveUnit('elearning'); }}
                                            className="bg-uptm-crimson hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2">
                                            Explore Our 7 Units <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('pathway')}
                                            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3 rounded-xl border border-slate-700 transition-all">
                                            Match Your Pathway
                                        </button>
                                    </div>
                                </div>

                                {/* Dynamic Mini Dashboard Card */}
                                <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">

                                    {/* Carousel Header */}
                                    <div className="flex items-center justify-between mb-5">

                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <i className="fa-solid fa-rss text-uptm-gold"></i>
                                            <span>Latest AES Feed</span>
                                        </h3>

                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            {feedIndex + 1} / {feedItems.length}
                                        </span>

                                    </div>


                                    {/* Carousel Content */}
                                    <div className="relative min-h-[320px]">

                                        {feedItems.map((item, index) => {
                                            const isLiked = likedFeedItems.includes(item.id);
                                            return (
                                            <article
                                                key={item.id}
                                                className={`absolute inset-0 transition-all duration-500 ease-out ${
                                                    index === feedIndex
                                                        ? 'opacity-100 translate-x-0 pointer-events-auto'
                                                        : index < feedIndex
                                                            ? 'opacity-0 -translate-x-6 pointer-events-none'
                                                            : 'opacity-0 translate-x-6 pointer-events-none'
                                                }`}
                                            >

                                                <div className="h-full bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">

                                                    {/* Post Body */}
                                                    <div className="space-y-3">

                                                        {/* Post Header: Avatar + Author + Category/Date */}
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-sm flex-shrink-0 shadow-md`}>
                                                                <i className={`fa-solid ${item.icon}`}></i>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center gap-1.5">
                                                                    <h5 className="text-xs font-extrabold text-white truncate">
                                                                        {item.author}
                                                                    </h5>
                                                                    <span className="text-[9px] text-slate-500 font-semibold flex-shrink-0">
                                                                        · {item.date}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                                                    {item.category}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Post Title + Caption */}
                                                        <div>
                                                            <h4 className="text-base font-black text-white leading-snug mb-1.5">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        {/* Optional Photo */}
                                                        {item.image && (
                                                            <div className="rounded-xl overflow-hidden h-24">
                                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                            </div>
                                                        )}

                                                    </div>


                                                    {/* Engagement Footer */}
                                                    <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">

                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleFeedLike(item.id)}
                                                                aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
                                                                className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${isLiked ? 'text-uptm-crimson' : 'text-slate-400 hover:text-uptm-crimson'}`}
                                                            >
                                                                <i className="fa-solid fa-heart"></i>
                                                                {item.likes + (isLiked ? 1 : 0)}
                                                            </button>
                                                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                                                <i className="fa-solid fa-comment"></i>
                                                                {item.comments}
                                                            </span>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => goToFeedTarget(item)}
                                                            className="text-[11px] font-bold text-white hover:text-uptm-gold transition-colors flex items-center gap-1"
                                                        >
                                                            View
                                                            <i className="fa-solid fa-arrow-right text-[9px]"></i>
                                                        </button>

                                                    </div>

                                                </div>

                                            </article>
                                            );
                                        })}

                                    </div>


                                    {/* Carousel Controls */}
                                    <div className="flex items-center justify-between mt-5">

                                        {/* Pagination Dots */}
                                        <div className="flex items-center gap-1.5">

                                            {feedItems.map((item, index) => (

                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setFeedIndex(index)}
                                                    aria-label={`Show feed item ${index + 1}: ${item.title}`}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                                        index === feedIndex
                                                            ? 'w-7 bg-uptm-gold'
                                                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                                                    }`}
                                                />

                                            ))}

                                        </div>


                                        {/* Previous / Next Buttons */}
                                        <div className="flex items-center gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFeedIndex(
                                                        (prev) =>
                                                            (prev - 1 + feedItems.length) %
                                                            feedItems.length
                                                    )
                                                }
                                                aria-label="Previous feed item"
                                                className="w-9 h-9 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center"
                                            >
                                                <i className="fa-solid fa-chevron-left text-xs"></i>
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFeedIndex(
                                                        (prev) =>
                                                            (prev + 1) % feedItems.length
                                                    )
                                                }
                                                aria-label="Next feed item"
                                                className="w-9 h-9 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center"
                                            >
                                                <i className="fa-solid fa-chevron-right text-xs"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* Interactive Overview of 7 Core Units */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                                <h2 className="text-3xl font-extrabold tracking-tight text-uptm-navy-900">
                                    Our Specialized Academic Units
                                </h2>
                                <p className="text-slate-600">
                                    AES coordinates seven distinct pillars designed to empower student progression, modern pedagogy, community contribution, and rigid national accreditation parameters.
                                </p>
                            </div>

                            {/* 7 Pillars Grid layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Object.entries(unitsData).map(([key, unit]) => (
                                    <div 
                                        key={key} 
                                        onClick={() => { setActiveTab('units'); setActiveUnit(key); }}
                                        className="bg-white border border-slate-200 hover:border-uptm-navy-500 rounded-3xl p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group flex flex-col justify-between h-80">
                                        
                                        <div className="space-y-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-uptm-navy-800 group-hover:bg-uptm-navy-800 group-hover:text-white transition-all shadow-sm">
                                                <i className={`fa-solid ${unit.icon} text-lg`}></i>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-uptm-navy-900 group-hover:text-uptm-crimson transition-all">{unit.title}</h3>
                                                <p className="text-xs font-semibold text-slate-400 uppercase mt-1 tracking-wider">Unit Head: {unit.lead.split('Bin')[0]}</p>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                                {unit.tagline}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-uptm-navy-900">
                                            <span>Launch Interactive Tool</span>
                                            <i className="fa-solid fa-arrow-right-long text-uptm-gold animate-pulse"></i>
                                        </div>
                                    </div>
                                ))}

                                {/* Pathway Finder Quick Card */}
                                <div 
                                    onClick={() => setActiveTab('pathway')}
                                    className="bg-gradient-to-br from-uptm-navy-900 to-uptm-crimson text-white rounded-3xl p-6 hover:shadow-xl cursor-pointer flex flex-col justify-between h-80">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-uptm-gold text-xl">
                                            <i className="fa-solid fa-graduation-cap"></i>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Confused about which fits you?</h3>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Answer simple profile questions on our interactive Pathway Finder to map your target academic requirements to our specialized AES units!
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-uptm-gold">
                                        <span>Try Dynamic Pathway Finder</span>
                                        <i className="fa-solid fa-angles-right"></i>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Strategic Goals / Core Values Section */}
                        <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <span className="text-xs uppercase tracking-widest font-extrabold text-uptm-crimson">Strategic Vision</span>
                                    <h2 className="text-3xl font-extrabold text-uptm-navy-900">Transforming Malaysian Higher Education Pathways</h2>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        AES department aims to foster state-of-the-art educational quality parameters that not only meet the demanding benchmarks of Malaysia Qualification Agency (MQA) but also elevate UPTM graduates as flexible, community-centric, and digitally agile workforce professionals.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                                            <h4 className="font-bold text-uptm-navy-900 mb-1 flex items-center gap-2">
                                                <i className="fa-solid fa-bullseye text-uptm-crimson"></i> Global Readiness
                                            </h4>
                                            <p className="text-xs text-slate-500">Equipping educators with advanced technological toolkits and pedagogies.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                                            <h4 className="font-bold text-uptm-navy-900 mb-1 flex items-center gap-2">
                                                <i className="fa-solid fa-heart text-uptm-gold"></i> Social Inclusion
                                            </h4>
                                            <p className="text-xs text-slate-500">Embedding direct societal support frameworks through standardized SULAM curriculums.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    {/* UPDATED LINE BELOW */}
                                    <img src={studentsImg} alt="Students Collaborating" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover h-96" />
                                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-uptm-gold/20 rounded-3xl -z-0"></div>
                                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-uptm-crimson/10 rounded-3xl -z-0"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* 2. CORE UNITS TAB */}
                {activeTab === 'units' && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        
                        {/* Side panel + Content Panel Grid layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Sidebar navigation */}
                            <div className="lg:col-span-3 space-y-2">
                                <div className="bg-uptm-navy-900 text-white rounded-t-2xl p-4 text-xs font-bold uppercase tracking-wider">
                                    AES Specialized Units
                                </div>
                                <div className="bg-white border border-slate-200 rounded-b-2xl p-3 space-y-1 shadow-sm">
                                    {Object.entries(unitsData).map(([key, unit]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveUnit(key)}
                                            className={`w-full text-left p-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${activeUnit === key ? 'bg-uptm-crimson text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
                                            <span className="flex items-center gap-2.5">
                                                <i className={`fa-solid ${unit.icon} text-sm`}></i>
                                                {unit.shortTitle || unit.title}
                                            </span>
                                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Dynamic Unit Help Tip */}
                                <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 space-y-2">
                                    <h4 className="font-bold text-uptm-navy-900"><i className="fa-solid fa-circle-info"></i> Interactive Sandbox</h4>
                                    <p>Each unit has its own real-world mock interactive module built in. Select any unit to use calculators, lesson plan templates, and mapping tools.</p>
                                </div>
                            </div>

                            {/* Detailed Content Panel */}
                            <div className="lg:col-span-9 space-y-8">
                                
                                {/* Main Unit Card */}
                                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            {/* CONDITIONAL RENDER: SHOW LOGO IF AVAILABLE, OTHERWISE SHOW ICON */}
                                            {unitsData[activeUnit].logo ? (
                                                /* Unit Logo Image Container (Enlarged) */
                                                <div className="w-28 sm:w-38 sm:h-22 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center p-2 shadow-md overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={unitsData[activeUnit].logo || (activeUnit === 'elearning' ? elLogo : null)} 
                                                        alt={`${unitsData[activeUnit].title} Logo`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                /* Original FontAwesome Icon Container */
                                                <div className="w-14 h-14 bg-uptm-navy-50 rounded-2xl flex items-center justify-center text-uptm-navy-800 text-2xl shadow-sm flex-shrink-0">
                                                    <i className={`fa-solid ${unitsData[activeUnit].icon}`}></i>
                                                </div>
                                            )}

                                            <div>
                                                <span className="text-xs font-bold text-uptm-crimson uppercase tracking-wider">UPTM AES Division</span>
                                                <h2 className="text-2xl font-black text-uptm-navy-900">{unitsData[activeUnit].title}</h2>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex flex-col items-start text-xs">
                                            <span className="text-slate-400 font-semibold uppercase">Unit Coordinator</span>
                                            <span className="font-bold text-slate-700">{unitsData[activeUnit].lead}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-slate-800">Operational Mandate</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {unitsData[activeUnit].description}
                                            </p>
                                            <blockquote className="bg-slate-50 border-l-4 border-uptm-gold p-3 rounded-r-xl italic text-xs text-slate-500">
                                                "{unitsData[activeUnit].tagline}"
                                            </blockquote>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-slate-800">Core Strategic Actions</h3>
                                            <ul className="space-y-2.5">
                                                {unitsData[activeUnit].highlights.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                                                        <span className="text-uptm-crimson mt-0.5"><i className="fa-solid fa-square-check"></i></span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* eLearning Assessment Quiz Module */}
                                {activeUnit === 'elearning' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-clipboard-question text-uptm-gold"></i>
                                                <span>Interactive: eLearning Readiness Assessment</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Determine if your study configuration is fully optimized for remote/digital classes.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                                                <p className="text-xs font-bold text-slate-700 mb-2">1. Do you possess stable fiber/LTE broadband of at least 20 Mbps?</p>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q1" value="5" onChange={(e)=>setQuizAnswers({...quizAnswers, q1: e.target.value})} /> Yes, consistently</label>
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q1" value="2" onChange={(e)=>setQuizAnswers({...quizAnswers, q1: e.target.value})} /> Intermittent coverage</label>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                                                <p className="text-xs font-bold text-slate-700 mb-2">2. What device do you utilize as your primary learning hub?</p>
                                                <div className="flex gap-4 flex-wrap">
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q2" value="5" onChange={(e)=>setQuizAnswers({...quizAnswers, q2: e.target.value})} /> Personal Laptop / PC</label>
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q2" value="3" onChange={(e)=>setQuizAnswers({...quizAnswers, q2: e.target.value})} /> Tablet with Keyboard</label>
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q2" value="1" onChange={(e)=>setQuizAnswers({...quizAnswers, q2: e.target.value})} /> Smartphone Only</label>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                                                <p className="text-xs font-bold text-slate-700 mb-2">3. Rate your familiarity with UPTM e-Learning Portal / Moodle platforms.</p>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q3" value="5" onChange={(e)=>setQuizAnswers({...quizAnswers, q3: e.target.value})} /> High Proficiency</label>
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q3" value="3" onChange={(e)=>setQuizAnswers({...quizAnswers, q3: e.target.value})} /> Intermediate User</label>
                                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="radio" name="q3" value="1" onChange={(e)=>setQuizAnswers({...quizAnswers, q3: e.target.value})} /> Brand New / Beginner</label>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={submitReadinessQuiz}
                                                className="bg-uptm-navy-900 hover:bg-uptm-crimson text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
                                                Compile Readiness Score
                                            </button>

                                            {quizScore !== null && (
                                                <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs font-extrabold text-blue-800 uppercase">Assessment Results</span>
                                                        <span className="text-lg font-black text-blue-900">{quizScore} / 15 Points</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600">
                                                        {quizScore >= 12 ? "Excellent Digital Setup! You are fully optimized to participate in complex asynchronous courses. Go check out ODL formats!" : "Moderate Digital Readiness. Your environment works, but standard LMS platforms could pose technical hurdles. Check our Resources section for quick student training sheets."}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ODL Unit Course Planner */}
                                {activeUnit === 'odl' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-compass text-uptm-gold"></i>
                                                <span>Interactive: ODL Degree Planner & Schedule Load</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Determine how academic courses match against standard corporate shifts.</p>
                                        </div>

                                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                                            <p className="text-xs font-bold text-slate-700">Select ODL Target Program Stream:</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <a 
                                                    href="https://www.openlearning.com/uptm/programs/mba-demo/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group p-4 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-uptm-gold hover:shadow-md hover:shadow-uptm-gold/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-bold text-xs text-uptm-navy-900 group-hover:text-uptm-crimson transition-colors duration-200 leading-snug">
                                                                Master of Business Administration (MBA-ODL)
                                                            </h4>
                                                            <span className="text-[10px] text-slate-400 group-hover:text-uptm-crimson font-bold shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                                ↗
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-2">Study Period: 1 Year / 2 Years | 40 Credit Hours</p>
                                                    </div>
                                                </a>
                                                <a 
                                                    href="https://www.openlearning.com/uptm/programs/msiso/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group p-4 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-uptm-gold hover:shadow-md hover:shadow-uptm-gold/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-bold text-xs text-uptm-navy-900 group-hover:text-uptm-crimson transition-colors duration-200 leading-snug">
                                                                Master of Science in Information System (MIS-ODL)
                                                            </h4>
                                                            <span className="text-[10px] text-slate-400 group-hover:text-uptm-crimson font-bold shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                                ↗
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-2">Study Period: - Year | - Credit Hours</p>
                                                    </div>
                                                </a>
                                                <a 
                                                    href="https://www.openlearning.com/uptm/programs/bbao_hrm/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group p-4 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-uptm-gold hover:shadow-md hover:shadow-uptm-gold/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-bold text-xs text-uptm-navy-900 group-hover:text-uptm-crimson transition-colors duration-200 leading-snug">
                                                                Bachelor of Business Administration (Honours) Human Resource Management (BHRM-ODL)
                                                            </h4>
                                                            <span className="text-[10px] text-slate-400 group-hover:text-uptm-crimson font-bold shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                                ↗
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-2">Study Period: 3 Years / 5 Years | 120 Credit Hours</p>
                                                    </div>
                                                </a>
                                                <a 
                                                    href="https://www.openlearning.com/uptm/programs/bbao_hrm/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group p-4 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-uptm-gold hover:shadow-md hover:shadow-uptm-gold/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-bold text-xs text-uptm-navy-900 group-hover:text-uptm-crimson transition-colors duration-200 leading-snug">
                                                                Bachelor of Business Administration (Honours) (BBA-ODL)
                                                            </h4>
                                                            <span className="text-[10px] text-slate-400 group-hover:text-uptm-crimson font-bold shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                                ↗
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-2">Study Period: 3 Years / 5 Years | 120 Credit Hours</p>
                                                    </div>
                                                </a>
                                                <a 
                                                    href="https://www.openlearning.com/uptm/programs/bceo/" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group p-4 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:border-uptm-gold hover:shadow-md hover:shadow-uptm-gold/5 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h4 className="font-bold text-xs text-uptm-navy-900 group-hover:text-uptm-crimson transition-colors duration-200 leading-snug">
                                                                Bachelor of Early Childhood Education (Honours) <p></p> (BECE-ODL)
                                                            </h4>
                                                            
                                                            <span className="text-[10px] text-slate-400 group-hover:text-uptm-crimson font-bold shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                                                ↗
                                                            </span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 mt-2">Study Period: 3 Years / 4 Years | 120 Credit Hours</p>
                                                    </div>
                                                </a>
                                            </div>
                                            
                                            <div className="pt-4 border-t border-slate-200">
                                                <h4 className="text-xs font-bold text-slate-700 mb-2">Student Journey Simulation Matrix:</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                                                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Weekly Self-Study</span>
                                                        <span className="text-sm font-black text-blue-800">8 - 12 Hours</span>
                                                    </div>
                                                    <div className="p-3 bg-fuchsia-50/50 rounded-xl border border-fuchsia-100 text-center">
                                                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Live Tutorial Sessions</span>
                                                        <span className="text-sm font-black text-fuchsia-800">Alternate Weekends</span>
                                                    </div>
                                                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                                                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Examinations Mode</span>
                                                        <span className="text-sm font-black text-amber-800">Fully Online</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SULAM Projects Gallery */}
                                {activeUnit === 'sulam' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                    <i className="fa-solid fa-users text-uptm-gold"></i>
                                                    <span>Interactive: SULAM Project Registry</span>
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1">Review active, social projects led by UPTM student groups.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                {['All', 'Business', 'Technology', 'Environment', 'Social'].map(cat => (
                                                    <button 
                                                        key={cat}
                                                        onClick={() => setSulamFilter(cat)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${sulamFilter === cat ? 'bg-uptm-crimson text-white border-uptm-crimson' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {sulamProjects.filter(p => sulamFilter === 'All' || p.category === sulamFilter).map(proj => (
                                                <div key={proj.id} className="flex bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                    <img src={proj.img} alt={proj.title} className="w-24 object-cover" />
                                                    <div className="p-4 flex flex-col justify-between">
                                                        <div>
                                                            <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase">{proj.category}</span>
                                                            <h4 className="font-extrabold text-xs text-slate-800 mt-1.5">{proj.title}</h4>
                                                        </div>
                                                        <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-2">
                                                            <i className="fa-solid fa-circle-check"></i> Impact: {proj.impact}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* OBE Mapping Matrix Calculator */}
                                {activeUnit === 'obe' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-calculator text-uptm-gold"></i>
                                                <span>Interactive: CLO-PLO Mapping Alignment Tool</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Design academic syllabus learning outcomes and trace target program goals.</p>
                                        </div>

                                        {/* Entry Form */}
                                        <form onSubmit={addClo} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-4">
                                            <h4 className="text-xs font-bold text-slate-700">Add New Course Learning Outcome (CLO):</h4>
                                            
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-400 font-bold uppercase">CLO Descriptor Text</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={newCloText}
                                                    onChange={(e) => setNewCloText(e.target.value)}
                                                    placeholder="e.g., Formulate relational databases obeying 3NF schemas." 
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-uptm-navy-500 focus:outline-none" />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-slate-400 font-bold uppercase">Taxonomy Domain</label>
                                                    <select 
                                                        value={newCloDomain} 
                                                        onChange={(e) => setNewCloDomain(e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs">
                                                        <option>Cognitive (C1)</option>
                                                        <option>Cognitive (C2)</option>
                                                        <option>Cognitive (C3)</option>
                                                        <option>Psychomotor (P3)</option>
                                                        <option>Psychomotor (P4)</option>
                                                        <option>Affective (A2)</option>
                                                        <option>Affective (A3)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-slate-400 font-bold uppercase">Map to PLOs (Program Outcomes)</label>
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {[1,2,3,4,5,6].map(num => (
                                                            <button 
                                                                type="button"
                                                                key={num}
                                                                onClick={() => togglePloSelection(num)}
                                                                className={`w-7 h-7 rounded text-[10px] font-bold transition-all ${newCloPlos.includes(num) ? 'bg-uptm-crimson text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                                                PLO{num}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" className="bg-uptm-navy-900 hover:bg-uptm-crimson text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
                                                Add CLO to Matrix
                                            </button>
                                        </form>

                                        {/* Matrix Listing */}
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] font-extrabold border-b border-slate-200">
                                                        <th className="p-3">Syllabus Outcome</th>
                                                        <th className="p-3">Domain</th>
                                                        <th className="p-3 text-center">PLO1</th>
                                                        <th className="p-3 text-center">PLO2</th>
                                                        <th className="p-3 text-center">PLO3</th>
                                                        <th className="p-3 text-center">PLO4</th>
                                                        <th className="p-3 text-center">PLO5</th>
                                                        <th className="p-3 text-center">PLO6</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {obeClos.map(item => (
                                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                                            <td className="p-3 font-semibold text-slate-700">CLO {item.id}: {item.text}</td>
                                                            <td className="p-3"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{item.domain}</span></td>
                                                            {[1,2,3,4,5,6].map(ploNum => (
                                                                <td key={ploNum} className="p-3 text-center">
                                                                    {item.plos.includes(ploNum) ? (
                                                                        <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full inline-flex items-center justify-center font-bold text-[10px]"><i className="fa-solid fa-check"></i></span>
                                                                    ) : (
                                                                        <span className="text-slate-300">-</span>
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* APEL.A Eligibility Checker */}
                                {activeUnit === 'apel' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-calculator text-uptm-gold"></i>
                                                <span>Interactive: APEL.A Fast-Entry Calculator</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Determine if your combined age and working experience grant you direct academic access to UPTM degrees.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            
                                            {/* Sliders panel */}
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                        <span>Applicant Age:</span>
                                                        <span className="text-uptm-crimson">{apelAge} Years Old</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="18" 
                                                        max="55" 
                                                        value={apelAge} 
                                                        onChange={(e) => setApelAge(parseInt(e.target.value))}
                                                        className="w-full accent-uptm-crimson" />
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                        <span>Relevant Work Experience:</span>
                                                        <span className="text-uptm-crimson">{apelExp} Years</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="0" 
                                                        max="20" 
                                                        value={apelExp} 
                                                        onChange={(e) => setApelExp(parseInt(e.target.value))}
                                                        className="w-full accent-uptm-crimson" />
                                                </div>

                                                <div>
                                                    <span className="text-xs font-bold text-slate-700 block mb-1">Target Study Tier:</span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {['Diploma', 'Bachelor', 'Master'].map(tier => (
                                                            <button 
                                                                key={tier}
                                                                type="button"
                                                                onClick={() => setApelTarget(tier)}
                                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${apelTarget === tier ? 'bg-uptm-navy-900 text-white border-uptm-navy-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                                                                {tier}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Results Output panel */}
                                            {apelResult && (
                                                <div className={`p-5 rounded-2xl border ${apelResult.colorClass} flex flex-col justify-between h-full`}>
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-extrabold uppercase tracking-wider block">MQA APEL Diagnostic</span>
                                                        <h4 className="font-black text-sm">{apelResult.status}</h4>
                                                        <p className="text-xs text-slate-600 leading-relaxed">{apelResult.summary}</p>
                                                    </div>
                                                    <div className="pt-4 border-t border-slate-200/50 flex gap-2">
                                                        <button className="bg-uptm-navy-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Apply Portfolio Review</button>
                                                        <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold">Download APEL.C Handbook</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* APEL.C Eligibility Checker */}
                                {activeUnit === 'apel' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-calculator text-uptm-gold"></i>
                                                <span>Interactive: APEL.C Fast-Entry Calculator</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Determine if your combined age and working experience grant you direct academic access to UPTM degrees.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            
                                            {/* Sliders panel */}
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                        <span>Applicant Age:</span>
                                                        <span className="text-uptm-crimson">{apelAge} Years Old</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="18" 
                                                        max="55" 
                                                        value={apelAge} 
                                                        onChange={(e) => setApelAge(parseInt(e.target.value))}
                                                        className="w-full accent-uptm-crimson" />
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                        <span>Relevant Work Experience:</span>
                                                        <span className="text-uptm-crimson">{apelExp} Years</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="0" 
                                                        max="20" 
                                                        value={apelExp} 
                                                        onChange={(e) => setApelExp(parseInt(e.target.value))}
                                                        className="w-full accent-uptm-crimson" />
                                                </div>

                                                <div>
                                                    <span className="text-xs font-bold text-slate-700 block mb-1">Target Study Tier:</span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {['Diploma', 'Bachelor', 'Master'].map(tier => (
                                                            <button 
                                                                key={tier}
                                                                type="button"
                                                                onClick={() => setApelTarget(tier)}
                                                                className={`p-2 rounded-xl text-xs font-bold border transition-all ${apelTarget === tier ? 'bg-uptm-navy-900 text-white border-uptm-navy-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                                                                {tier}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Results Output panel */}
                                            {apelResult && (
                                                <div className={`p-5 rounded-2xl border ${apelResult.colorClass} flex flex-col justify-between h-full`}>
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-extrabold uppercase tracking-wider block">MQA APEL Diagnostic</span>
                                                        <h4 className="font-black text-sm">{apelResult.status}</h4>
                                                        <p className="text-xs text-slate-600 leading-relaxed">{apelResult.summary}</p>
                                                    </div>
                                                    <div className="pt-4 border-t border-slate-200/50 flex gap-2">
                                                        <button className="bg-uptm-navy-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Apply Portfolio Review</button>
                                                        <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold">Download APEL.C Handbook</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ABL Active Learning Sandbox */}
                                {activeUnit === 'abl' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-puzzle-piece text-uptm-gold"></i>
                                                <span>Interactive: Active Learning Sandbox</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Educators can preview high-impact experiential training structures to integrate inside standard course syllabus plans.</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="p-4 bg-slate-50 border-l-4 border-emerald-500 rounded-r-2xl space-y-2">
                                                <h4 className="font-bold text-xs text-slate-800">1. Think-Pair-Share</h4>
                                                <p className="text-[11px] text-slate-500">Students analyze an executive case, solve with peers, and defend output to class.</p>
                                                <span className="inline-block text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Cognitive (C4)</span>
                                            </div>
                                            <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-2xl space-y-2">
                                                <h4 className="font-bold text-xs text-slate-800">2. Collaborative Hack</h4>
                                                <p className="text-[11px] text-slate-500">Teams develop a software container or design mockup solving real corporate issues in 2 hours.</p>
                                                <span className="inline-block text-[9px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Psychomotor (P5)</span>
                                            </div>
                                            <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-2xl space-y-2">
                                                <h4 className="font-bold text-xs text-slate-800">3. Interactive Roleplay</h4>
                                                <p className="text-[11px] text-slate-500">Simulate general assemblies, business disputes, or stakeholder negotiations.</p>
                                                <span className="inline-block text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Affective (A3)</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Micro-Credential Stacking Stacker */}
                                {activeUnit === 'microcredential' && (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="text-lg font-bold text-uptm-navy-900 flex items-center gap-2">
                                                <i className="fa-solid fa-award text-uptm-gold"></i>
                                                <span>Interactive: Micro-Credential Credit Stacker</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Select and stack bite-sized certificates to visualize your progress toward UPTM academic exemptions.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-700">Available Micro-Courses:</h4>
                                                <div className="space-y-2">
                                                    {microCoursesList.map(course => {
                                                        const isSelected = selectedMicroCourses.some(item => item.id === course.id);
                                                        return (
                                                            <div 
                                                                key={course.id} 
                                                                onClick={() => toggleMicroCourse(course)}
                                                                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'bg-fuchsia-50/70 border-fuchsia-400 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                                                                <div className="flex items-center gap-2.5">
                                                                    <span className="text-lg">{course.badge}</span>
                                                                    <div>
                                                                        <h5 className="text-xs font-bold text-slate-800">{course.name}</h5>
                                                                        <p className="text-[10px] text-slate-400 font-semibold">{course.credits} Credits | Fee: {course.fee}</p>
                                                                    </div>
                                                                </div>
                                                                <i className={`fa-solid ${isSelected ? 'fa-circle-check text-fuchsia-600' : 'fa-circle text-slate-300'}`}></i>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                                                <div className="space-y-4">
                                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Stacking Pipeline</h4>
                                                    
                                                    <div className="space-y-1.5">
                                                        <div className="flex justify-between text-xs font-bold">
                                                            <span>Cumulative Credits Stacked:</span>
                                                            <span className="text-fuchsia-600">
                                                                {selectedMicroCourses.reduce((sum, item) => sum + item.credits, 0)} Credits
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                                            <div 
                                                                className="h-full bg-gradient-to-r from-fuchsia-600 to-pink-600 transition-all duration-300"
                                                                style={{width: `${Math.min((selectedMicroCourses.reduce((sum, item) => sum + item.credits, 0) / 15) * 100, 100)}%`}}></div>
                                                        </div>
                                                        <span className="text-[9px] text-slate-400 block text-right">Target Exemption Threshold: 15 Credits</span>
                                                    </div>

                                                    <div className="pt-2 border-t border-slate-200">
                                                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Target Exemption Equivalency</span>
                                                        {selectedMicroCourses.length === 0 ? (
                                                            <p className="text-xs text-slate-500 italic">No courses selected in stack pipeline.</p>
                                                        ) : (
                                                            <div className="space-y-1">
                                                                <span className="text-xs font-extrabold text-slate-700">Allows bypass of up to {selectedMicroCourses.length} syllabus subjects!</span>
                                                                <p className="text-[10px] text-slate-500">Estimated tuition savings: RM {selectedMicroCourses.reduce((sum, item) => sum + (item.credits * 120), 0)}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <button className="w-full mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm">
                                                    Generate Official Exemption Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                )}

                {/* 3. PATHWAY FINDER TAB */}
                {activeTab === 'pathway' && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                                <div className="w-12 h-12 bg-uptm-navy-50 text-uptm-navy-900 rounded-2xl flex items-center justify-center text-xl mx-auto shadow-sm">
                                    <i className="fa-solid fa-compass"></i>
                                </div>
                                <h2 className="text-2xl font-black text-uptm-navy-900">Academic Pathway Advisor</h2>
                                <p className="text-xs text-slate-500">Let our AES routing algorithm suggest the ideal department unit based on your academic role or professional expectations.</p>
                            </div>

                            <form onSubmit={processRecommendation} className="space-y-6 pt-4 border-t border-slate-100">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 block">Select Your Academic Profile:</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                <input 
                                                    type="radio" 
                                                    name="advisorType" 
                                                    value="student"
                                                    checked={advisorProfile.type === 'student'}
                                                    onChange={(e) => setAdvisorProfile({...advisorProfile, type: e.target.value})}
                                                    className="accent-uptm-crimson" />
                                                <span>Traditional / Non-Traditional Student</span>
                                            </label>
                                            <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                <input 
                                                    type="radio" 
                                                    name="advisorType" 
                                                    value="working"
                                                    checked={advisorProfile.type === 'working'}
                                                    onChange={(e) => setAdvisorProfile({...advisorProfile, type: e.target.value})}
                                                    className="accent-uptm-crimson" />
                                                <span>Working Professional / Executive</span>
                                            </label>
                                            <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                <input 
                                                    type="radio" 
                                                    name="advisorType" 
                                                    value="academic"
                                                    checked={advisorProfile.type === 'academic'}
                                                    onChange={(e) => setAdvisorProfile({...advisorProfile, type: e.target.value})}
                                                    className="accent-uptm-crimson" />
                                                <span>Academic Educator / Researcher</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 block">Select Your Dominant Area of Interest:</label>
                                        <div className="space-y-2">
                                            {advisorProfile.type === 'working' ? (
                                                <>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="flexible-learning"
                                                            checked={advisorProfile.interest === 'flexible-learning'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Flexible, 100% online courses</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="assessment"
                                                            checked={advisorProfile.interest === 'assessment'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Turning work history into degree exemptions</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="speed"
                                                            checked={advisorProfile.interest === 'speed'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Short, bite-sized skill validation</span>
                                                    </label>
                                                </>
                                            ) : advisorProfile.type === 'student' ? (
                                                <>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="community"
                                                            checked={advisorProfile.interest === 'community'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Applying syllabus to local community projects</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="hands-on"
                                                            checked={advisorProfile.interest === 'hands-on'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Collaborative workshops, prototypes & simulators</span>
                                                    </label>
                                                </>
                                            ) : (
                                                <>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="digital"
                                                            checked={advisorProfile.interest === 'digital'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Designing e-content and remote classrooms</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600">
                                                        <input 
                                                            type="radio" 
                                                            name="advisorInterest" 
                                                            value="accreditation"
                                                            checked={advisorProfile.interest === 'accreditation'}
                                                            onChange={(e) => setAdvisorProfile({...advisorProfile, interest: e.target.value})}
                                                            className="accent-uptm-crimson" />
                                                        <span>Mapping learning taxonomies & MQA compliance</span>
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-uptm-navy-900 hover:bg-uptm-crimson text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md">
                                    Calculate My Recommendation
                                </button>
                            </form>

                            {/* Calculated Output box */}
                            {advisorRecommendation && (
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 space-y-4 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-uptm-gold animate-ping"></span>
                                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Matched Pathway</span>
                                    </div>
                                    <h4 className="text-lg font-black text-uptm-navy-900">{advisorRecommendation.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">{advisorRecommendation.details}</p>
                                    <div className="flex gap-2 pt-2">
                                        <button 
                                            onClick={() => { setActiveTab('units'); setActiveUnit(advisorRecommendation.targetUnit); }}
                                            className="bg-uptm-crimson text-white text-xs font-bold px-4 py-2 rounded-xl transition-all hover:bg-red-700">
                                            Visit Matched Unit Hub
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 4. RESOURCES & CONTACT TAB */}
                {activeTab === 'resources' && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                        
                        {/* Downloads registry and Announcements section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Left Panel: Downloads */}
                            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                                <h3 className="text-xl font-bold text-uptm-navy-900 border-b border-slate-100 pb-4">
                                    <i className="fa-solid fa-file-pdf text-uptm-crimson mr-2"></i>
                                    Official Documentation & Handbooks
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <h5 className="font-bold text-xs text-slate-800">MQA APEL.A Guidelines (2026)</h5>
                                            <span className="text-[10px] text-slate-400 block mt-0.5">PDF | 2.4 MB</span>
                                        </div>
                                        <button className="bg-uptm-navy-900 hover:bg-uptm-gold text-white w-10 h-9 rounded-xl flex items-center justify-center transition-all"><i className="fa-solid fa-download"></i></button>
                                    </div>

                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <h5 className="font-bold text-xs text-slate-800">SULAM Course Development Guide</h5>
                                            <span className="text-[10px] text-slate-400 block mt-0.5">PDF | 1.8 MB</span>
                                        </div>
                                        <button className="bg-uptm-navy-900 hover:bg-uptm-gold text-white w-10 h-9 rounded-xl flex items-center justify-center transition-all"><i className="fa-solid fa-download"></i></button>
                                    </div>

                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <h5 className="font-bold text-xs text-slate-800">UPTM OBE Mapping Spreadsheet Template</h5>
                                            <span className="text-[10px] text-slate-400 block mt-0.5">XLSX | 1.1 MB</span>
                                        </div>
                                        <button className="bg-uptm-navy-900 hover:bg-uptm-gold text-white w-10 h-9 rounded-xl flex items-center justify-center transition-all"><i className="fa-solid fa-download"></i></button>
                                    </div>

                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <h5 className="font-bold text-xs text-slate-800">Micro-Credential Credit Stacking Flowcharts</h5>
                                            <span className="text-[10px] text-slate-400 block mt-0.5">PDF | 3.2 MB</span>
                                        </div>
                                        <button className="bg-uptm-navy-900 hover:bg-uptm-gold text-white w-10 h-9 rounded-xl flex items-center justify-center transition-all"><i className="fa-solid fa-download"></i></button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Announcement Feed */}
                            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                <h3 className="text-sm font-extrabold text-uptm-navy-900 uppercase tracking-wider border-b border-slate-100 pb-3">Department Circulars</h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-50 border-l-4 border-uptm-crimson rounded-r-xl space-y-1">
                                        <span className="text-[9px] font-bold text-slate-400">June 2026</span>
                                        <h5 className="font-extrabold text-xs text-slate-800">UPTM LMS System Upgrade</h5>
                                        <p className="text-[10px] text-slate-500">Virtual Campus servers will undergo continuous maintenance on June 15.</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border-l-4 border-uptm-gold rounded-r-xl space-y-1">
                                        <span className="text-[9px] font-bold text-slate-400">May 2026</span>
                                        <h5 className="font-extrabold text-xs text-slate-800">SULAM Funding Proposals Open</h5>
                                        <p className="text-[10px] text-slate-500">Student groups are invited to apply for community project grants of up to RM 2,000.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Dynamic FAQs Accordion */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                            <h3 className="text-xl font-bold text-uptm-navy-900 border-b border-slate-100 pb-4">Frequently Asked Questions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {faqItems.map((faq, idx) => (
                                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                                        <h4 className="font-extrabold text-xs text-slate-800 flex items-start gap-2">
                                            <span className="text-uptm-crimson"><i className="fa-solid fa-circle-question"></i></span>
                                            <span>{faq.q}</span>
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-relaxed pl-5">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Support & Feedback Form */}
                        <div className="bg-uptm-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-5 space-y-4">
                                    <span className="text-xs uppercase tracking-widest text-uptm-gold font-extrabold">Connect With AES</span>
                                    <h3 className="text-2xl font-extrabold">Send an Inquiry or Pedagogical Proposal</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Whether you are a student exploring alternative entry paths or an educator looking to craft interactive activity-based syllabus plans, our division heads are standing by.
                                    </p>
                                    <div className="space-y-2 text-xs pt-2">
                                        <p className="flex items-center gap-2 text-slate-300"><i className="fa-solid fa-envelope text-uptm-gold"></i> aes@uptm.edu.my</p>
                                        <p className="flex items-center gap-2 text-slate-300"><i className="fa-solid fa-phone text-uptm-gold"></i> +603-9281 9700 (AES Ext. 204)</p>
                                        <p className="flex items-center gap-2 text-slate-300"><i className="fa-solid fa-map-location-dot text-uptm-gold"></i> Level 4, Academic Block, UPTM Main Campus, Cheras, KL</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-7">
                                    <form onSubmit={handleFeedbackSubmit} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-400 font-bold uppercase">Your Full Name</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={feedbackData.name}
                                                    onChange={(e)=>setFeedbackData({...feedbackData, name: e.target.value})}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-uptm-gold focus:outline-none text-white" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-400 font-bold uppercase">Your Email Address</label>
                                                <input 
                                                    type="email" 
                                                    required 
                                                    value={feedbackData.email}
                                                    onChange={(e)=>setFeedbackData({...feedbackData, email: e.target.value})}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-uptm-gold focus:outline-none text-white" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-400 font-bold uppercase">Category</label>
                                                <select 
                                                    value={feedbackData.category}
                                                    onChange={(e)=>setFeedbackData({...feedbackData, category: e.target.value})}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-uptm-gold focus:outline-none text-white">
                                                    <option>General Inquiry</option>
                                                    <option>APEL Consultation</option>
                                                    <option>ODL Enrolment</option>
                                                    <option>OBE Taxonomy Review</option>
                                                    <option>Micro-Credential Exemption</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-slate-400 font-bold uppercase">Message / Proposal</label>
                                                <textarea 
                                                    required 
                                                    rows="1"
                                                    value={feedbackData.message}
                                                    onChange={(e)=>setFeedbackData({...feedbackData, message: e.target.value})}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-uptm-gold focus:outline-none text-white"></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full bg-uptm-gold hover:bg-amber-600 text-slate-900 font-bold text-xs py-2.5 rounded-xl transition-all">
                                            Submit Official Form
                                        </button>

                                        {feedbackSubmitted && (
                                            <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 rounded-xl text-center text-xs font-bold animate-pulse">
                                                Thank you! Your academic request has been cataloged. An advisor will contact you within 48 business hours.
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* 5. ABOUT US */}
                {activeTab === 'about' && (
                <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
                    {/* Header Layout */}
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-xs font-bold text-uptm-crimson uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">
                            Who We Are
                        </span>
                        <h2 className="text-3xl font-extrabold text-uptm-navy-900 tracking-tight sm:text-4xl">
                            Driving Academic Excellence & Innovation
                        </h2>
                        <p className="max-w-2xl mx-auto text-sm text-slate-500 leading-relaxed">
                            The Academic Excellence Sector (AES) acts as the pedagogical backbone of UPTM, harmonizing academic operations with flexible national accreditation blueprints.
                        </p>
                    </div>

                    {/* Vision & Mission Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-uptm-navy-50 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                            <div className="w-12 h-12 rounded-xl bg-uptm-navy-50 flex items-center justify-center text-uptm-navy-900 mb-6 text-xl">
                                <i className="fa-solid fa-eye"></i>
                            </div>
                            <h3 className="text-xl font-bold text-uptm-navy-900 mb-3">Our Strategic Vision</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{aboutData.vision}</p>
                        </div>

                        <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-uptm-crimson/5 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-uptm-crimson mb-6 text-xl">
                                <i className="fa-solid fa-bullseye"></i>
                            </div>
                            <h3 className="text-xl font-bold text-uptm-navy-900 mb-3">Our Mission Mandate</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{aboutData.mission}</p>
                        </div>
                    </div>

                    {/* Strategic Pillars Subsection */}
                    <div className="mb-16">
                        <h4 className="text-center font-extrabold text-slate-900 text-lg mb-8 tracking-tight">Our Operational Foundations</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {aboutData.strategicPillars.map((pillar, idx) => (
                                <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-6">
                                    <h5 className="font-bold text-uptm-navy-900 text-sm mb-2 flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-md bg-uptm-gold/10 text-uptm-gold text-xs flex items-center justify-center font-black">{idx + 1}</span>
                                        {pillar.title}
                                    </h5>
                                    <p className="text-slate-500 text-xs leading-relaxed">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    


                    {/* Structural Timeline Board */}
                    <div className="bg-uptm-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-uptm-crimson/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                        <h4 className="text-xl font-extrabold text-white mb-8 tracking-tight">Sector Milestones</h4>
                        <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-slate-700">
                            {aboutData.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex gap-6 relative items-start group">
                                    <div className="w-6 h-6 rounded-full bg-uptm-gold border-4 border-uptm-navy-900 shadow flex items-center justify-center z-10 transition-transform group-hover:scale-110" />
                                    <div className="space-y-1">
                                        <span className="text-xs font-black text-uptm-gold tracking-widest block">{milestone.year}</span>
                                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">{milestone.event}</p>
                                    </div>
                                </div>
                                                                
                            ))}
                        </div>
                    </div>

                    {/* LEADERSHIP & ORGANIZATIONAL MATRIX SUBSECTION */}
                    <div className="mt-20 border-t border-slate-200/80 pt-16">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                            <div className="h-1 w-16 bg-gradient-to-r from-uptm-crimson to-uptm-gold mx-auto rounded-full"></div>
                            <span className="text-xs uppercase tracking-widest font-extrabold text-uptm-crimson">Organizational Chart</span>
                            <h3 className="text-3xl font-black tracking-tight text-uptm-navy-900">
                                Academic Excellence Sector (AES)
                            </h3>
                            <p className="text-slate-500 text-sm max-w-xl mx-auto">
                                Meet the executive administrators directing the pedagogical frameworks, quality assurance parameters, and flexible pathways of Universiti Poly-Tech Malaysia.
                            </p>
                        </div>

                    {/* Tier 1 & 2: Executive Management Layer (Director & Secretary) */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20 max-w-4xl mx-auto">
                        
                        {/* Director Block */}
                        <div className="bg-white border-2 border-uptm-gold p-6 rounded-3xl shadow-xl w-full max-w-sm text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-uptm-gold/10 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-uptm-gold/5 to-transparent rounded-bl-full pointer-events-none" />
                            <div className="w-32 h-32 bg-slate-100 rounded-2xl mx-auto mb-5 overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center relative group-hover:border-uptm-gold transition-colors">
                                <img 
                                    src={directorPhoto}
                                    alt="Prof. Dr. Suhaily" 
                                    className="w-full h-full group-hover:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-uptm-navy-900/10 to-transparent"></div>
                            </div>
                            <h4 className="text-xl font-extrabold text-uptm-navy-900 tracking-tight">Prof. Dr. Suhaily</h4>
                            <p className="text-xs font-bold text-uptm-crimson uppercase tracking-widest mt-1">Director</p>
                            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-0 font-semibold">
                                Academic Excellence Sector (AES), UPTM
                            </div>
                        </div>

                        {/* Secretary Block */}
                        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md w-full max-w-xs text-center transform transition-all duration-300 hover:scale-[1.02] hover:border-uptm-navy-500/40 group relative overflow-hidden">
                            <div className="w-24 h-24 bg-slate-50 rounded-2xl mx-auto mb-4 overflow-hidden border border-slate-100 flex items-center justify-center shadow-inner relative group-hover:border-uptm-navy-500/30 transition-colors">
                                <img 
                                    src={secretaryPhoto}
                                    alt="Puan Ana Salwa Md Zain" 
                                    className="w-full h-full group-hover:grayscale-0 transition-all duration-300 scale-105 group-hover:scale-110"
                                />
                            </div>
                            <h5 className="text-base font-extrabold text-uptm-navy-900 tracking-tight">Puan Ana Salwa Md Zain</h5>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Secretary</p>
                            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-0 font-semibold">
                                Academic Excellence Sector (AES), UPTM
                            </div>
                        </div>

                    </div>

                    {/* Tier 3 Title: Unit Heads Section Header */}
                    <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                        <h3 className="text-xl font-extrabold tracking-tight uppercase text-uptm-crimson">Head of units (AES)</h3>
                        <div className="h-0.5 w-12 bg-slate-300 mx-auto rounded-full"></div>
                    </div>

                    {/* Tier 3: Unit Heads Responsive Centered Flex Layout */}
                    <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                        {[
                            { name: "Pn. Sharifah Nadia Binti Syed Khastudin", unit: "E-Learning Unit", color: "from-blue-600 to-indigo-700", img: elearningPhoto },
                            { name: "Pn. Noorsyalina Binti Nordin", unit: "Open Distance Learning Unit (ODL)", color: "from-purple-600 to-pink-700", img: odlPhoto },
                            { name: "Pn. Sherliaty Binti Saad", unit: "Community Relation Unit (SULAM)", color: "from-emerald-600 to-teal-700", img: sulamPhoto },
                            { name: "Pn. Nor Aziah Binti Sulaiman", unit: "Outcome-Based Education Unit (OBE)", color: "from-rose-600 to-orange-600", img: obePhoto },
                            { name: "Pn. Siti Fajar Binti Jalal", unit: "Accreditation of Prior Experiential Learning Unit (APEL)", color: "from-amber-600 to-red-700", img: apelPhoto },
                            { name: "Pn. Farhan Ahlaamie Binti Pakrudin", unit: "Activity-Based Learning Unit (ABL)", color: "from-cyan-600 to-blue-700", img: ablPhoto },
                            { name: "Pn. Jihadah Binti Ahmad", unit: "Micro-Credential Unit (MC)", color: "from-fuchsia-600 to-pink-700", img: mcPhoto },
                            
                        ].map((leader, i) => (
                            /* Added responsive width calculations to mimic grid spacing while keeping flex behavior */
                            <div 
                                key={i} 
                                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between items-center text-center group"
                            >
                                <div className="w-full flex flex-col items-center">
                                    {/* Decorative accent identifier tailored to each unit type */}
                                    <div className={`h-1.5 w-10 bg-gradient-to-r ${leader.color} mb-5 rounded-full`}></div>
                                    
                                    {/* Portrait Photo Container */}
                                    <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center group-hover:border-uptm-navy-500/30 shadow-inner transition-colors relative">
                                        <img 
                                            src={leader.img} 
                                            alt={leader.name} 
                                            className="w-full h-full group-hover:grayscale-0 transition-all duration-300 scale-105 group-hover:scale-110"
                                        />
                                    </div>
                                    
                                    <h4 className="text-sm font-extrabold text-uptm-navy-900 mt-4 leading-snug tracking-tight px-1 min-h-[40px] flex items-center justify-center">
                                        {leader.name}
                                    </h4>
                                </div>
                                
                                {/* Associated Department Label Anchor */}
                                <div className="mt-0.5 pt-2 border-t border-slate-50 w-full">
                                    <p className="text-xs font-semibold text-uptm-navy-800 group-hover:text-uptm-crimson transition-colors duration-200 leading-tight">
                                        {leader.unit}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                </div>
                                    
                )}

            </main>

            {/* DYNAMIC AES FLOATING SUPPORT BOX */}
            <div className="fixed bottom-6 right-6 z-50">
                {!chatOpen ? (
                    <button 
                        onClick={() => setChatOpen(true)}
                        className="bg-gradient-to-tr from-uptm-navy-900 to-uptm-crimson hover:to-uptm-gold text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all scale-100 hover:scale-105">
                        <i className="fa-solid fa-comments text-xl"></i>
                    </button>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl w-80 sm:w-96 shadow-2xl overflow-hidden flex flex-col h-[400px]">
                        <div className="bg-uptm-navy-900 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
                                <div>
                                    <h4 className="font-extrabold text-xs">AES Virtual Advisor</h4>
                                    <span className="text-[9px] text-slate-300">Typically replies instantly</span>
                                </div>
                            </div>
                            <button onClick={() => setChatOpen(false)} className="text-slate-300 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        
                        {/* Messages Container */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-uptm-crimson text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form Input */}
                        <form onSubmit={sendChatMessage} className="border-t border-slate-200 p-2 flex gap-2">
                            <input 
                                type="text" 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Ask about APEL, ODL, SULAM, OBE..." 
                                className="flex-grow bg-slate-100 rounded-xl px-3 text-xs focus:outline-none" />
                            <button type="submit" className="bg-uptm-navy-900 text-white w-9 h-9 rounded-xl flex items-center justify-center"><i className="fa-solid fa-paper-plane text-xs"></i></button>
                        </form>
                    </div>
                )}
            </div>

            {/* SYSTEM FOOTER */}
            <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-uptm-crimson rounded-lg flex items-center justify-center text-white font-extrabold">AES</div>
                            <h4 className="font-bold text-white tracking-wider">UPTM AES</h4>
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                            Universiti Poly-Tech Malaysia's Academic Excellence Sector (AES) promotes innovative curriculum alignments, credit exemptions, and high-fidelity student learning models.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-white tracking-wider">AES Operational Units</h4>
                        <ul className="space-y-1.5 text-slate-500">
                            <li>e-Learning Portal Support</li>
                            <li>ODL Degree Administration</li>
                            <li>SULAM Community Outreach</li>
                            <li>OBE Accreditation Audits</li>
                            <li>APEL Evaluation Pathways</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-white tracking-wider">Helpful Channels</h4>
                        <ul className="space-y-1.5 text-slate-500">
                            <li>Student Registration Handbook</li>
                            <li>Malaysian Qualifications Agency</li>
                            <li>LMS Lecturer Training Portal</li>
                            <li>Micro-Credential Credits Matrix</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-white tracking-wider">Accreditation Info</h4>
                        <p className="text-slate-500 leading-relaxed">
                            Approved under full Malaysian Qualifications Agency (MQA) directives. Supporting the national higher learning ecosystem.
                        </p>
                        <span className="text-[10px] text-uptm-gold font-bold tracking-widest uppercase block">ISO 9001:2015 Certified</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
                    <p>© 2026 Academic Excellence Sector (AES) Department, Universiti Poly-Tech Malaysia (UPTM). All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
                        <span>|</span>
                        <a href="#" className="hover:text-white transition-colors">Strategic Plan 2025-2030</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}