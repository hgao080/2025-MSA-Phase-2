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
    estimatedDuration: "4 months",
    skillTags: ["React", "Node.js", "PostgreSQL", "TypeScript", "UI/UX Design", "Data Visualization"],
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
    estimatedDuration: "3 months",
    skillTags: ["Vue.js", "Express.js", "MongoDB", "Socket.io", "WebRTC", "Real-time"],
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
    estimatedDuration: "2 months",
    skillTags: ["Next.js", "Prisma", "Supabase", "TypeScript", "Calendar APIs", "Social Features"],
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
    estimatedDuration: "5 months",
    skillTags: ["React", "Firebase", "TypeScript", "GitHub API", "Analytics", "Peer Review"],
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
    estimatedDuration: "4 months",
    skillTags: ["Angular", "Python", "FastAPI", "OpenAI", "Machine Learning", "Nutrition APIs"],
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
        skillsRequired: ["OpenAI API", "Machine Learning", "Python", "Prompt Engineering"],
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
  try {
    return await apiRequest<Project[]>('/Projects/my-projects', 'GET');
  } catch (error) {
    console.error('Error fetching my projects:', error);
    throw new Error('Failed to fetch my projects');
  }
};