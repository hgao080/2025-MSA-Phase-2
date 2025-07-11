import { type CreateProjectRequest, type Project, type UpdateProjectRequest } from '../Models/Project';
import { apiRequest } from './apiClient';

// Dummy data for development - replace with actual API calls
const DUMMY_PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoTracker - Sustainability Platform",
    description: "A comprehensive web platform to help students track their carbon footprint, discover eco-friendly habits, and compete with peers in sustainability challenges. Features real-time analytics, achievement systems, and social sharing.",
    tag: "Fullstack",
    authorEmail: "sarah.chen@university.edu",
    teamSize: 5,
    currentTeamSize: 2,
    estimatedDuration: 4,
    rolesNeeded: [
      {
        id: "role-1",
        title: "Frontend Developer",
        description: "Lead the development of responsive React components and implement modern UI/UX designs. Experience with TypeScript and state management required.",
        skillsRequired: ["React", "TypeScript", "CSS/Tailwind", "State Management"],
        filled: false
      },
      {
        id: "role-2",
        title: "Backend Developer",
        description: "Design and implement RESTful APIs, database architecture, and server-side logic. Knowledge of authentication and data security essential.",
        skillsRequired: ["Node.js", "PostgreSQL", "API Design", "Authentication"],
        filled: true
      },
      {
        id: "role-3",
        title: "UI/UX Designer",
        description: "Create intuitive user interfaces and engaging user experiences. Focus on accessibility and mobile-first design principles.",
        skillsRequired: ["Figma", "UI Design", "UX Research", "Prototyping"],
        filled: false
      }
    ]
  },
  {
    id: 2,
    title: "StudyBuddy - Collaborative Learning App",
    description: "A real-time collaborative study platform where students can form study groups, share notes, create flashcards together, and participate in virtual study sessions with video chat and screen sharing.",
    tag: "Fullstack",
    authorEmail: "marcus.johnson@university.edu",
    teamSize: 4,
    currentTeamSize: 1,
    estimatedDuration: 3,
    rolesNeeded: [
      {
        id: "role-4",
        title: "Full-Stack Developer",
        description: "Build both frontend Vue.js components and backend Express.js APIs. Experience with real-time technologies like Socket.io preferred.",
        skillsRequired: ["Vue.js", "Express.js", "MongoDB", "Socket.io"],
        filled: false
      },
      {
        id: "role-5",
        title: "WebRTC Specialist",
        description: "Implement video chat and screen sharing features using WebRTC. Knowledge of peer-to-peer communication protocols required.",
        skillsRequired: ["WebRTC", "JavaScript", "Peer-to-Peer", "Media Streaming"],
        filled: false
      },
      {
        id: "role-6",
        title: "Mobile Developer",
        description: "Create a companion mobile app using React Native or Flutter. Focus on cross-platform compatibility and offline capabilities.",
        skillsRequired: ["React Native", "Flutter", "Mobile UI", "Offline Storage"],
        filled: false
      }
    ]
  },
  {
    id: 3,
    title: "Campus Events Hub",
    description: "A centralized platform for discovering, creating, and managing campus events. Features event recommendations, RSVP systems, calendar integration, and social features for connecting with attendees.",
    tag: "Frontend",
    authorEmail: "emma.rodriguez@university.edu",
    teamSize: 3,
    currentTeamSize: 3,
    estimatedDuration: 2,
    rolesNeeded: [
      {
        id: "role-7",
        title: "Frontend Developer",
        description: "Develop responsive Next.js pages with focus on event discovery and user engagement. Experience with modern React patterns required.",
        skillsRequired: ["Next.js", "React", "TypeScript", "Responsive Design"],
        filled: true
      },
      {
        id: "role-8",
        title: "Database Designer",
        description: "Design efficient database schemas using Prisma ORM and Supabase. Optimize for event queries and user relationships.",
        skillsRequired: ["Prisma", "Supabase", "Database Design", "PostgreSQL"],
        filled: true
      },
      {
        id: "role-9",
        title: "Integration Specialist",
        description: "Integrate with calendar APIs (Google, Outlook) and social media platforms. Handle authentication and data synchronization.",
        skillsRequired: ["API Integration", "OAuth", "Calendar APIs", "Data Sync"],
        filled: true
      }
    ]
  },
  {
    id: 4,
    title: "DevPortfolio - Developer Showcase Platform",
    description: "A modern portfolio platform specifically designed for developers to showcase projects, skills, and achievements. Features GitHub integration, project analytics, and peer review systems.",
    tag: "Fullstack",
    authorEmail: "alex.kim@university.edu",
    teamSize: 6,
    currentTeamSize: 2,
    estimatedDuration: 5,
    rolesNeeded: [
      {
        id: "role-10",
        title: "Senior Frontend Developer",
        description: "Lead frontend architecture and implement complex UI components. Mentor junior developers and establish coding standards.",
        skillsRequired: ["React", "TypeScript", "Architecture", "Mentoring"],
        filled: false
      },
      {
        id: "role-11",
        title: "Firebase Specialist",
        description: "Configure and optimize Firebase services including Auth, Firestore, and Cloud Functions. Implement real-time features.",
        skillsRequired: ["Firebase", "Cloud Functions", "Firestore", "Authentication"],
        filled: true
      },
      {
        id: "role-12",
        title: "GitHub Integration Developer",
        description: "Build robust GitHub API integrations for automatic project imports, contribution tracking, and repository analysis.",
        skillsRequired: ["GitHub API", "REST APIs", "Data Processing", "OAuth"],
        filled: false
      },
      {
        id: "role-13",
        title: "Analytics Engineer",
        description: "Implement portfolio analytics, user engagement tracking, and data visualization dashboards for portfolio insights.",
        skillsRequired: ["Analytics", "Data Visualization", "Charts.js", "User Tracking"],
        filled: false
      }
    ]
  },
  {
    id: 5,
    title: "Smart Recipe Assistant",
    description: "An AI-powered recipe platform that suggests meals based on available ingredients, dietary restrictions, and nutritional goals. Features meal planning, shopping lists, and cooking timers.",
    tag: "Backend",
    authorEmail: "david.park@university.edu",
    teamSize: 4,
    currentTeamSize: 1,
    estimatedDuration: 4,
    rolesNeeded: [
      {
        id: "role-14",
        title: "Angular Developer",
        description: "Build responsive Angular application with focus on user experience and performance. Experience with RxJS and Angular Material preferred.",
        skillsRequired: ["Angular", "RxJS", "Angular Material", "TypeScript"],
        filled: false
      },
      {
        id: "role-15",
        title: "Python Backend Developer",
        description: "Develop FastAPI services for recipe processing, user management, and AI integration. Knowledge of async programming required.",
        skillsRequired: ["Python", "FastAPI", "Async Programming", "API Design"],
        filled: false
      },
      {
        id: "role-16",
        title: "AI/ML Engineer",
        description: "Integrate OpenAI APIs for recipe generation and implement recommendation algorithms. Experience with prompt engineering preferred.",
        skillsRequired: [],
        filled: false
      }
    ]
  },
  {
    id: 6,
    title: "CryptoLearn - Blockchain Education Platform",
    description: "An interactive educational platform teaching blockchain concepts, smart contract development, and cryptocurrency fundamentals through hands-on tutorials and simulated environments.",
    tag: "Fullstack",
    authorEmail: "blockchain.dev@university.edu",
    teamSize: 5,
    currentTeamSize: 3,
    estimatedDuration: 6,
    rolesNeeded: [
      {
        id: "role-17",
        title: "Blockchain Developer",
        description: "Develop smart contracts and Web3 integrations. Experience with Solidity and Ethereum ecosystem required.",
        skillsRequired: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
        filled: true
      },
      {
        id: "role-18",
        title: "Frontend Developer",
        description: "Build interactive React components for blockchain tutorials and wallet integration. Knowledge of Web3 libraries preferred.",
        skillsRequired: ["React", "Web3.js", "MetaMask", "Responsive Design"],
        filled: false
      },
      {
        id: "role-19",
        title: "Content Creator",
        description: "Develop educational content, tutorials, and interactive exercises for blockchain concepts. Technical writing skills essential.",
        skillsRequired: ["Technical Writing", "Educational Design", "Blockchain Knowledge", "Content Strategy"],
        filled: true
      }
    ]
  },
  {
    id: 7,
    title: "FitnessTracker Pro",
    description: "A comprehensive fitness tracking application with workout planning, nutrition logging, progress analytics, and social challenges. Integrates with wearable devices and health APIs.",
    tag: "Frontend",
    authorEmail: "fitness.enthusiast@university.edu",
    teamSize: 4,
    currentTeamSize: 4,
    estimatedDuration: 3,
    rolesNeeded: [
      {
        id: "role-20",
        title: "Mobile Developer",
        description: "Develop cross-platform mobile app with health tracking features. Experience with device sensors and health APIs required.",
        skillsRequired: ["React Native", "Health APIs", "Device Sensors", "Cross-Platform"],
        filled: true
      },
      {
        id: "role-21",
        title: "Data Visualization Specialist",
        description: "Create compelling charts and analytics dashboards for fitness progress tracking. Focus on user engagement and insights.",
        skillsRequired: ["D3.js", "Chart.js", "Data Analytics", "UI Design"],
        filled: true
      },
      {
        id: "role-22",
        title: "Wearables Integration Developer",
        description: "Integrate with fitness wearables (Fitbit, Apple Watch, etc.) and health platforms. Handle data synchronization and privacy.",
        skillsRequired: ["Wearables SDK", "Health APIs", "Data Sync", "Privacy"],
        filled: true
      },
      {
        id: "role-23",
        title: "Backend Developer",
        description: "Build APIs for user data, social features, and challenge systems. Focus on scalability and real-time updates.",
        skillsRequired: ["Node.js", "WebSocket", "Database Design", "API Security"],
        filled: true
      }
    ]
  },
  {
    id: 8,
    title: "CodeReview Assistant",
    description: "An AI-powered code review tool that provides automated feedback, suggests improvements, and helps maintain coding standards across development teams.",
    tag: "Backend",
    authorEmail: "ai.developer@university.edu",
    teamSize: 3,
    currentTeamSize: 1,
    estimatedDuration: 5,
    rolesNeeded: [
      {
        id: "role-24",
        title: "Machine Learning Engineer",
        description: "Develop ML models for code analysis and improvement suggestions. Experience with NLP and code understanding required.",
        skillsRequired: ["Machine Learning", "Python", "NLP", "Code Analysis"],
        filled: false
      },
      {
        id: "role-25",
        title: "DevOps Engineer",
        description: "Set up CI/CD pipelines, containerization, and deployment automation. Knowledge of GitHub Actions and Docker required.",
        skillsRequired: ["Docker", "GitHub Actions", "CI/CD", "Kubernetes"],
        filled: false
      }
    ]
  },
  {
    id: 9,
    title: "VirtualClassroom - Remote Learning Platform",
    description: "A comprehensive virtual classroom platform with live streaming, interactive whiteboards, breakout rooms, and assignment management. Designed for seamless remote education.",
    tag: "Fullstack",
    authorEmail: "education.tech@university.edu",
    teamSize: 8,
    currentTeamSize: 5,
    estimatedDuration: 8,
    rolesNeeded: [
      {
        id: "role-26",
        title: "Frontend Vue.js Developer",
        description: "Build responsive Vue.js components for classroom interface. Experience with complex state management and real-time updates required.",
        skillsRequired: ["Vue.js", "Vuex", "Real-time Updates", "Responsive Design"],
        filled: true
      },
      {
        id: "role-27",
        title: "WebRTC Specialist",
        description: "Implement video conferencing, screen sharing, and breakout room functionality. Deep knowledge of WebRTC protocols essential.",
        skillsRequired: ["WebRTC", "Video Streaming", "Peer-to-Peer", "Media Processing"],
        filled: false
      },
      {
        id: "role-28",
        title: "Canvas/Whiteboard Developer",
        description: "Create interactive whiteboard functionality with real-time collaboration. Experience with Canvas API and drawing libraries required.",
        skillsRequired: ["Canvas API", "Real-time Collaboration", "Drawing Libraries", "Touch Events"],
        filled: true
      }
    ]
  },
  {
    id: 10,
    title: "EcoMarket - Sustainable Shopping Platform",
    description: "A marketplace connecting consumers with eco-friendly products and sustainable brands. Features carbon footprint tracking, sustainability ratings, and green rewards program.",
    tag: "Fullstack",
    authorEmail: "green.commerce@university.edu",
    teamSize: 6,
    currentTeamSize: 2,
    estimatedDuration: 6,
    rolesNeeded: [
      {
        id: "role-29",
        title: "E-commerce Developer",
        description: "Build shopping cart, checkout, and payment processing features. Experience with Stripe and e-commerce flows required.",
        skillsRequired: ["Next.js", "Stripe", "Payment Processing", "E-commerce"],
        filled: false
      },
      {
        id: "role-30",
        title: "Sustainability Data Analyst",
        description: "Integrate sustainability APIs and create carbon footprint tracking algorithms. Knowledge of environmental data sources preferred.",
        skillsRequired: ["Data Analysis", "APIs", "Carbon Footprint", "Environmental Science"],
        filled: true
      },
      {
        id: "role-31",
        title: "Product Manager",
        description: "Define product roadmap, user stories, and coordinate development efforts. Experience with sustainable business models preferred.",
        skillsRequired: ["Product Management", "User Research", "Business Strategy", "Sustainability"],
        filled: false
      },
      {
        id: "role-32",
        title: "Full-Stack Developer",
        description: "Work on both frontend and backend features. Experience with modern web technologies and database design required.",
        skillsRequired: ["Next.js", "Node.js", "Database Design", "API Development"],
        filled: false
      }
    ]
  }
];

export const getProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return DUMMY_PROJECTS;
  
  // TODO: Replace with actual API call when backend is ready
  // try {
  //   return await apiRequest<Project[]>('/Projects', 'GET');
  // } catch (error) {
  //   console.error('Error fetching projects:', error);
  //   throw new Error('Failed to fetch projects');
  // }
};

export const getProject = async (id: number): Promise<Project> => {
  try {
    return await apiRequest<Project>(`/Projects/${id}`, 'GET');
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};

export const createProject = async (req: CreateProjectRequest): Promise<Project> => {
  try {
    return await apiRequest<Project>('/Projects', 'POST', req);
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

export const updateProject = async (id: number, req: UpdateProjectRequest): Promise<Project> => {
  try {
    return await apiRequest<Project>(`/Projects/${id}`, 'PUT', req);
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await apiRequest<void>(`/Projects/${id}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

export const getMyProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return a subset of dummy projects as "user's projects"
  const myProjects = DUMMY_PROJECTS.slice(0, 3).map(project => ({
    ...project,
    id: project.id + 10, // Different IDs to avoid conflicts
    authorEmail: "current.user@university.edu" // Simulate current user's projects
  }));
  
  return myProjects;
  
  // TODO: Replace with actual API call when backend is ready
  // try {
  //   return await apiRequest<Project[]>('/Projects/my-projects', 'GET');
  // } catch (error) {
  //   console.error('Error fetching my projects:', error);
  //   throw new Error('Failed to fetch my projects');
  // }
};