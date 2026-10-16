/**
 * MY CAMU - Centralized Sample Data Store
 * All data in this file represents high-fidelity simulated demonstration data.
 * It is clearly labeled as demonstration data and is initialized into localStorage.
 */

const CAMU_DEFAULT_DATA = {
  // Student Profile Data
  profile: {
    id: "21BCE1042",
    regNo: "717821L142",
    rollNo: "21CSE042",
    name: "Vignesh N",
    dob: "2004-01-24",
    gender: "Male",
    bloodGroup: "O+",
    personalEmail: "vignesh.tech2026@gmail.com",
    universityEmail: "vigneshwaran.r@students.camu.edu.in",
    phone: "+91 98452 71093",
    address: "42, Academic Boulevard, Green Valley Tech Campus, Coimbatore, Tamil Nadu, 641014",
    city: "Coimbatore",
    state: "Tamil Nadu",
    postalCode: "641014",
    emergencyContact: "R. Rajasekhar (Father) - +91 98452 71090",

    // Academic Info
    university: "Mohan Babu University",
    college: "School of Computing & Data Sciences",
    department: "Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science & Engineering (Specialization: AI & ML)",
    admissionYear: 2022,
    graduationYear: 2026,
    currentYear: "4th Year",
    currentSemester: "Semester 6",
    section: "CSE-A",
    batch: "2022 - 2026",
    academicAdvisor: "Dr. Sundaram Krishnamurthy, Ph.D. (sundaram.k@camu.edu.in)",
    academicStatus: "Active - Good Standing",
    currentSGPA: 9.12,
    overallCGPA: 8.94,
    totalCreditsEarned: 138,
    requiredCredits: 160,

    // Family Info
    fatherName: "Mr. R. Rajasekhar",
    fatherOccupation: "Chief Electrical Engineer",
    motherName: "Mrs. R. Lakshmi",
    motherOccupation: "Associate Professor in Mathematics",
    guardianContact: "+91 98452 71090",
    guardianEmail: "rajasekhar.r@gmail.com",
    permanentAddress: "42, Academic Boulevard, Green Valley Tech Campus, Coimbatore, Tamil Nadu, 641014",

    // Professional & Additional Info
    skills: ["Python", "JavaScript", "Machine Learning", "PyTorch", "React & Vanilla JS", "SQL & MongoDB", "Docker & Kubernetes", "REST APIs", "Git & CI/CD", "Data Structures & Algorithms"],
    languages: ["English (Professional)", "Tamil (Native)", "Hindi (Working Proficiency)", "German (Elementary A1)"],
    careerInterests: ["AI/ML Research Engineer", "Full Stack Developer", "Data Platform Architect", "Cloud Solutions"],
    resumeName: "Vigneshwaran_Resume_2026.pdf",
    resumeLastUpdated: "12 Oct 2026",
    linkedIn: "https://linkedin.com/in/vigneshwaran-camu-demo",
    github: "https://github.com/vigneshwaran-camu-demo",
    portfolio: "https://vignesh-ai-portfolio.dev",
    photo: "assets/images/student-avatar.svg"
  },

  // Attendance Data
  attendance: {
    overallPercentage: 88.41,
    totalConducted: 328,
    totalAttended: 290,
    totalMissed: 38,
    totalRemaining: 72,
    minRequiredPercentage: 75.0,
    eligibilityStatus: "Eligible for Examinations",
    monthlyTrends: [
      { month: "July 2026", conducted: 68, attended: 62, missed: 6, percentage: 91.18 },
      { month: "August 2026", conducted: 84, attended: 74, missed: 10, percentage: 88.10 },
      { month: "September 2026", conducted: 92, attended: 81, missed: 11, percentage: 88.04 },
      { month: "October 2026 (Till Date)", conducted: 84, attended: 73, missed: 11, percentage: 86.90 }
    ],
    subjects: [
      {
        code: "CS601",
        title: "Deep Learning & Neural Networks",
        faculty: "Dr. K. S. Ramanathan",
        conducted: 56,
        attended: 52,
        missed: 4,
        remaining: 12,
        percentage: 92.86,
        theory: { conducted: 40, attended: 38 },
        lab: { conducted: 16, attended: 14 },
        status: "Safe"
      },
      {
        code: "CS602",
        title: "Cloud Computing & DevOps Architecture",
        faculty: "Prof. Ananya Sen",
        conducted: 50,
        attended: 44,
        missed: 6,
        remaining: 10,
        percentage: 88.00,
        theory: { conducted: 36, attended: 32 },
        lab: { conducted: 14, attended: 12 },
        status: "Safe"
      },
      {
        code: "CS603",
        title: "Natural Language Processing",
        faculty: "Dr. Arvind Swaminathan",
        conducted: 48,
        attended: 43,
        missed: 5,
        remaining: 12,
        percentage: 89.58,
        theory: { conducted: 36, attended: 33 },
        lab: { conducted: 12, attended: 10 },
        status: "Safe"
      },
      {
        code: "CS604",
        title: "Big Data Analytics & Spark",
        faculty: "Dr. Meenakshi Sundaram",
        conducted: 52,
        attended: 46,
        missed: 6,
        remaining: 12,
        percentage: 88.46,
        theory: { conducted: 38, attended: 34 },
        lab: { conducted: 14, attended: 12 },
        status: "Safe"
      },
      {
        code: "CS605",
        title: "Cyber Security & Cryptography",
        faculty: "Prof. Rajesh Kumar Verma",
        conducted: 44,
        attended: 36,
        missed: 8,
        remaining: 10,
        percentage: 81.82,
        theory: { conducted: 32, attended: 26 },
        lab: { conducted: 12, attended: 10 },
        status: "Safe"
      },
      {
        code: "CS606",
        title: "Modern Web Technologies & Microservices",
        faculty: "Dr. Priya Nandakumar",
        conducted: 48,
        attended: 41,
        missed: 7,
        remaining: 10,
        percentage: 85.42,
        theory: { conducted: 30, attended: 25 },
        lab: { conducted: 18, attended: 16 },
        status: "Safe"
      },
      {
        code: "CS607",
        title: "Capstone Design Project - Phase 1",
        faculty: "Dr. Sundaram Krishnamurthy",
        conducted: 30,
        attended: 28,
        missed: 2,
        remaining: 6,
        percentage: 93.33,
        theory: { conducted: 0, attended: 0 },
        lab: { conducted: 30, attended: 28 },
        status: "Safe"
      }
    ],
    recentLogs: [
      { date: "2026-10-15", day: "Thursday", period: "Period 1 (08:30 - 09:30)", code: "CS601", subject: "Deep Learning & Neural Networks", status: "Present", room: "Hall C-302" },
      { date: "2026-10-15", day: "Thursday", period: "Period 2 (09:30 - 10:30)", code: "CS603", subject: "Natural Language Processing", status: "Present", room: "Hall C-302" },
      { date: "2026-10-15", day: "Thursday", period: "Period 3 (10:45 - 11:45)", code: "CS602", subject: "Cloud Computing & DevOps", status: "Late", room: "Cloud Lab 2" },
      { date: "2026-10-15", day: "Thursday", period: "Period 4 (11:45 - 12:45)", code: "CS604", subject: "Big Data Analytics", status: "Present", room: "Data Center Lab" },
      { date: "2026-10-14", day: "Wednesday", period: "Period 1 (08:30 - 09:30)", code: "CS605", subject: "Cyber Security & Cryptography", status: "Present", room: "Hall C-204" },
      { date: "2026-10-14", day: "Wednesday", period: "Period 2 (09:30 - 10:30)", code: "CS606", subject: "Modern Web Technologies", status: "Present", room: "Web Lab 1" },
      { date: "2026-10-14", day: "Wednesday", period: "Period 5-6 (01:45 - 03:45)", code: "CS601", subject: "Deep Learning Lab", status: "Present", room: "AI GPU Cluster Lab" },
      { date: "2026-10-13", day: "Tuesday", period: "Period 3 (10:45 - 11:45)", code: "CS602", subject: "Cloud Computing & DevOps", status: "Absent", room: "Cloud Lab 2" },
      { date: "2026-10-13", day: "Tuesday", period: "Period 4 (11:45 - 12:45)", code: "CS604", subject: "Big Data Analytics", status: "Absent", room: "Data Center Lab" },
      { date: "2026-10-12", day: "Monday", period: "Period 1 (08:30 - 09:30)", code: "CS601", subject: "Deep Learning & Neural Networks", status: "Present", room: "Hall C-302" }
    ]
  },

  // Courses & LMS
  courses: [
    {
      code: "CS601",
      title: "Deep Learning & Neural Networks",
      faculty: "Dr. K. S. Ramanathan",
      facultyEmail: "ramanathan.ks@camu.edu.in",
      facultyAvatar: "assets/images/faculty1.svg",
      credits: 4,
      semester: "Semester 6",
      type: "Program Core",
      room: "Hall C-302 / AI Cluster Lab",
      syllabusCompletion: 78,
      courseProgress: 82,
      category: "core",
      description: "Foundational and advanced deep neural architectures including CNNs, RNNs, Attention mechanisms, Transformers, GANs, and generative AI models with hands-on PyTorch training.",
      modulesCount: 5,
      studyMaterialsCount: 18,
      assignmentsCount: 4,
      quizzesCount: 3,
      overview: "Deep learning has revolutionized artificial intelligence across computer vision, NLP, and multimodal domains. This course bridges theoretical optimization concepts with industry-scale PyTorch workflows.",
      syllabus: [
        { unit: "Unit 1", title: "Mathematical Foundations & Perceptrons", status: "Completed", topics: ["Vector Calculus & Linear Algebra", "Multilayer Perceptron Architecture", "Backpropagation Algorithm", "Activation Functions & Vanishing Gradients"] },
        { unit: "Unit 2", title: "Deep Convolutional Networks", status: "Completed", topics: ["Convolutions & Pooling operations", "AlexNet, VGG, ResNet architectures", "Transfer Learning & Fine-tuning", "Object Detection & Segmentation (YOLO, Mask R-CNN)"] },
        { unit: "Unit 3", title: "Sequence Modeling & Recurrent Networks", status: "Completed", topics: ["Recurrent Neural Networks (RNN)", "LSTM and GRU Cell architectures", "Sequence-to-Sequence Modeling", "Bidirectional RNNs"] },
        { unit: "Unit 4", title: "Self-Attention & Transformers", status: "In Progress", topics: ["Scaled Dot-Product Attention", "Multi-Head Attention", "Vision Transformers (ViT)", "BERT, GPT & LLM foundational concepts"] },
        { unit: "Unit 5", title: "Generative Models & Deployment", status: "Upcoming", topics: ["Autoencoders & Variational Autoencoders (VAEs)", "Generative Adversarial Networks (GANs)", "Diffusion Models overview", "ONNX and TensorRT Model Serving"] }
      ]
    },
    {
      code: "CS602",
      title: "Cloud Computing & DevOps Architecture",
      faculty: "Prof. Ananya Sen",
      facultyEmail: "ananya.sen@camu.edu.in",
      facultyAvatar: "assets/images/faculty2.svg",
      credits: 4,
      semester: "Semester 6",
      type: "Program Core",
      room: "Cloud Lab 2",
      syllabusCompletion: 72,
      courseProgress: 75,
      category: "core",
      description: "Principles of distributed cloud architectures (AWS/GCP/Azure), Docker containerization, Kubernetes orchestration, Infrastructure as Code using Terraform, and CI/CD automation pipelines.",
      modulesCount: 5,
      studyMaterialsCount: 14,
      assignmentsCount: 3,
      quizzesCount: 2,
      overview: "Teaches modern cloud infrastructure design, 12-factor application architecture, GitOps practices, and automated deployment pipelines for enterprise reliability.",
      syllabus: [
        { unit: "Unit 1", title: "Cloud Principles & Virtualization", status: "Completed", topics: ["Cloud Service Models (IaaS, PaaS, SaaS)", "Hypervisors and Hardware Virtualization", "AWS Core Services (EC2, S3, VPC)", "IAM and Security Groups"] },
        { unit: "Unit 2", title: "Containerization with Docker", status: "Completed", topics: ["Docker Architecture & Image Layers", "Dockerfiles and Multi-stage Builds", "Container Networking & Storage Volumes", "Docker Compose for Multi-Service Apps"] },
        { unit: "Unit 3", title: "Kubernetes Orchestration", status: "In Progress", topics: ["Pods, ReplicaSets, Deployments", "Cluster Services & Ingress Controllers", "ConfigMaps, Secrets, Persistent Volumes", "Helm Charts and Package Management"] },
        { unit: "Unit 4", title: "CI/CD & DevOps Automation", status: "Upcoming", topics: ["GitHub Actions & GitLab CI", "Automated Testing & Build Pipelines", "Canary & Blue-Green Deployments", "ArgoCD and GitOps"] },
        { unit: "Unit 5", title: "Cloud Monitoring & Serverless", status: "Upcoming", topics: ["Prometheus & Grafana Observability", "AWS Lambda & Cloud Functions", "Serverless Framework", "Site Reliability Engineering (SRE) Principles"] }
      ]
    },
    {
      code: "CS603",
      title: "Natural Language Processing",
      faculty: "Dr. Arvind Swaminathan",
      facultyEmail: "arvind.s@camu.edu.in",
      facultyAvatar: "assets/images/faculty3.svg",
      credits: 4,
      semester: "Semester 6",
      type: "Professional Elective",
      room: "Hall C-302",
      syllabusCompletion: 80,
      courseProgress: 85,
      category: "elective",
      description: "Text processing, tokenization, word embeddings (Word2Vec, GloVe), Language modeling, Transformer-based fine-tuning, Sentiment analysis, and Retrieval-Augmented Generation (RAG).",
      modulesCount: 5,
      studyMaterialsCount: 16,
      assignmentsCount: 3,
      quizzesCount: 3,
      overview: "Provides in-depth expertise in processing natural language text and speech, moving from classical linguistic pipelines to modern state-of-the-art Large Language Models.",
      syllabus: [
        { unit: "Unit 1", title: "Linguistic Basics & Tokenization", status: "Completed", topics: ["Corpus Linguistics, N-grams", "Stemming, Lemmatization, POS Tagging", "Byte-Pair Encoding & SentencePiece", "Vector Space Models & TF-IDF"] },
        { unit: "Unit 2", title: "Distributed Word Representations", status: "Completed", topics: ["Word2Vec Skip-gram & CBOW", "GloVe Embeddings", "FastText Subword Representations", "Evaluation of Semantic Similarities"] },
        { unit: "Unit 3", title: "Neural Sequence Models for NLP", status: "Completed", topics: ["RNNs for Named Entity Recognition", "Seq2Seq Machine Translation", "Attention Mechanism in Translation", "BLEU & ROUGE Evaluation Metrics"] },
        { unit: "Unit 4", title: "Transformers & Pretrained LLMs", status: "In Progress", topics: ["BERT Encoder Architecture", "GPT Autoregressive Generation", "Hugging Face Transformers Pipeline", "Fine-Tuning on Custom Datasets"] },
        { unit: "Unit 5", title: "Applied NLP & Modern RAG", status: "Upcoming", topics: ["Vector Databases (Chroma, Pinecone)", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering & Guardrails", "Conversational AI Agents"] }
      ]
    },
    {
      code: "CS604",
      title: "Big Data Analytics & Spark",
      faculty: "Dr. Meenakshi Sundaram",
      facultyEmail: "meenakshi.s@camu.edu.in",
      facultyAvatar: "assets/images/faculty4.svg",
      credits: 3,
      semester: "Semester 6",
      type: "Program Core",
      room: "Data Center Lab",
      syllabusCompletion: 70,
      courseProgress: 72,
      category: "core",
      description: "Distributed storage and computing frameworks including Hadoop HDFS, Apache Spark Core, Spark SQL, Streaming, and big data pipeline engineering.",
      modulesCount: 5,
      studyMaterialsCount: 12,
      assignmentsCount: 3,
      quizzesCount: 2,
      overview: "Explores scalable data architectures for processing petabyte-scale structured and unstructured data streams with sub-second latency.",
      syllabus: [
        { unit: "Unit 1", title: "Big Data Fundamentals & Hadoop", status: "Completed", topics: ["4 V's of Big Data", "HDFS Architecture & Fault Tolerance", "MapReduce Programming Paradigm", "YARN Resource Negotiator"] },
        { unit: "Unit 2", title: "Apache Spark Framework", status: "Completed", topics: ["Resilient Distributed Datasets (RDDs)", "Transformations & Actions", "Spark Execution Engine & DAG", "In-Memory Caching Strategies"] },
        { unit: "Unit 3", title: "Spark SQL & DataFrames", status: "In Progress", topics: ["DataFrames vs Datasets API", "Catalyst Optimizer & Tungsten Engine", "Interfacing with Parquet & Avro Formats", "Distributed SQL Queries"] },
        { unit: "Unit 4", title: "Real-time Stream Processing", status: "Upcoming", topics: ["Apache Kafka Fundamentals", "Spark Structured Streaming", "Window Operations & Watermarking", "Event-time Processing"] },
        { unit: "Unit 5", title: "Graph & Machine Learning at Scale", status: "Upcoming", topics: ["Spark MLlib Pipeline API", "Collaborative Filtering at Scale", "GraphX Analytics", "Cluster Deployment on AWS EMR"] }
      ]
    },
    {
      code: "CS605",
      title: "Cyber Security & Cryptography",
      faculty: "Prof. Rajesh Kumar Verma",
      facultyEmail: "rajesh.v@camu.edu.in",
      facultyAvatar: "assets/images/faculty5.svg",
      credits: 3,
      semester: "Semester 6",
      type: "Program Core",
      room: "Hall C-204",
      syllabusCompletion: 68,
      courseProgress: 70,
      category: "core",
      description: "Symmetric and asymmetric encryption, hashing, digital signatures, public key infrastructure, network vulnerabilities, OWASP Top 10 web security, and ethical hacking.",
      modulesCount: 5,
      studyMaterialsCount: 11,
      assignmentsCount: 2,
      quizzesCount: 2,
      overview: "Core principles of defensive and offensive cyber security, cryptanalysis, zero-trust network architectures, and modern web vulnerability mitigation.",
      syllabus: [
        { unit: "Unit 1", title: "Classical & Symmetric Cryptography", status: "Completed", topics: ["Security Goals (CIA Triad)", "Substitution & Transposition Ciphers", "DES & Advanced Encryption Standard (AES)", "Block Cipher Modes (CBC, GCM)"] },
        { unit: "Unit 2", title: "Asymmetric Cryptography & PKI", status: "Completed", topics: ["Number Theory & Modular Arithmetic", "RSA Encryption & Decryption", "Diffie-Hellman Key Exchange", "Digital Signatures & X.509 Certificates"] },
        { unit: "Unit 3", title: "Integrity, Hashing & Authentication", status: "In Progress", topics: ["Cryptographic Hash Functions (SHA-256)", "Message Authentication Codes (HMAC)", "Multi-Factor Authentication (MFA)", "OAuth 2.0 & OpenID Connect"] },
        { unit: "Unit 4", title: "Network & Web Application Security", status: "Upcoming", topics: ["Firewalls, IDS/IPS & DMZ", "TLS/SSL Handshake Protocol", "OWASP Top 10 Vulnerabilities", "Cross-Site Scripting (XSS) & SQL Injection"] },
        { unit: "Unit 5", title: "Incident Response & Modern Defense", status: "Upcoming", topics: ["Zero Trust Security Architecture", "Endpoint Detection & SIEM tools", "Ethical Hacking Methodologies", "Cyber Laws & Compliance Standards"] }
      ]
    },
    {
      code: "CS606",
      title: "Modern Web Technologies & Microservices",
      faculty: "Dr. Priya Nandakumar",
      facultyEmail: "priya.n@camu.edu.in",
      facultyAvatar: "assets/images/faculty6.svg",
      credits: 3,
      semester: "Semester 6",
      type: "Program Elective",
      room: "Web Lab 1",
      syllabusCompletion: 82,
      courseProgress: 88,
      category: "elective",
      description: "Progressive web apps, responsive frontend architectures, microservices patterns, API gateways, WebSockets for real-time collaboration, and performance optimization.",
      modulesCount: 5,
      studyMaterialsCount: 15,
      assignmentsCount: 3,
      quizzesCount: 2,
      overview: "Comprehensive deep-dive into building scalable, high-performance web systems using vanilla standards and modern microservice communication protocols.",
      syllabus: [
        { unit: "Unit 1", title: "Advanced DOM & Reactive JavaScript", status: "Completed", topics: ["ES6+ Deep Dive & Event Loop", "Custom Web Components & Shadow DOM", "Asynchronous JS, Promises & Async/Await", "Local State & Storage Mechanisms"] },
        { unit: "Unit 2", title: "Modern CSS & Responsive Systems", status: "Completed", topics: ["CSS Grid & Flexbox Masterclass", "CSS Custom Properties & Dark Mode Engines", "Responsive Micro-interactions & Keyframes", "Accessibility (WCAG 2.1) Compliance"] },
        { unit: "Unit 3", title: "Microservices & API Architecture", status: "Completed", topics: ["Monolith vs Microservices Trade-offs", "RESTful API Standards & OpenAPI/Swagger", "API Gateways & Reverse Proxies", "Rate Limiting & Circuit Breakers"] },
        { unit: "Unit 4", title: "Real-time Protocols & WebSockets", status: "In Progress", topics: ["HTTP/2 and HTTP/3 QUIC Protocol", "Full-Duplex WebSockets Communication", "Server-Sent Events (SSE)", "Message Brokers with RabbitMQ"] },
        { unit: "Unit 5", title: "Web Performance & Security", status: "Upcoming", topics: ["Core Web Vitals & Lighthouse Optimization", "Service Workers & Progressive Web Apps", "Content Security Policy (CSP)", "CORS & Secure Headers Management"] }
      ]
    },
    {
      code: "CS607",
      title: "Capstone Design Project - Phase 1",
      faculty: "Dr. Sundaram Krishnamurthy",
      facultyEmail: "sundaram.k@camu.edu.in",
      facultyAvatar: "assets/images/faculty1.svg",
      credits: 3,
      semester: "Semester 6",
      type: "Core Practical",
      room: "Project Research Lab",
      syllabusCompletion: 65,
      courseProgress: 65,
      category: "core",
      description: "Formulation of research problem, literature survey, system design architecture, initial prototyping, and milestone presentation to academic committee.",
      modulesCount: 3,
      studyMaterialsCount: 8,
      assignmentsCount: 2,
      quizzesCount: 0,
      overview: "Team-based industry capstone solving real-world challenges through rigorous engineering design, sprint cycles, and peer-reviewed code reviews.",
      syllabus: [
        { unit: "Milestone 1", title: "Problem Definition & Literature Survey", status: "Completed", topics: ["Identifying Industry Problem Statement", "Systematic Review of 15+ IEEE Papers", "Feasibility & Tech Stack Selection", "SRS Document Generation"] },
        { unit: "Milestone 2", title: "System Architecture & Data Modeling", status: "Completed", topics: ["UML Class & Sequence Diagrams", "Database Schema & API Specifications", "Low-fidelity Wireframes & User Flows", "Cloud Infrastructure Provisioning"] },
        { unit: "Milestone 3", title: "Proof-of-Concept & Midterm Evaluation", status: "In Progress", topics: ["Core ML Pipeline Prototyping", "Backend Microservice Integration", "Intermediate Committee Defense", "Sprint 1 & 2 Retrospectives"] }
      ]
    }
  ],

  // Weekly Timetable
  timetable: {
    periods: [
      { id: 1, time: "08:30 - 09:30", label: "Period 1" },
      { id: 2, time: "09:30 - 10:30", label: "Period 2" },
      { id: "break1", time: "10:30 - 10:45", label: "Morning Break", isBreak: true },
      { id: 3, time: "10:45 - 11:45", label: "Period 3" },
      { id: 4, time: "11:45 - 12:45", label: "Period 4" },
      { id: "lunch", time: "12:45 - 01:45", label: "Lunch Break", isBreak: true },
      { id: 5, time: "01:45 - 02:45", label: "Period 5" },
      { id: 6, time: "02:45 - 03:45", label: "Period 6" },
      { id: 7, time: "03:45 - 04:30", label: "Period 7" }
    ],
    schedule: {
      Monday: [
        { period: 1, code: "CS601", title: "Deep Learning & Neural Networks", faculty: "Dr. K. S. Ramanathan", room: "Hall C-302", type: "theory" },
        { period: 2, code: "CS602", title: "Cloud Computing & DevOps", faculty: "Prof. Ananya Sen", room: "Hall C-302", type: "theory" },
        { period: 3, code: "CS603", title: "Natural Language Processing", faculty: "Dr. Arvind Swaminathan", room: "Hall C-302", type: "theory" },
        { period: 4, code: "CS604", title: "Big Data Analytics", faculty: "Dr. Meenakshi Sundaram", room: "Data Center Lab", type: "theory" },
        { period: 5, code: "CS606", title: "Modern Web Tech Lab", faculty: "Dr. Priya Nandakumar", room: "Web Lab 1", type: "lab", span: 2 },
        { period: 6, code: "CS606", title: "Modern Web Tech Lab (Contd.)", faculty: "Dr. Priya Nandakumar", room: "Web Lab 1", type: "lab" },
        { period: 7, code: "LIB", title: "Library / Research Consultation", faculty: "Librarian", room: "Central Library", type: "activity" }
      ],
      Tuesday: [
        { period: 1, code: "CS605", title: "Cyber Security & Cryptography", faculty: "Prof. Rajesh Kumar Verma", room: "Hall C-204", type: "theory" },
        { period: 2, code: "CS606", title: "Modern Web Technologies", faculty: "Dr. Priya Nandakumar", room: "Hall C-204", type: "theory" },
        { period: 3, code: "CS601", title: "Deep Learning & Neural Networks", faculty: "Dr. K. S. Ramanathan", room: "Hall C-302", type: "theory" },
        { period: 4, code: "CS603", title: "Natural Language Processing", faculty: "Dr. Arvind Swaminathan", room: "Hall C-302", type: "theory" },
        { period: 5, code: "CS601", title: "Deep Learning Lab (GPU)", faculty: "Dr. K. S. Ramanathan", room: "AI GPU Cluster Lab", type: "lab", span: 2 },
        { period: 6, code: "CS601", title: "Deep Learning Lab (GPU)", faculty: "Dr. K. S. Ramanathan", room: "AI GPU Cluster Lab", type: "lab" },
        { period: 7, code: "MENTOR", title: "Academic Mentoring Session", faculty: "Dr. Sundaram Krishnamurthy", room: "Faculty Room 14", type: "activity" }
      ],
      Wednesday: [
        { period: 1, code: "CS604", title: "Big Data Analytics", faculty: "Dr. Meenakshi Sundaram", room: "Data Center Lab", type: "theory" },
        { period: 2, code: "CS605", title: "Cyber Security & Cryptography", faculty: "Prof. Rajesh Kumar Verma", room: "Hall C-204", type: "theory" },
        { period: 3, code: "CS602", title: "Cloud Computing & DevOps", faculty: "Prof. Ananya Sen", room: "Cloud Lab 2", type: "theory" },
        { period: 4, code: "CS601", title: "Deep Learning & Neural Networks", faculty: "Dr. K. S. Ramanathan", room: "Hall C-302", type: "theory" },
        { period: 5, code: "CS602", title: "Cloud & DevOps Lab", faculty: "Prof. Ananya Sen", room: "Cloud Lab 2", type: "lab", span: 2 },
        { period: 6, code: "CS602", title: "Cloud & DevOps Lab (Contd.)", faculty: "Prof. Ananya Sen", room: "Cloud Lab 2", type: "lab" },
        { period: 7, code: "SPORTS", title: "Sports & Physical Wellness", faculty: "Physical Director", room: "Campus Arena", type: "activity" }
      ],
      Thursday: [
        { period: 1, code: "CS603", title: "Natural Language Processing", faculty: "Dr. Arvind Swaminathan", room: "Hall C-302", type: "theory" },
        { period: 2, code: "CS601", title: "Deep Learning & Neural Networks", faculty: "Dr. K. S. Ramanathan", room: "Hall C-302", type: "theory" },
        { period: 3, code: "CS606", title: "Modern Web Technologies", faculty: "Dr. Priya Nandakumar", room: "Hall C-204", type: "theory" },
        { period: 4, code: "CS605", title: "Cyber Security & Cryptography", faculty: "Prof. Rajesh Kumar Verma", room: "Hall C-204", type: "theory" },
        { period: 5, code: "CS607", title: "Capstone Project Review", faculty: "Dr. Sundaram Krishnamurthy", room: "Project Lab", type: "lab", span: 2 },
        { period: 6, code: "CS607", title: "Capstone Project Review (Contd.)", faculty: "Dr. Sundaram Krishnamurthy", room: "Project Lab", type: "lab" },
        { period: 7, code: "SEMINAR", title: "Industry Tech Talk / Webinar", faculty: "Invited Speaker", room: "Auditorium 2", type: "activity" }
      ],
      Friday: [
        { period: 1, code: "CS602", title: "Cloud Computing & DevOps", faculty: "Prof. Ananya Sen", room: "Cloud Lab 2", type: "theory" },
        { period: 2, code: "CS604", title: "Big Data Analytics", faculty: "Dr. Meenakshi Sundaram", room: "Data Center Lab", type: "theory" },
        { period: 3, code: "CS605", title: "Cyber Security & Cryptography", faculty: "Prof. Rajesh Kumar Verma", room: "Hall C-204", type: "theory" },
        { period: 4, code: "CS603", title: "Natural Language Processing", faculty: "Dr. Arvind Swaminathan", room: "Hall C-302", type: "theory" },
        { period: 5, code: "CS604", title: "Big Data Lab (Spark)", faculty: "Dr. Meenakshi Sundaram", room: "Data Center Lab", type: "lab", span: 2 },
        { period: 6, code: "CS604", title: "Big Data Lab (Spark)", faculty: "Dr. Meenakshi Sundaram", room: "Data Center Lab", type: "lab" },
        { period: 7, code: "CLUB", title: "AI & Innovation Club Meeting", faculty: "Club Leads", room: "Student Hub 3", type: "activity" }
      ],
      Saturday: [
        { period: 1, code: "CS607", title: "Capstone Project Phase 1", faculty: "Dr. Sundaram Krishnamurthy", room: "Project Lab", type: "lab" },
        { period: 2, code: "CS607", title: "Capstone Project Phase 1", faculty: "Dr. Sundaram Krishnamurthy", room: "Project Lab", type: "lab" },
        { period: 3, code: "TUTORIAL", title: "Remedial & GATE Prep Class", faculty: "Faculty Panel", room: "Hall C-302", type: "theory" },
        { period: 4, code: "CAREER", title: "Placement Aptitude & Mock Test", faculty: "Career Center", room: "Online Lab", type: "activity" },
        { period: 5, code: "FREE", title: "Self Study / Library Access", faculty: "--", room: "Central Library", type: "activity" },
        { period: 6, code: "FREE", title: "Self Study / Project Work", faculty: "--", room: "Incubation Center", type: "activity" },
        { period: 7, code: "FREE", title: "Dispersal", faculty: "--", room: "--", type: "activity" }
      ]
    }
  },

  // Academic Results & Grades
  results: {
    cgpa: 8.94,
    totalCredits: 138,
    activeBacklogs: 0,
    historicalSGPA: [
      { semester: "Semester 1", sgpa: 8.70, credits: 23, year: "2022-23", status: "Passed" },
      { semester: "Semester 2", sgpa: 8.85, credits: 24, year: "2022-23", status: "Passed" },
      { semester: "Semester 3", sgpa: 8.92, credits: 24, year: "2023-24", status: "Passed" },
      { semester: "Semester 4", sgpa: 9.04, credits: 23, year: "2023-24", status: "Passed" },
      { semester: "Semester 5", sgpa: 9.08, credits: 24, year: "2024-25", status: "Passed" },
      { semester: "Semester 6 (Projected)", sgpa: 9.12, credits: 20, year: "2025-26", status: "Ongoing" }
    ],
    currentSemesterSubjects: [
      { code: "CS601", title: "Deep Learning & Neural Networks", credits: 4, internal: 38, external: 55, total: 93, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS602", title: "Cloud Computing & DevOps Architecture", credits: 4, internal: 36, external: 51, total: 87, grade: "A+", gradePoint: 9, result: "Pass" },
      { code: "CS603", title: "Natural Language Processing", credits: 4, internal: 37, external: 54, total: 91, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS604", title: "Big Data Analytics & Spark", credits: 3, internal: 35, external: 50, total: 85, grade: "A+", gradePoint: 9, result: "Pass" },
      { code: "CS605", title: "Cyber Security & Cryptography", credits: 3, internal: 34, external: 48, total: 82, grade: "A", gradePoint: 8, result: "Pass" },
      { code: "CS606", title: "Modern Web Technologies & Microservices", credits: 3, internal: 38, external: 53, total: 91, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS607", title: "Capstone Design Project - Phase 1", credits: 3, internal: 39, external: 56, total: 95, grade: "O", gradePoint: 10, result: "Pass" }
    ],
    sem5Subjects: [
      { code: "CS501", title: "Design & Analysis of Algorithms", credits: 4, internal: 37, external: 54, total: 91, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS502", title: "Artificial Intelligence & Expert Systems", credits: 4, internal: 38, external: 52, total: 90, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS503", title: "Compiler Design", credits: 3, internal: 35, external: 49, total: 84, grade: "A+", gradePoint: 9, result: "Pass" },
      { code: "CS504", title: "Database Engineering & Optimization", credits: 4, internal: 38, external: 55, total: 93, grade: "O", gradePoint: 10, result: "Pass" },
      { code: "CS505", title: "Computer Networks & Sockets", credits: 3, internal: 36, external: 48, total: 84, grade: "A+", gradePoint: 9, result: "Pass" },
      { code: "CS506", title: "Algorithms Lab", credits: 2, internal: 39, external: 57, total: 96, grade: "O", gradePoint: 10, result: "Pass" }
    ]
  },

  // Examinations
  examinations: {
    registrationStatus: "Registered & Verified",
    hallTicketStatus: "Available for Download",
    hallTicketNo: "HT-2026-6-21BCE1042",
    seatNo: "SEC-A-042",
    examCenter: "Main Examination Block - Zone B (Floor 3)",
    upcomingSchedule: [
      { date: "2026-11-10", day: "Tuesday", time: "09:30 AM - 12:30 PM", code: "CS601", title: "Deep Learning & Neural Networks", hall: "Exam Hall B-301", seat: "B-42" },
      { date: "2026-11-13", day: "Friday", time: "09:30 AM - 12:30 PM", code: "CS602", title: "Cloud Computing & DevOps", hall: "Exam Hall B-301", seat: "B-42" },
      { date: "2026-11-17", day: "Tuesday", time: "09:30 AM - 12:30 PM", code: "CS603", title: "Natural Language Processing", hall: "Exam Hall B-302", seat: "B-42" },
      { date: "2026-11-20", day: "Friday", time: "09:30 AM - 12:30 PM", code: "CS604", title: "Big Data Analytics & Spark", hall: "Exam Hall B-302", seat: "B-42" },
      { date: "2026-11-24", day: "Tuesday", time: "09:30 AM - 12:30 PM", code: "CS605", title: "Cyber Security & Cryptography", hall: "Exam Hall B-303", seat: "B-42" },
      { date: "2026-11-27", day: "Friday", time: "09:30 AM - 12:30 PM", code: "CS606", title: "Modern Web Technologies", hall: "Exam Hall B-303", seat: "B-42" }
    ],
    internalAssessments: [
      { test: "Continuous Internal Assessment 1 (CIA-1)", date: "Aug 2026", maxMarks: 50, marksObtained: 46.5, percentage: 93.0, status: "Evaluated" },
      { test: "Continuous Internal Assessment 2 (CIA-2)", date: "Sep 2026", maxMarks: 50, marksObtained: 45.0, percentage: 90.0, status: "Evaluated" },
      { test: "Model Practical Examination", date: "Oct 2026", maxMarks: 100, marksObtained: 94.0, percentage: 94.0, status: "Evaluated" }
    ],
    instructions: [
      "Carry your printed Digital Hall Ticket and original University Student ID Card to every session.",
      "Reporting time is strictly 30 minutes prior to exam commencement. Entry closes 10 minutes before the bell.",
      "Mobile phones, smartwatches, programmable calculators, and unauthorized printed sheets are strictly prohibited inside the hall.",
      "Ensure barcode on the answer booklet is not damaged or written over.",
      "Hall ticket QR code will be scanned at the security checkpoint upon entry."
    ]
  },

  // Study Materials
  studyMaterials: [
    {
      id: "mat-1",
      title: "Deep Learning Unit 1 & 2 Lecture Slide Deck",
      courseCode: "CS601",
      courseTitle: "Deep Learning & Neural Networks",
      type: "PPT / PDF",
      fileType: "pdf",
      fileSize: "8.4 MB",
      uploadedBy: "Dr. K. S. Ramanathan",
      uploadedDate: "10 Oct 2026",
      downloadUrl: "#",
      description: "Full slide deck covering backpropagation, activation mathematics, convolution filters, and ResNet architectures."
    },
    {
      id: "mat-2",
      title: "PyTorch GPU Training Notebooks & Code Recipes",
      courseCode: "CS601",
      courseTitle: "Deep Learning & Neural Networks",
      type: "Code Repository",
      fileType: "code",
      fileSize: "14.2 MB",
      uploadedBy: "Dr. K. S. Ramanathan",
      uploadedDate: "08 Oct 2026",
      downloadUrl: "#",
      description: "Complete PyTorch Jupyter notebooks for MNIST, CIFAR-10 classification, and custom dataset data loaders."
    },
    {
      id: "mat-3",
      title: "Kubernetes Enterprise Deployment Guide & Manifests",
      courseCode: "CS602",
      courseTitle: "Cloud Computing & DevOps",
      type: "Document",
      fileType: "pdf",
      fileSize: "5.1 MB",
      uploadedBy: "Prof. Ananya Sen",
      uploadedDate: "05 Oct 2026",
      downloadUrl: "#",
      description: "Step-by-step production cluster configuration, Ingress YAMLs, Persistent Volumes, and Helm deployment scripts."
    },
    {
      id: "mat-4",
      title: "Transformers & Attention Mechanism Illustrated Notes",
      courseCode: "CS603",
      courseTitle: "Natural Language Processing",
      type: "Lecture Notes",
      fileType: "pdf",
      fileSize: "6.8 MB",
      uploadedBy: "Dr. Arvind Swaminathan",
      uploadedDate: "02 Oct 2026",
      downloadUrl: "#",
      description: "Mathematical derivation of Scaled Dot-Product Attention, Multi-Head projection matrices, and Positional Encodings."
    },
    {
      id: "mat-5",
      title: "Apache Spark RDD & DataFrames Optimization Cheatsheet",
      courseCode: "CS604",
      courseTitle: "Big Data Analytics",
      type: "Cheatsheet",
      fileType: "pdf",
      fileSize: "3.2 MB",
      uploadedBy: "Dr. Meenakshi Sundaram",
      uploadedDate: "28 Sep 2026",
      downloadUrl: "#",
      description: "Quick reference guide for Catalyst optimizer plans, broadcast joins, partitioning, and caching strategies."
    },
    {
      id: "mat-6",
      title: "OWASP Top 10 Web Vulnerability Mitigation Handout",
      courseCode: "CS605",
      courseTitle: "Cyber Security & Cryptography",
      type: "Handout",
      fileType: "pdf",
      fileSize: "4.7 MB",
      uploadedBy: "Prof. Rajesh Kumar Verma",
      uploadedDate: "22 Sep 2026",
      downloadUrl: "#",
      description: "Code snippets showcasing SQL Injection prevention, XSS sanitization, CSRF token validation, and secure HTTP headers."
    },
    {
      id: "mat-7",
      title: "Previous 5 Years University End-Semester Question Papers",
      courseCode: "CS601",
      courseTitle: "Deep Learning & Neural Networks",
      type: "Past Papers",
      fileType: "pdf",
      fileSize: "11.6 MB",
      uploadedBy: "Academic Cell",
      uploadedDate: "15 Sep 2026",
      downloadUrl: "#",
      description: "Compiled solved questions from 2021-2025 examination cycles with model answer keys."
    },
    {
      id: "mat-8",
      title: "Recorded Lecture: Building Microservices with Vanilla Web Standards",
      courseCode: "CS606",
      courseTitle: "Modern Web Technologies",
      type: "Video Link",
      fileType: "video",
      fileSize: "Stream (48 mins)",
      uploadedBy: "Dr. Priya Nandakumar",
      uploadedDate: "12 Sep 2026",
      downloadUrl: "#",
      description: "Class recording detailing REST API integration, state management with localStorage, and responsive UI architecture."
    }
  ],

  // Assignments
  assignments: [
    {
      id: "asg-1",
      title: "Implementation of Residual Neural Network (ResNet-18) in PyTorch",
      courseCode: "CS601",
      courseTitle: "Deep Learning & Neural Networks",
      description: "Build ResNet-18 from scratch with custom skip connections. Train on CIFAR-10 dataset achieving >90% validation accuracy and plot loss curves.",
      issueDate: "2026-10-05",
      dueDate: "2026-10-22",
      maxMarks: 100,
      marksObtained: null,
      status: "Pending", // Pending, Submitted, Evaluated
      submissionFile: null,
      submissionDate: null,
      facultyFeedback: null
    },
    {
      id: "asg-2",
      title: "Dockerizing a 3-Tier Web App & Kubernetes Cluster Deployment",
      courseCode: "CS602",
      courseTitle: "Cloud Computing & DevOps",
      description: "Containerize frontend, backend, and PostgreSQL database. Write Kubernetes deployment, service, and ingress manifests with health check probes.",
      issueDate: "2026-10-02",
      dueDate: "2026-10-18",
      maxMarks: 50,
      marksObtained: null,
      status: "Pending",
      submissionFile: null,
      submissionDate: null,
      facultyFeedback: null
    },
    {
      id: "asg-3",
      title: "Domain Sentiment Analysis using BERT and Fine-tuning",
      courseCode: "CS603",
      courseTitle: "Natural Language Processing",
      description: "Fine-tune HuggingFace bert-base-uncased on customer reviews dataset. Report F1-score, Confusion Matrix, and deploy inference endpoint.",
      issueDate: "2026-09-25",
      dueDate: "2026-10-14",
      maxMarks: 100,
      marksObtained: 94,
      status: "Evaluated",
      submissionFile: "21BCE1042_NLP_Assignment3.zip",
      submissionDate: "2026-10-12",
      facultyFeedback: "Outstanding work! Excellent hyperparameter tuning and clear ablation study on attention heads."
    },
    {
      id: "asg-4",
      title: "Distributed Clickstream Log Processing with Apache Spark SQL",
      courseCode: "CS604",
      courseTitle: "Big Data Analytics",
      description: "Ingest 50GB clickstream logs into Spark DataFrames. Compute top 10 referrers, bounce rates, and session durations with sliding windows.",
      issueDate: "2026-09-18",
      dueDate: "2026-10-04",
      maxMarks: 50,
      marksObtained: 48,
      status: "Evaluated",
      submissionFile: "21BCE1042_Spark_Clickstream.py",
      submissionDate: "2026-10-03",
      facultyFeedback: "Very clean query structure. Good use of broadcast join optimization."
    },
    {
      id: "asg-5",
      title: "Cryptographic Protocol Implementation (AES-256 + RSA Signature)",
      courseCode: "CS605",
      courseTitle: "Cyber Security & Cryptography",
      description: "Implement hybrid encryption scheme where symmetric session key is encrypted with RSA public key, message encrypted with AES-GCM.",
      issueDate: "2026-10-08",
      dueDate: "2026-10-25",
      maxMarks: 50,
      marksObtained: null,
      status: "Pending",
      submissionFile: null,
      submissionDate: null,
      facultyFeedback: null
    }
  ],

  // Assessments / Demo Quizzes
  quizzes: [
    {
      id: "quiz-ai-1",
      title: "Deep Learning & Neural Networks Midterm Assessment",
      courseCode: "CS601",
      courseTitle: "Deep Learning & Neural Networks",
      durationMinutes: 15,
      totalQuestions: 8,
      passingScore: 60,
      lastScore: null,
      completedDate: null,
      questions: [
        {
          id: 1,
          question: "Which activation function is most effective in alleviating the vanishing gradient problem in deep feedforward networks?",
          options: [
            "Sigmoid function",
            "Rectified Linear Unit (ReLU)",
            "Hyperbolic Tangent (Tanh)",
            "Step function"
          ],
          correctIndex: 1,
          explanation: "ReLU has a constant derivative of 1 for all positive inputs, preventing gradients from saturating and decaying exponentially as depth increases."
        },
        {
          id: 2,
          question: "What is the primary role of Skip / Residual Connections in ResNet architectures?",
          options: [
            "To drastically reduce the number of model parameters",
            "To allow gradients to flow directly back to earlier layers, enabling training of very deep networks",
            "To replace convolution operations with dense projections",
            "To perform spatial pooling without losing channel dimensions"
          ],
          correctIndex: 1,
          explanation: "Skip connections add the input identity to the output of residual blocks: F(x) + x. This allows gradients during backprop to propagate without diminishing."
        },
        {
          id: 3,
          question: "In the Transformer architecture, why are Positional Encodings injected into input embeddings?",
          options: [
            "Because self-attention is permutation-invariant and has no inherent sense of word order",
            "To compress the vocabulary size into a smaller dimension",
            "To normalize activation values between -1 and 1",
            "To compute cross-entropy loss faster"
          ],
          correctIndex: 0,
          explanation: "Since self-attention processes all tokens in parallel without sequential recurrence, positional encodings provide spatial/temporal token sequence information."
        },
        {
          id: 4,
          question: "Which optimization algorithm computes adaptive learning rates for each individual parameter using first and second moments of gradients?",
          options: [
            "Stochastic Gradient Descent (SGD)",
            "Momentum SGD",
            "Adam (Adaptive Moment Estimation)",
            "Nesterov Accelerated Gradient"
          ],
          correctIndex: 2,
          explanation: "Adam keeps exponentially decaying moving averages of past gradients (first moment) and past squared gradients (second moment)."
        },
        {
          id: 5,
          question: "What technique randomly deactivates a subset of neurons during training to prevent co-adaptation and overfitting?",
          options: [
            "Batch Normalization",
            "Weight Decay (L2 Regularization)",
            "Dropout",
            "Data Augmentation"
          ],
          correctIndex: 2,
          explanation: "Dropout sets neuron activations to zero with probability p during training, forcing network pathways to learn robust generalized representations."
        },
        {
          id: 6,
          question: "In a Convolutional Neural Network (CNN), what is the spatial effect of applying a 3x3 filter with Stride 1 and Valid (zero) padding on a 28x28 input?",
          options: [
            "Output size becomes 28x28",
            "Output size becomes 26x26",
            "Output size becomes 30x30",
            "Output size becomes 14x14"
          ],
          correctIndex: 1,
          explanation: "Output size = ((W - K + 2P)/S) + 1 = ((28 - 3 + 0)/1) + 1 = 25 + 1 = 26x26."
        },
        {
          id: 7,
          question: "What loss function is standardly used for multiclass classification tasks with mutually exclusive class labels?",
          options: [
            "Mean Squared Error (MSE)",
            "Categorical Cross-Entropy (with Softmax)",
            "Binary Cross-Entropy",
            "Hinge Loss"
          ],
          correctIndex: 1,
          explanation: "Categorical Cross-Entropy combined with a Softmax output layer measures the divergence between predicted probability distributions and one-hot ground truth."
        },
        {
          id: 8,
          question: "Which of the following is an example of an autoregressive Large Language Model decoder?",
          options: [
            "BERT (Bidirectional Encoder)",
            "RoBERTa",
            "GPT-4",
            "T5 Encoder"
          ],
          correctIndex: 2,
          explanation: "GPT models use causal masked self-attention to generate tokens sequentially from left to right, making them autoregressive decoders."
        }
      ]
    },
    {
      id: "quiz-cloud-1",
      title: "Cloud Architecture & DevOps Practice Quiz",
      courseCode: "CS602",
      courseTitle: "Cloud Computing & DevOps",
      durationMinutes: 10,
      totalQuestions: 5,
      passingScore: 60,
      lastScore: null,
      completedDate: null,
      questions: [
        {
          id: 1,
          question: "Which Kubernetes resource manages a set of identical Pods and ensures that a specified number of Pod replicas are always running?",
          options: ["ConfigMap", "ReplicaSet / Deployment", "Service", "Ingress"],
          correctIndex: 1,
          explanation: "Deployments and ReplicaSets maintain the desired state of pods, performing automated rollouts, scaling, and self-healing."
        },
        {
          id: 2,
          question: "What is the primary benefit of Multi-stage Docker builds?",
          options: [
            "Allows multiple developers to build simultaneously",
            "Significantly reduces final container image size by discarding build tools and compilers",
            "Enables containers to run across multiple clouds automatically",
            "Encrypts Docker volumes by default"
          ],
          correctIndex: 1,
          explanation: "Multi-stage builds allow intermediate build layers to compile code, while the final stage copies only compiled artifacts into a minimal runtime base image."
        },
        {
          id: 3,
          question: "In Infrastructure as Code (IaC), what is the key characteristic of an Idempotent configuration?",
          options: [
            "Applying the configuration multiple times produces the exact same system state without errors or side effects",
            "Configurations can only be written in Python",
            "Infrastructure cannot be modified once provisioned",
            "Servers restart automatically every 24 hours"
          ],
          correctIndex: 0,
          explanation: "Idempotence guarantees that no matter how many times an IaC script is executed, the desired target state remains identical."
        },
        {
          id: 4,
          question: "Which deployment strategy directs a small percentage of live user traffic to the new software release while monitoring metrics before full rollout?",
          options: ["Recreate Deployment", "Blue-Green Deployment", "Canary Deployment", "Shadow Deployment"],
          correctIndex: 2,
          explanation: "Canary deployments minimize risk by routing a small fraction (e.g., 5%) of real traffic to the new version to verify stability."
        },
        {
          id: 5,
          question: "Which tool is an open-source systems monitoring and alerting toolkit featuring a multi-dimensional time-series data model queried with PromQL?",
          options: ["Prometheus", "Jenkins", "Ansible", "Terraform"],
          correctIndex: 0,
          explanation: "Prometheus scrapes metrics from monitored targets over HTTP, stores them as time-series metrics, and provides PromQL for querying."
        }
      ]
    }
  ],

  // Fees & Financial Data
  fees: {
    totalFee: 185000,
    paidAmount: 185000,
    outstandingBalance: 0,
    dueDate: "2026-11-15",
    paymentStatus: "Paid in Full",
    academicYear: "2025-2026",
    scholarshipConcession: 25000,
    breakdown: [
      { category: "Tuition Fees", amount: 120000, status: "Paid" },
      { category: "Specialized Laboratory & Computing Lab Fees", amount: 25000, status: "Paid" },
      { category: "Examination & Assessment Fees", amount: 8000, status: "Paid" },
      { category: "Digital Library & IEEE Resource Access", amount: 6000, status: "Paid" },
      { category: "Campus Infrastructure & High-Speed Wi-Fi", amount: 10000, status: "Paid" },
      { category: "Student Career Development & Placement Training", amount: 16000, status: "Paid" },
      { category: "Merit Scholarship Waiver (Credit)", amount: -25000, status: "Adjusted" }
    ],
    history: [
      {
        receiptNo: "REC-2026-SEM6-0428",
        date: "2026-07-20",
        term: "Semester 6 Academic Fees (Full)",
        amount: 80000,
        paymentMode: "Net Banking (HDFC)",
        transactionRef: "HDFC98421049281",
        status: "Success",
        downloadable: true
      },
      {
        receiptNo: "REC-2026-SEM6-0112",
        date: "2026-06-15",
        term: "Semester 6 Registration & Lab Fees",
        amount: 80000,
        paymentMode: "UPI (Google Pay)",
        transactionRef: "UPI-42819031829",
        status: "Success",
        downloadable: true
      },
      {
        receiptNo: "REC-2025-SEM5-0981",
        date: "2025-12-10",
        term: "Semester 5 Academic Fees (Full)",
        amount: 155000,
        paymentMode: "Net Banking (SBI)",
        transactionRef: "SBI49281048291",
        status: "Success",
        downloadable: true
      }
    ]
  },

  // Projects & Research
  projects: [
    {
      id: "proj-1",
      title: "MedVision: Multimodal Clinical Diagnosis Assistant via Vision-Language Models",
      category: "Capstone Design Project",
      guide: "Dr. Sundaram Krishnamurthy",
      guideEmail: "sundaram.k@camu.edu.in",
      teamMembers: ["Vigneshwaran R (Lead)", "Aditya Menon", "Sneha Kulkarni", "Rohit V"],
      startDate: "2026-06-10",
      targetDate: "2026-11-30",
      progress: 75,
      status: "In Progress",
      domain: "Computer Vision & Healthcare AI",
      technologies: ["PyTorch", "CLIP", "FastAPI", "React/Vanilla JS", "Docker", "DICOM"],
      githubUrl: "https://github.com/vignesh-camu/medvision-vlm",
      liveDemoUrl: "https://medvision-demo.camu.ac.in",
      description: "A secure hospital-grade multimodal diagnostic assistant that interprets chest X-rays, CT scans, and physician audio notes using fine-tuned open-weight vision-language models.",
      milestones: [
        { name: "Literature Review & Dataset Aggregation (MIMIC-CXR)", status: "Completed", date: "2026-07-15" },
        { name: "Backbone Architecture & Contrastive Pretraining", status: "Completed", date: "2026-08-30" },
        { name: "Zero-Shot Diagnostic Benchmark & Explainability Heatmaps", status: "Completed", date: "2026-09-30" },
        { name: "Clinical Pilot Testing & Research Paper Submission", status: "In Progress", date: "2026-10-31" },
        { name: "Final Committee Defense & System Deployment", status: "Upcoming", date: "2026-11-30" }
      ],
      deliverables: ["SRS Document v2.1", "PyTorch Training Checkpoints", "IEEE Conference Draft Paper", "Interactive Physician Web UI"]
    },
    {
      id: "proj-2",
      title: "NeuroEdge: Ultra-Low-Latency On-Device LLM Quantization & Inference Engine",
      category: "Research Project / Mini-Project",
      guide: "Dr. K. S. Ramanathan",
      guideEmail: "ramanathan.ks@camu.edu.in",
      teamMembers: ["Vigneshwaran R", "Harish Natarajan"],
      startDate: "2026-07-01",
      targetDate: "2026-10-28",
      progress: 90,
      status: "Near Completion",
      domain: "Edge Computing & Model Optimization",
      technologies: ["C++20", "GGML/GGUF", "WebAssembly", "Metal/CUDA", "Python"],
      githubUrl: "https://github.com/vignesh-camu/neuro-edge-wasm",
      liveDemoUrl: "https://neuroedge.camu.ac.in",
      description: "An open-source runtime executing 4-bit and 3-bit quantized transformer models directly inside client web browsers using WebAssembly and WebGPU without cloud servers.",
      milestones: [
        { name: "GGUF Quantization Engine Integration", status: "Completed", date: "2026-07-25" },
        { name: "WebGPU Compute Shaders for Matrix Multiplication", status: "Completed", date: "2026-08-20" },
        { name: "Browser In-Memory KV Cache Optimization", status: "Completed", date: "2026-09-25" },
        { name: "Benchmarking 45 tokens/sec on Apple M-series chips", status: "Completed", date: "2026-10-05" }
      ],
      deliverables: ["C++ Library Source Code", "WebAssembly NPM Package", "Technical Whitepaper"]
    },
    {
      id: "proj-3",
      title: "Decentralized Academic Credential Verification on Polygon",
      category: "Hackathon Project (Smart India Hackathon)",
      guide: "Prof. Rajesh Kumar Verma",
      guideEmail: "rajesh.v@camu.edu.in",
      teamMembers: ["Vigneshwaran R", "Preethi Selvaraj", "Karthik Raja"],
      startDate: "2026-03-01",
      targetDate: "2026-05-15",
      progress: 100,
      status: "Completed",
      domain: "Blockchain & Web3",
      technologies: ["Solidity", "Hardhat", "Polygon PoS", "Ethers.js", "IPFS"],
      githubUrl: "https://github.com/vignesh-camu/academic-nft-verifier",
      liveDemoUrl: "https://credential-verify.camu.ac.in",
      description: "Won 1st Runner-Up in SIH 2026. Cryptographically verifies university marks-sheets and degree certificates via Soulbound Tokens on Polygon PoS.",
      milestones: [
        { name: "Smart Contract Architecture & Audit", status: "Completed", date: "2026-03-20" },
        { name: "IPFS Document Metadata Pinning", status: "Completed", date: "2026-04-10" },
        { name: "Verifier Portal & QR Scanning UI", status: "Completed", date: "2026-05-01" }
      ],
      deliverables: ["Verified Polygon Smart Contract", "GitHub Open Source Repo", "Hackathon Certificate of Honor"]
    }
  ],

  // Placements & Career
  placements: {
    eligibility: {
      status: "Eligible for Tier 1 Super Dream & Dream Drives",
      minCgpaRequired: 8.5,
      studentCgpa: 8.94,
      backlogLimit: 0,
      studentBacklogs: 0,
      eligibleBranches: ["CSE", "IT", "AI & DS", "ECE"]
    },
    metrics: {
      totalVisiting: 34,
      activeDrives: 8,
      applicationsSubmitted: 4,
      shortlisted: 2,
      interviewsScheduled: 1,
      offersReceived: 1
    },
    applications: [
      {
        id: "app-1",
        company: "Google India",
        role: "Software Engineer - AI/ML (Campus 2026)",
        package: "₹38.5 LPA",
        location: "Bengaluru / Hyderabad",
        appliedDate: "2026-09-28",
        status: "Shortlisted for Technical Round 2", // Applied, Shortlisted, Interviewing, Offered, Closed
        badgeColor: "success",
        rounds: [
          { name: "Online Coding Assessment", status: "Cleared", date: "2026-10-02" },
          { name: "Data Structures & Algorithms Round", status: "Cleared", date: "2026-10-10" },
          { name: "Machine Learning & System Architecture Round", status: "Scheduled", date: "2026-10-24" },
          { name: "Googliness & Leadership Fit Round", status: "Upcoming", date: "--" }
        ]
      },
      {
        id: "app-2",
        company: "Microsoft IDC",
        role: "Software Development Engineer (SDE-1)",
        package: "₹44.0 LPA",
        location: "Bengaluru / Noida",
        appliedDate: "2026-09-20",
        status: "Shortlisted for Online Assessment",
        badgeColor: "primary",
        rounds: [
          { name: "Online Coding Test", status: "Completed (Awaiting result)", date: "2026-10-14" },
          { name: "Technical Interview 1", status: "Pending", date: "--" },
          { name: "AA/System Design Round", status: "Pending", date: "--" }
        ]
      },
      {
        id: "app-3",
        company: "Zoho Corporation",
        role: "Member Technical Staff (Core Platform)",
        package: "₹14.0 LPA",
        location: "Chennai / Tenkasi",
        appliedDate: "2026-08-15",
        status: "Offer Received",
        badgeColor: "success",
        rounds: [
          { name: "Aptitude & C Programming", status: "Cleared", date: "2026-08-20" },
          { name: "Advanced Programming Round", status: "Cleared", date: "2026-08-28" },
          { name: "Design & Technical Interview", status: "Cleared", date: "2026-09-05" },
          { name: "HR Fitment & Offer Discussion", status: "Completed - Offer Released", date: "2026-09-12" }
        ]
      },
      {
        id: "app-4",
        company: "Amazon AWS",
        role: "Cloud Solutions Architect Intern + FTE",
        package: "₹32.0 LPA",
        location: "Bengaluru",
        appliedDate: "2026-10-01",
        status: "Application Under Review",
        badgeColor: "info",
        rounds: [
          { name: "AWS Cloud Coding Assessment", status: "Under Review", date: "2026-10-06" }
        ]
      }
    ],
    upcomingDrives: [
      {
        id: "drive-1",
        company: "NVIDIA Corporation",
        logo: "assets/images/nvidia.svg",
        role: "Deep Learning Software Engineer",
        jobType: "Full-Time (Super Dream)",
        package: "₹36.0 - ₹42.0 LPA",
        location: "Bengaluru / Pune",
        minCgpa: 8.5,
        allowedBranches: "CSE, AI&DS, ECE",
        deadline: "2026-10-25",
        skills: ["C++", "CUDA", "PyTorch", "TensorRT", "Computer Vision"],
        description: "Join the TensorRT inference runtime team optimizing transformer models for high-throughput AI data centers.",
        status: "Open for Application"
      },
      {
        id: "drive-2",
        company: "Goldman Sachs",
        logo: "assets/images/goldman.svg",
        role: "Quantitative Technology Analyst",
        jobType: "Full-Time (Super Dream)",
        package: "₹34.0 LPA",
        location: "Bengaluru",
        minCgpa: 8.0,
        allowedBranches: "All Engineering Branches",
        deadline: "2026-10-28",
        skills: ["Algorithms", "Python / C++", "Distributed Systems", "Financial Engineering"],
        description: "Develop algorithmic low-latency quantitative models and automated order execution microservices.",
        status: "Open for Application"
      },
      {
        id: "drive-3",
        company: "Cisco Systems",
        logo: "assets/images/cisco.svg",
        role: "Software Engineer - Cloud Networking",
        jobType: "Full-Time (Dream)",
        package: "₹22.0 LPA",
        location: "Bengaluru / Chennai",
        minCgpa: 7.5,
        allowedBranches: "CSE, IT, ECE, EEE",
        deadline: "2026-11-05",
        skills: ["Computer Networks", "Go / Python", "Kubernetes", "Linux Kernel"],
        description: "Engineering next-generation software-defined networking architectures and cybersecurity observability tools.",
        status: "Open for Application"
      },
      {
        id: "drive-4",
        company: "Infosys Springboard / Infosys",
        logo: "assets/images/infosys.svg",
        role: "Specialist Programmer (Power Programmer)",
        jobType: "Full-Time",
        package: "₹9.5 - ₹12.0 LPA",
        location: "Pan-India",
        minCgpa: 7.0,
        allowedBranches: "All Engineering Branches",
        deadline: "2026-11-12",
        skills: ["Full Stack", "Data Structures", "Cloud", "Microservices"],
        description: "High-tier engineering track focusing on architecture design, open source integration, and enterprise AI transformation.",
        status: "Open for Application"
      }
    ]
  },

  // Announcements & Activity Feed
  announcements: [
    {
      id: "ann-1",
      title: "End-Semester Theory & Practical Examination Schedule (Nov 2026)",
      category: "Examinations",
      priority: "Urgent",
      pinned: true,
      publishedDate: "2026-10-14",
      publisher: "Office of the Controller of Examinations",
      read: false,
      summary: "The definitive timetable for November 2026 End-Semester Examinations has been published. Hall tickets will be downloadable from 25th October.",
      content: "All eligible students must download and print their Digital Hall Ticket before entering the examination block. Any clash in elective courses must be reported to the Controller's office before 22nd October 2026."
    },
    {
      id: "ann-2",
      title: "Super Dream Campus Drive Announcement: NVIDIA & Goldman Sachs",
      category: "Placements",
      priority: "High",
      pinned: true,
      publishedDate: "2026-10-12",
      publisher: "University Centre for Career Development",
      read: false,
      summary: "Registrations are now open for NVIDIA (AI/Deep Learning) and Goldman Sachs campus placement drives. Eligible students must apply before deadlines.",
      content: "Students maintaining CGPA >= 8.5 with no active backlogs are eligible to register. Ensure your verified technical resume is attached in the placement module."
    },
    {
      id: "ann-3",
      title: "INNOVENT 2026: Annual International Technical Symposium & Hackathon",
      category: "Campus Events",
      priority: "Normal",
      pinned: false,
      publishedDate: "2026-10-09",
      publisher: "Student Affairs & Innovation Cell",
      read: true,
      summary: "36-hour National Hackathon with prize pool of ₹5,00,000. Registration open for tracks in GenAI, Web3, Smart Mobility, and Healthcare.",
      content: "Teams of 3 to 4 students can register with their project abstract. Hardware labs and GPU servers will be provided for all shortlisted finalists."
    },
    {
      id: "ann-4",
      title: "Central Library Extended Reading Room Hours for Exam Preparation",
      category: "Academic Support",
      priority: "Normal",
      pinned: false,
      publishedDate: "2026-10-06",
      publisher: "Chief University Librarian",
      read: true,
      summary: "The Central Library and Digital Resource Labs will operate 24x7 starting 20th October through 30th November 2026.",
      content: "High-speed Wi-Fi, reference textbook counters, and cafeteria services will remain accessible throughout the night for enrolled students."
    },
    {
      id: "ann-5",
      title: "Mandatory Course Feedback & Teaching Evaluation Survey",
      category: "Academics",
      priority: "Medium",
      pinned: false,
      publishedDate: "2026-10-01",
      publisher: "Internal Quality Assurance Cell (IQAC)",
      read: true,
      summary: "All undergraduate students are requested to complete the anonymous faculty and course evaluation survey before 31st October.",
      content: "Your feedback is vital to our academic curriculum continuous improvement. Survey takes approximately 5 minutes per course."
    }
  ],

  // Notifications
  notifications: [
    {
      id: "notif-1",
      title: "Assignment Due in 6 Days",
      message: "Deep Learning (CS601): ResNet-18 Implementation submission deadline is 22 Oct 2026, 11:59 PM.",
      time: "2 hours ago",
      category: "assignment",
      icon: "bi-journal-code",
      color: "warning",
      read: false,
      link: "assignments.html"
    },
    {
      id: "notif-2",
      title: "Google Campus Drive Status Update",
      message: "You have been shortlisted for Technical Interview Round 2 on 24th October 2026.",
      time: "5 hours ago",
      category: "placement",
      icon: "bi-briefcase",
      color: "success",
      read: false,
      link: "placements.html"
    },
    {
      id: "notif-3",
      title: "Continuous Assessment Marks Released",
      message: "Marks for NLP (CS603) Assignment 3 have been evaluated: 94 / 100 with faculty feedback.",
      time: "1 day ago",
      category: "results",
      icon: "bi-award",
      color: "info",
      read: false,
      link: "assignments.html"
    },
    {
      id: "notif-4",
      title: "End-Semester Exam Hall Ticket Ready",
      message: "Your November 2026 examination admit card is available for digital verification and download.",
      time: "2 days ago",
      category: "exam",
      icon: "bi-file-earmark-check",
      color: "primary",
      read: false,
      link: "examinations.html"
    },
    {
      id: "notif-5",
      title: "Library Book Due Reminder",
      message: "'Deep Learning' by Ian Goodfellow is due for return/renewal on 24th October 2026.",
      time: "3 days ago",
      category: "library",
      icon: "bi-book",
      color: "secondary",
      read: true,
      link: "library.html"
    },
    {
      id: "notif-6",
      title: "Fee Payment Verified",
      message: "Official receipt #REC-2026-SEM6-0428 for ₹80,000 has been verified and stamped.",
      time: "1 week ago",
      category: "fee",
      icon: "bi-receipt",
      color: "success",
      read: true,
      link: "fees.html"
    }
  ],

  // Library
  library: {
    borrowed: [
      {
        id: "lib-b1",
        title: "Deep Learning (Adaptive Computation and Machine Learning)",
        author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        isbn: "978-0262035613",
        accessionNo: "CAMU-LIB-CS-4192",
        borrowDate: "2026-09-24",
        dueDate: "2026-10-24",
        status: "Active (Due in 8 days)",
        fine: 0,
        canRenew: true
      },
      {
        id: "lib-b2",
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        isbn: "978-1449373320",
        accessionNo: "CAMU-LIB-CS-3810",
        borrowDate: "2026-09-15",
        dueDate: "2026-10-15",
        status: "Due Today",
        fine: 0,
        canRenew: true
      },
      {
        id: "lib-b3",
        title: "Kubernetes in Action (2nd Edition)",
        author: "Marko Luksa",
        isbn: "978-1617293726",
        accessionNo: "CAMU-LIB-CS-5104",
        borrowDate: "2026-08-28",
        dueDate: "2026-09-28",
        status: "Returned",
        fine: 0,
        canRenew: false
      }
    ],
    catalog: [
      { id: "cat-1", title: "Speech and Language Processing (3rd ed. draft)", author: "Dan Jurafsky & James H. Martin", category: "Artificial Intelligence", isbn: "978-0131873216", availableCopies: 5, totalCopies: 8, location: "Shelf AI-04" },
      { id: "cat-2", title: "Pattern Recognition and Machine Learning", author: "Christopher M. Bishop", category: "Artificial Intelligence", isbn: "978-0387310732", availableCopies: 3, totalCopies: 6, location: "Shelf AI-02" },
      { id: "cat-3", title: "Cryptography and Network Security", author: "William Stallings", category: "Cybersecurity", isbn: "978-0134444284", availableCopies: 7, totalCopies: 10, location: "Shelf SEC-01" },
      { id: "cat-4", title: "Introduction to Algorithms (CLRS 4th Ed.)", author: "Thomas H. Cormen, Charles E. Leiserson", category: "Algorithms", isbn: "978-0262046305", availableCopies: 2, totalCopies: 12, location: "Shelf ALG-03" },
      { id: "cat-5", title: "Learning Spark: Lightning-Fast Big Data Analysis", author: "Jules S. Damji, Brooke Wenig", category: "Big Data", isbn: "978-1492050049", availableCopies: 4, totalCopies: 5, location: "Shelf DATA-07" },
      { id: "cat-6", title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", category: "Software Engineering", isbn: "978-0132350884", availableCopies: 6, totalCopies: 8, location: "Shelf SE-05" }
    ],
    digitalSubscriptions: [
      { name: "IEEE Xplore Digital Library", type: "Full Institutional Access", link: "https://ieeexplore.ieee.org" },
      { name: "ACM Digital Library", type: "Full University Consortium", link: "https://dl.acm.org" },
      { name: "SpringerLink Journals", type: "Campus IP Access", link: "https://link.springer.com" },
      { name: "ScienceDirect (Elsevier)", type: "Federated Login", link: "https://sciencedirect.com" }
    ]
  },

  // Scholarships
  scholarships: [
    {
      id: "sch-1",
      name: "Mohan Babu University Merit Excellence Scholarship",
      provider: "University Academic Trust",
      amount: "₹25,000 / Semester",
      category: "Academic Merit",
      eligibility: "Top 5% students with CGPA >= 8.75 and 0 backlogs",
      status: "Approved & Credited",
      disbursementDate: "July 2026",
      appliedDate: "2026-06-01",
      validUntil: "May 2027"
    },
    {
      id: "sch-2",
      name: "National AI & Deep Tech Fellowship",
      provider: "Ministry of Electronics & Information Technology (MeitY)",
      amount: "₹60,000 / Year",
      category: "Government Grant",
      eligibility: "Pre-final and Final year B.Tech students pursuing ML/AI capstone research",
      status: "Under Review by Committee",
      disbursementDate: "Expected Nov 2026",
      appliedDate: "2026-08-20",
      validUntil: "Pending"
    },
    {
      id: "sch-3",
      name: "Industry Innovation Bursary (Tech Mahindra)",
      provider: "Tech Mahindra Foundation",
      amount: "₹30,000 One-time",
      category: "Industry Sponsorship",
      eligibility: "Winners of state/national level hackathons",
      status: "Open for Application",
      disbursementDate: "--",
      appliedDate: null,
      validUntil: "15 Nov 2026"
    }
  ],

  // Certificates & Official Document Requests
  certificates: {
    issued: [
      { id: "cert-1", title: "Official Academic Transcript (Semesters 1-5)", issueDate: "2025-12-18", documentNo: "TR-CAMU-2025-0428", status: "Verified & Downloadable", fileUrl: "#" },
      { id: "cert-2", title: "Bonafide Student Certificate (General Academic)", issueDate: "2026-08-10", documentNo: "BON-2026-8812", status: "Active", fileUrl: "#" },
      { id: "cert-3", title: "Summer Research Internship Completion Certificate", issueDate: "2026-07-25", documentNo: "INT-AI-2026-014", status: "Verified & Downloadable", fileUrl: "#" },
      { id: "cert-4", title: "Smart India Hackathon 1st Runner-Up Certificate", issueDate: "2026-05-18", documentNo: "SIH-2026-TN-41", status: "Verified & Downloadable", fileUrl: "#" }
    ],
    availableRequests: [
      { type: "Bonafide Certificate (Passport / Visa)", processingDays: "2 Working Days", fee: "Free" },
      { type: "Bonafide Certificate (Bank Loan / Financial Assistance)", processingDays: "2 Working Days", fee: "Free" },
      { type: "Official Consolidated Grade Transcript (Sealed Envelope)", processingDays: "5 Working Days", fee: "₹250" },
      { type: "Medium of Instruction Certificate (English)", processingDays: "3 Working Days", fee: "Free" },
      { type: "Course Completion Certificate", processingDays: "Available after Sem 8", fee: "Free" },
      { type: "Duplicate Student Identity Card", processingDays: "3 Working Days", fee: "₹150" }
    ],
    recentRequests: [
      { id: "req-101", type: "Bonafide Certificate (Internship Clearance)", submittedDate: "2026-10-10", status: "Approved & Ready for Download", remarks: "Digital copy generated with registrar e-seal." },
      { id: "req-102", type: "Official Consolidated Grade Transcript", submittedDate: "2026-10-14", status: "Processing in Registrar Office", remarks: "Verification of semester 5 credits in progress." }
    ]
  },

  // Student Document Vault
  documents: [
    { id: "doc-1", name: "10th Standard Secondary School Marksheet", type: "Academic Certificate", uploadedDate: "2022-08-10", status: "Verified", verifiedBy: "Admission Office", size: "2.1 MB", fileType: "pdf" },
    { id: "doc-2", name: "12th Standard Higher Secondary Marksheet", type: "Academic Certificate", uploadedDate: "2022-08-10", status: "Verified", verifiedBy: "Admission Office", size: "2.4 MB", fileType: "pdf" },
    { id: "doc-3", name: "Transfer & Conduct Certificate", type: "Official Certificate", uploadedDate: "2022-08-12", status: "Verified", verifiedBy: "Dean of Admissions", size: "1.8 MB", fileType: "pdf" },
    { id: "doc-4", name: "National Identity Proof (Aadhar Card)", type: "Government ID", uploadedDate: "2022-08-12", status: "Verified", verifiedBy: "Student Records Cell", size: "1.2 MB", fileType: "pdf" },
    { id: "doc-5", name: "Community & Nativity Certificate", type: "Government Certificate", uploadedDate: "2022-08-12", status: "Verified", verifiedBy: "Social Welfare Cell", size: "1.5 MB", fileType: "pdf" },
    { id: "doc-6", name: "University Admission Allotment Order", type: "University Allotment", uploadedDate: "2022-08-14", status: "Verified", verifiedBy: "Academic Registrar", size: "1.9 MB", fileType: "pdf" },
    { id: "doc-7", name: "Latest Resume (Technical 2026)", type: "Career Document", uploadedDate: "2026-10-12", status: "Active on Placement Portal", verifiedBy: "Career Advisory", size: "840 KB", fileType: "pdf" },
    { id: "doc-8", name: "Medical Fitness Certificate", type: "Health Record", uploadedDate: "2022-08-14", status: "Verified", verifiedBy: "University Health Centre", size: "950 KB", fileType: "pdf" }
  ],

  // Events & Clubs
  events: [
    {
      id: "ev-1",
      title: "INNOVENT 2026: 36-Hour National AI & Cloud Hackathon",
      club: "AI & Robotics Club x ACM Student Chapter",
      category: "Hackathon",
      date: "2026-11-06 to 2026-11-08",
      venue: "Dr. APJ Abdul Kalam Incubation Centre",
      prizePool: "₹5,00,000",
      registered: true,
      teamName: "NeuralSquad",
      image: "assets/images/event-hackathon.svg",
      description: "Premier national developer hackathon focused on Agentic AI, Autonomous Systems, and Sustainable Tech."
    },
    {
      id: "ev-2",
      title: "Hands-on Workshop: Scalable LLM Inference with TensorRT",
      club: "Google Developer Student Club (GDSC)",
      category: "Technical Workshop",
      date: "2026-10-21 (02:00 PM - 05:30 PM)",
      venue: "Auditorium 1 & Virtual Live Stream",
      prizePool: "Certificates & Swag",
      registered: false,
      teamName: null,
      image: "assets/images/event-workshop.svg",
      description: "Deep dive into model quantization, memory-bound kernel optimizations, and deployment of Llama 3 models on NVIDIA RTX workstations."
    },
    {
      id: "ev-3",
      title: "MILAN 2026: Annual Inter-College Cultural Extravaganza",
      club: "Student Cultural Council",
      category: "Cultural",
      date: "2026-12-04 to 2026-12-06",
      venue: "Open Air Amphitheatre & Sports Ground",
      prizePool: "Trophies & Awards",
      registered: false,
      teamName: null,
      image: "assets/images/event-cultural.svg",
      description: "Celebration of music, dance, theater, literature, and art with over 4,000 participants from across 60 universities."
    }
  ],

  clubs: [
    { id: "cl-1", name: "AI & Deep Learning Society", role: "Technical Lead (Core Committee)", members: 180, icon: "bi-cpu", category: "Technical" },
    { id: "cl-2", name: "ACM Student Chapter", role: "Active Member", members: 240, icon: "bi-laptop", category: "Technical" },
    { id: "cl-3", name: "Rotaract Youth Club", role: "Volunteer", members: 320, icon: "bi-heart-pulse", category: "Social Service" }
  ],

  // Grievances & Support Tickets
  grievances: [
    {
      id: "GRV-2026-1082",
      category: "Examinations & Marks",
      subject: "Clarification on CIA-2 Evaluation for NLP Assignment Component",
      submissionDate: "2026-10-11",
      priority: "Medium",
      status: "Resolved",
      description: "Continuous assessment marks for Assignment 3 were initially marked pending due to an issue with file unzip on the portal.",
      timeline: [
        { date: "2026-10-11 10:30 AM", author: "Student", text: "Ticket submitted with assignment zip hash verification." },
        { date: "2026-10-11 02:45 PM", author: "Faculty Coordinator (Dr. Arvind)", text: "Reviewed file. The zip was extracted and evaluated. Grade updated to 94/100." },
        { date: "2026-10-12 09:15 AM", author: "Academic Grievance Cell", text: "Verified that grade portal displays correct mark. Ticket marked as Resolved." }
      ]
    },
    {
      id: "GRV-2026-1095",
      category: "Campus Infrastructure & Wi-Fi",
      subject: "Intermittent Wi-Fi signal drop in AI Research Cluster Lab (Floor 3)",
      submissionDate: "2026-10-14",
      priority: "Normal",
      status: "In Progress",
      description: "Access Point AP-AI-3B appears to reboot periodically during peak afternoon hours causing ssh disconnects.",
      timeline: [
        { date: "2026-10-14 11:20 AM", author: "Student", text: "Reported intermittent signal drops on AP-AI-3B." },
        { date: "2026-10-14 03:00 PM", author: "IT Network Support Team", text: "Network engineer dispatched. Firmware upgrade scheduled for the switch port today at 6 PM." }
      ]
    }
  ],

  // Calendar Events
  calendarEvents: [
    { date: "2026-10-16", title: "Today: Modern Web Technologies Lab", type: "academic", time: "01:45 PM" },
    { date: "2026-10-18", title: "DevOps K8s Assignment Due", type: "deadline", time: "11:59 PM" },
    { date: "2026-10-21", title: "NVIDIA TensorRT Workshop", type: "event", time: "02:00 PM" },
    { date: "2026-10-22", title: "ResNet-18 PyTorch Assignment Due", type: "deadline", time: "11:59 PM" },
    { date: "2026-10-24", title: "Google India Tech Round 2 Interview", type: "placement", time: "10:30 AM" },
    { date: "2026-10-24", title: "Library Book Due (Deep Learning)", type: "library", time: "05:00 PM" },
    { date: "2026-10-25", title: "Digital Hall Tickets Download Open", type: "exam", time: "09:00 AM" },
    { date: "2026-10-28", title: "NeuroEdge Project Milestone Defense", type: "project", time: "03:00 PM" },
    { date: "2026-10-31", title: "End of CIA Internal Term", type: "academic", time: "05:00 PM" },
    { date: "2026-11-06", title: "INNOVENT 2026 National Hackathon", type: "event", time: "09:00 AM" },
    { date: "2026-11-10", title: "End-Semester Exam: CS601 Deep Learning", type: "exam", time: "09:30 AM" },
    { date: "2026-11-13", title: "End-Semester Exam: CS602 Cloud Computing", type: "exam", time: "09:30 AM" },
    { date: "2026-11-15", title: "Even Semester Fee Payment Early Deadline", type: "fee", time: "05:00 PM" },
    { date: "2026-11-17", title: "End-Semester Exam: CS603 NLP", type: "exam", time: "09:30 AM" }
  ],

  // Settings
  settings: {
    theme: "light", // light, dark, system
    emailNotifications: true,
    smsAlerts: false,
    assignmentReminders: true,
    examAlerts: true,
    placementAlerts: true,
    feeAlerts: true,
    publicProfile: false,
    showContactToRecruiters: true,
    fontSize: "normal",
    highContrast: false
  }
};
