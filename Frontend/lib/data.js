import {
  Cpu,
  Smartphone,
  Server,
  Briefcase,
  Megaphone,
  BarChart,
  Users,
  Building,
  CheckCircle,
  GitBranch,
  Target,
  Zap,
} from "lucide-react"

export const navigationLinks = [
  { name: "What We Do", href: "#what-we-do" },
  { name: "Our Process", href: "#our-process" },
  { name: "Who We Empower", href: "#who-we-empower" },
]

export const heroData = {
  supertitle: "Empowering Smarter Growth Through",
  title: "Technology, Design, and Digital Innovation",
  subtitle:
    "RenewEdge Solutions is a technology, design, and digital solutions company that helps businesses grow and innovate.",
  button: {
    text: "Learn About Us",
    href: "#what-we-do",
  },
}

export const whatWeDoData = {
  tag: "WHAT WE DO",
  title: "Tech that Works, Strategies that Scale, Design that Connects",
  subtitle:
    "Our services are a blueprint for success. We introduce solutions to modernize your infrastructure, install smart systems, keep your operations running, and build sustainable growth. We make it possible, strategic, and built for sustainable growth.",
  services: [
    {
      icon: Cpu,
      title: "Electronics Repair & Maintenance",
      description:
        "Keeping your high-impact systems, from generators to industrial machines, running with our expert repair and maintenance services, ensuring your operations run without disruption.",
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      icon: Smartphone,
      title: "Smart Installations & IoT Systems",
      description:
        "Designing and installing smart home systems to make homes more comfortable, secure, and energy efficient. We also build custom IoT solutions for businesses to improve their operations.",
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      icon: Server,
      title: "IT Infrastructure & Support",
      description:
        "Building resilient IT systems with services including infrastructure design, cloud migration, and data center management. We also provide ongoing IT support to keep your systems running smoothly.",
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      icon: Briefcase,
      title: "Technology Consulting & Strategy",
      description:
        "Guiding businesses and governments in creating sustainable, future-proof technology strategies, from smart city initiatives to business digitalization.",
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      icon: Megaphone,
      title: "Marketing & Branding & Design",
      description:
        "Creating user-centric websites and digital experiences that drive engagement and growth. We combine creativity with data-driven insights to build marketing solutions that resonate with your audience.",
      image: "/placeholder.svg?width=400&height=300",
    },
  ],
}

export const theEdgeData = {
  title: "The Edge We Bring",
  features: [
    {
      icon: Zap,
      title: "Expertise that Delivers",
      description: "A team of forward-thinking professionals with deep industry knowledge.",
    },
    {
      icon: CheckCircle,
      title: "Solutions that Scale",
      description: "We design and implement solutions that grow with your needs.",
    },
    {
      icon: Users,
      title: "Strategic Partnership",
      description: "More than vendors, we are your partners in innovation and growth.",
    },
    {
      icon: Building,
      title: "Built for the Future",
      description: "Every solution is designed with longevity and adaptability in mind.",
    },
  ],
}

export const ourProcessData = {
  tag: "OUR PROCESS",
  title: "Simple. Powerful. Built to Last.",
  subtitle: "At RenewEdge Solutions, our work is guided by a clear, effective process.",
  steps: [
    {
      icon: Target,
      title: "Strategic Discovery",
      description: "We dive deep into understanding your goals, challenges, and opportunities.",
    },
    {
      icon: GitBranch,
      title: "Tailored Innovation",
      description: "We design solutions aligned with your growth, ensuring scalability.",
    },
    {
      icon: CheckCircle,
      title: "Seamless Execution",
      description: "We deliver with precision, quality, and a commitment to timelines.",
    },
    {
      icon: Zap,
      title: "Sustainable Support",
      description: "Our partnership continues as you adapt, optimize, and grow.",
    },
  ],
  cta: {
    text: "When you work with us, you gain a long-term strategic partner.",
    buttonText: "Let's build smarter together",
    href: "#",
  },
}

export const whoWeEmpowerData = {
  tag: "WHAT WE DO",
  title: "Who We Empower",
  subtitle:
    "We work with individuals, businesses, and governments to solve complex problems and build a better future. We want to work with you.",
  audiences: [
    {
      icon: Users,
      title: "Individuals",
      description: "Innovators and entrepreneurs with big ideas.",
    },
    {
      icon: Building,
      title: "Businesses",
      description: "Organizations seeking a strategic partner for digital transformation.",
    },
    {
      icon: BarChart,
      title: "Governments",
      description: "Institutions modernizing services for a smarter future.",
    },
  ],
}

export const ctaData = {
  title: "Need something custom? We're built for that.",
  subtitle: "Let's start your journey with us.",
  button: {
    text: "Get in touch with RenewEdge Solutions",
    href: "#",
  },
}

export const footerData = {
  logo: "RenewEdge Solutions",
  description: "Empowering Smarter Growth Through Technology, Design, and Digital Innovation",
  socials: [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
  ],
  links: [
    {
      title: "Company",
      items: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    {
      title: "Services",
      items: [
        { name: "Electronics Repair", href: "#" },
        { name: "Smart Installations", href: "#" },
        { name: "IT Infrastructure", href: "#" },
        { name: "Consulting", href: "#" },
        { name: "Marketing & Design", href: "#" },
      ],
    },
  ],
  legal: {
    copyright: "RenewEdge Solutions 2024",
    privacy: { name: "Privacy Policy", href: "#" },
    terms: { name: "Terms of Service", href: "#" },
  },
}
