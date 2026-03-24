const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.videoProgress.deleteMany();
  await prisma.video.deleteMany();
  await prisma.section.deleteMany();
  await prisma.subject.deleteMany();

  console.log('Seeding new subjects...');

  // ─── Subject 1: Advanced Full-Stack Engineering ───────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Advanced Full-Stack Engineering',
      slug: 'advanced-fullstack',
      description:
        'Master modern web development with Next.js, Node.js, and Prisma. This comprehensive course covers everything from scalable backend architecture to stunning frontend design systems.',
      is_published: true,
      category: 'Web Dev',
      is_premium: true,
      price: 4999,
      level: 'Intermediate',
      instructor: 'Dr. Sarah Connor',
      rating: 4.8,
      sections: {
        create: [
          {
            title: '1. Getting Started',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Welcome & Course Overview',
                  description: 'An overview of what we will build and learn.',
                  // Next.js 15 Full Course – Traversy Media (2024)
                  youtube_url: 'https://www.youtube.com/watch?v=ZVnjOPwW4ZA',
                  order_index: 1,
                  duration_seconds: 120,
                },
                {
                  title: 'Setting up the Environment',
                  description: 'Installing Node.js, VS Code, and essential extensions.',
                  // VS Code Setup for Web Developers – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=fnPhJHN0jTE',
                  order_index: 2,
                  duration_seconds: 340,
                },
              ],
            },
          },
          {
            title: '2. Backend Architecture',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'REST API Design Principles',
                  description: 'Learn how to design scalable and predictable APIs.',
                  // REST API Design Best Practices – freeCodeCamp
                  youtube_url: 'https://www.youtube.com/watch?v=7nm1pYuKAhY',
                  order_index: 1,
                  duration_seconds: 600,
                },
                {
                  title: 'Prisma ORM Deep Dive',
                  description: 'Mastering relations, transactions, and performance.',
                  // Prisma Crash Course – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=CYH04BJzamo',
                  order_index: 2,
                  duration_seconds: 820,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 2: UI/UX Design for Developers ──────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'UI/UX Design for Developers',
      slug: 'ui-ux-design',
      description:
        'Learn how to create stunning, accessible, and user-friendly interfaces using Tailwind CSS and modern design systems.',
      is_published: true,
      category: 'Design',
      is_premium: false,
      level: 'Beginner',
      instructor: 'Alex Rivera',
      rating: 4.6,
      sections: {
        create: [
          {
            title: 'Foundations',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Color Theory & Typography',
                  description: 'How to pick colors and fonts that work.',
                  // Color Theory for Designers – The Futur
                  youtube_url: 'https://www.youtube.com/watch?v=_2LLXnUdUIc',
                  order_index: 1,
                  duration_seconds: 450,
                },
                {
                  title: 'Spacing and Layout',
                  description: 'The power of whitespace and grids.',
                  // UI Design for Beginners – freeCodeCamp (Figma full course)
                  youtube_url: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc',
                  order_index: 2,
                  duration_seconds: 520,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 3: Modern DevOps ─────────────────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Modern DevOps Practices',
      slug: 'modern-devops',
      description:
        'Learn CI/CD pipelines, container orchestration, monitoring, and infrastructure as code.',
      is_published: true,
      category: 'DevOps',
      is_premium: true,
      price: 5999,
      level: 'Advanced',
      instructor: 'James Wu',
      rating: 4.9,
      sections: {
        create: [
          {
            title: 'CI/CD Foundations',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Introduction to CI/CD',
                  description: 'Why automation matters and the basics of pipelines.',
                  // CI/CD Explained in 100 Seconds – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=scEDHsr3APg',
                  order_index: 1,
                  duration_seconds: 300,
                },
                {
                  title: 'GitHub Actions Basics',
                  description: 'Setting up your first workflow.',
                  // GitHub Actions Tutorial – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
                  order_index: 2,
                  duration_seconds: 420,
                },
              ],
            },
          },
          {
            title: 'Container Orchestration',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Docker Essentials',
                  description: 'Building, tagging, and running containers.',
                  // Docker Tutorial for Beginners – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
                  order_index: 1,
                  duration_seconds: 480,
                },
                {
                  title: 'Kubernetes Basics',
                  description: 'Pods, Deployments, Services, and Helm.',
                  // Kubernetes Tutorial for Beginners – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
                  order_index: 2,
                  duration_seconds: 600,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 4: Cloud Architecture ───────────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Cloud Architecture & Design',
      slug: 'cloud-architecture',
      description: 'Design scalable, resilient systems on AWS, GCP, and Azure.',
      is_published: true,
      category: 'Cloud',
      is_premium: true,
      price: 6999,
      level: 'Advanced',
      instructor: 'Elena Rodriguez',
      rating: 4.7,
      sections: {
        create: [
          {
            title: 'Fundamentals',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Cloud Service Models',
                  description: 'IaaS, PaaS, SaaS explained.',
                  // Cloud Computing in 100 Seconds – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=M988_fsOSWo',
                  order_index: 1,
                  duration_seconds: 350,
                },
                {
                  title: 'Designing for Scalability',
                  description: 'Load balancers, auto-scaling groups, and stateless services.',
                  // AWS Concepts – freeCodeCamp full AWS intro
                  youtube_url: 'https://www.youtube.com/watch?v=3XFODda6YXo',
                  order_index: 2,
                  duration_seconds: 540,
                },
              ],
            },
          },
          {
            title: 'Security & Cost',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Identity & Access Management',
                  description: 'IAM roles, policies, and best practices.',
                  // AWS IAM Tutorial – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=iF9fs8Rw4Uo',
                  order_index: 1,
                  duration_seconds: 400,
                },
                {
                  title: 'Cost Optimization',
                  description: 'Right-sizing, reserved instances, and monitoring spend.',
                  // AWS Cost Optimization – Be a Better Dev
                  youtube_url: 'https://www.youtube.com/watch?v=T-viaT391aQ',
                  order_index: 2,
                  duration_seconds: 420,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 5: Data Science Foundations ─────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Data Science Foundations',
      slug: 'data-science-foundations',
      description: 'Statistics, Python, and machine-learning pipelines for beginners.',
      is_published: true,
      category: 'Data Science',
      is_premium: false,
      level: 'Beginner',
      instructor: 'Prof. Michael Chen',
      rating: 4.5,
      sections: {
        create: [
          {
            title: 'Statistics & Probability',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Descriptive Statistics',
                  description: 'Mean, median, mode, variance, and visualizations.',
                  // Statistics – Crash Course Statistics #1
                  youtube_url: 'https://www.youtube.com/watch?v=sxQaBpKfDRk',
                  order_index: 1,
                  duration_seconds: 360,
                },
                {
                  title: 'Probability Basics',
                  description: 'Distributions, Bayes theorem, and sampling.',
                  // Bayes Theorem – 3Blue1Brown
                  youtube_url: 'https://www.youtube.com/watch?v=HZGCoVF3YvM',
                  order_index: 2,
                  duration_seconds: 420,
                },
              ],
            },
          },
          {
            title: 'Python for Data Science',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'NumPy & Pandas Intro',
                  description: 'Data manipulation and analysis.',
                  // Python NumPy Tutorial – freeCodeCamp (Keith Galli)
                  youtube_url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
                  order_index: 1,
                  duration_seconds: 480,
                },
                {
                  title: 'Building a Simple ML Model',
                  description: 'Linear regression with scikit-learn.',
                  // Machine Learning with Python – freeCodeCamp
                  youtube_url: 'https://www.youtube.com/watch?v=7eh4d6sabA0',
                  order_index: 2,
                  duration_seconds: 540,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 6: AI & Machine Learning ────────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Deep learning, neural networks, and real-world AI applications.',
      is_published: true,
      category: 'AI & ML',
      is_premium: true,
      price: 7999,
      level: 'Advanced',
      instructor: 'Sophia Williams',
      rating: 4.9,
      sections: {
        create: [
          {
            title: 'Neural Networks Basics',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Perceptron & Activation Functions',
                  description: 'Understanding the building blocks.',
                  // Neural Networks – 3Blue1Brown (But what is a neural network?)
                  youtube_url: 'https://www.youtube.com/watch?v=aircAruvnKk',
                  order_index: 1,
                  duration_seconds: 420,
                },
                {
                  title: 'Training a Simple Neural Network',
                  description: 'Backpropagation and gradient descent.',
                  // Backpropagation – 3Blue1Brown
                  youtube_url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
                  order_index: 2,
                  duration_seconds: 600,
                },
              ],
            },
          },
          {
            title: 'Advanced Topics',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Convolutional Neural Networks',
                  description: 'Image classification fundamentals.',
                  // CNNs Explained – deeplizard
                  youtube_url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs',
                  order_index: 1,
                  duration_seconds: 720,
                },
                {
                  title: 'Transformers & NLP',
                  description: 'Attention mechanisms and language models.',
                  // Transformers Explained – Google Cloud Tech
                  youtube_url: 'https://www.youtube.com/watch?v=SZorAJ4I-sA',
                  order_index: 2,
                  duration_seconds: 780,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 7: Security Best Practices ──────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Security Best Practices',
      slug: 'security-best-practices',
      description: 'Secure coding, OWASP top 10, and DevSecOps.',
      is_published: true,
      category: 'Security',
      is_premium: false,
      level: 'Intermediate',
      instructor: 'Ryan Miller',
      rating: 4.4,
      sections: {
        create: [
          {
            title: 'Secure Coding',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Input Validation & Sanitization',
                  description: 'Preventing injection attacks.',
                  // SQL Injection Explained – Computerphile
                  youtube_url: 'https://www.youtube.com/watch?v=ciNHn38EyRc',
                  order_index: 1,
                  duration_seconds: 300,
                },
                {
                  title: 'Authentication & Authorization',
                  description: 'OAuth2, JWT hardening, and session management.',
                  // JWT Authentication Tutorial – Web Dev Simplified
                  youtube_url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM',
                  order_index: 2,
                  duration_seconds: 480,
                },
              ],
            },
          },
          {
            title: 'DevSecOps',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Static Code Analysis',
                  description: 'Integrating security scans into CI.',
                  // DevSecOps Explained – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=nrhxNNH5lt0',
                  order_index: 1,
                  duration_seconds: 360,
                },
                {
                  title: 'Runtime Protection',
                  description: 'Container security and monitoring.',
                  // Docker Security Best Practices – TechWorld with Nana
                  youtube_url: 'https://www.youtube.com/watch?v=KINjI1tlo2w',
                  order_index: 2,
                  duration_seconds: 420,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 8: Performance Optimization ─────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Performance Optimization',
      slug: 'performance-optimization',
      description: 'Profiling, caching, and scaling web applications.',
      is_published: true,
      category: 'Web Dev',
      is_premium: false,
      level: 'Intermediate',
      instructor: 'Jessica Lee',
      rating: 4.3,
      sections: {
        create: [
          {
            title: 'Profiling & Benchmarking',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'Node.js Profiling Tools',
                  description: 'Using clinic, flamegraphs, and heap snapshots.',
                  // Node.js Performance – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=c4twikSs2Ws',
                  order_index: 1,
                  duration_seconds: 420,
                },
                {
                  title: 'Database Query Optimization',
                  description: 'Indexes, query plans, and connection pooling.',
                  // SQL Indexing and Tuning – Hussein Nasser
                  youtube_url: 'https://www.youtube.com/watch?v=BIlFTFrEFOI',
                  order_index: 2,
                  duration_seconds: 540,
                },
              ],
            },
          },
          {
            title: 'Caching Strategies',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Redis Basics',
                  description: 'In-memory caching and pub/sub.',
                  // Redis Crash Course – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ',
                  order_index: 1,
                  duration_seconds: 360,
                },
                {
                  title: 'CDN & Edge Caching',
                  description: 'Static asset delivery and cache invalidation.',
                  // CDN Explained – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=RI9np1LWzqw',
                  order_index: 2,
                  duration_seconds: 420,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 9: TypeScript Mastery ───────────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'TypeScript Mastery',
      slug: 'typescript-mastery',
      description: 'Go from JavaScript developer to TypeScript pro. Covers types, generics, decorators, and integrating TS with React and Node.',
      is_published: true,
      category: 'Web Dev',
      is_premium: false,
      level: 'Intermediate',
      instructor: 'Matt Harrison',
      rating: 4.7,
      sections: {
        create: [
          {
            title: 'TypeScript Fundamentals',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'TypeScript in 100 Seconds',
                  description: 'A lightning-fast overview of what TypeScript is and why it matters.',
                  // TypeScript in 100 Seconds – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA',
                  order_index: 1,
                  duration_seconds: 100,
                },
                {
                  title: 'TypeScript Crash Course',
                  description: 'Types, interfaces, generics, enums, and TypeScript with React.',
                  // TypeScript Crash Course – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=BCg4U1FzODs',
                  order_index: 2,
                  duration_seconds: 3120,
                },
              ],
            },
          },
          {
            title: 'Advanced TypeScript',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'TypeScript Generics Explained',
                  description: 'Write reusable, type-safe code with generics.',
                  // TypeScript Generics – Web Dev Simplified
                  youtube_url: 'https://www.youtube.com/watch?v=EcCTIExsqmI',
                  order_index: 1,
                  duration_seconds: 780,
                },
                {
                  title: 'TypeScript with Node.js & Express',
                  description: 'Build a fully typed REST API with Express and TypeScript.',
                  // Node.js & Express with TypeScript – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=H91aqUHn8sE',
                  order_index: 2,
                  duration_seconds: 2400,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 10: React Complete Guide ────────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'React – The Complete Guide',
      slug: 'react-complete-guide',
      description: 'Everything you need to know about React: hooks, context, React Query, and building production-ready apps.',
      is_published: true,
      category: 'Web Dev',
      is_premium: true,
      price: 4499,
      level: 'Beginner',
      instructor: 'Kevin Park',
      rating: 4.8,
      sections: {
        create: [
          {
            title: 'React Foundations',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'React JS Crash Course',
                  description: 'Components, props, state, and your first React app.',
                  // React JS Crash Course – Traversy Media (2024)
                  youtube_url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0',
                  order_index: 1,
                  duration_seconds: 4200,
                },
                {
                  title: 'React Hooks Deep Dive',
                  description: 'useState, useEffect, useRef, useContext, useMemo, and more.',
                  // React Hooks – Web Dev Simplified
                  youtube_url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
                  order_index: 2,
                  duration_seconds: 3600,
                },
              ],
            },
          },
          {
            title: 'State & Data Fetching',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'React Context & useReducer',
                  description: 'Global state management without Redux.',
                  // React Context API – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=XkBB3pPY3t8',
                  order_index: 1,
                  duration_seconds: 1800,
                },
                {
                  title: 'React Query (TanStack Query)',
                  description: 'Server state, caching, and async data made easy.',
                  // React Query Tutorial – The Net Ninja
                  youtube_url: 'https://www.youtube.com/watch?v=novnyCaa7To',
                  order_index: 2,
                  duration_seconds: 2100,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 11: GraphQL & Modern APIs ───────────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'GraphQL & Modern APIs',
      slug: 'graphql-modern-apis',
      description: 'Master GraphQL from schema design to Apollo Client. Build flexible, efficient APIs that your frontend will love.',
      is_published: true,
      category: 'Web Dev',
      is_premium: true,
      price: 3999,
      level: 'Intermediate',
      instructor: 'Priya Nair',
      rating: 4.6,
      sections: {
        create: [
          {
            title: 'GraphQL Basics',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'GraphQL Explained in 100 Seconds',
                  description: 'What GraphQL is and how it differs from REST.',
                  // GraphQL in 100 Seconds – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=eIQh02xuVw4',
                  order_index: 1,
                  duration_seconds: 100,
                },
                {
                  title: 'GraphQL Crash Course',
                  description: 'Schemas, queries, mutations, and resolvers with Node.js.',
                  // GraphQL Crash Course – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=PEcJxkylcRM',
                  order_index: 2,
                  duration_seconds: 3600,
                },
              ],
            },
          },
          {
            title: 'Apollo & Full-Stack GraphQL',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'Apollo Client with React',
                  description: 'Connecting a React frontend to a GraphQL API using Apollo.',
                  // Apollo Client Tutorial – The Net Ninja
                  youtube_url: 'https://www.youtube.com/watch?v=YyUWW04HwKY',
                  order_index: 1,
                  duration_seconds: 2700,
                },
                {
                  title: 'Full-Stack GraphQL App',
                  description: 'Build a complete app with Apollo Server, Prisma, and React.',
                  // Full Stack GraphQL – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=BNYwj0ZvU1U',
                  order_index: 2,
                  duration_seconds: 3000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Subject 12: Mobile Dev with React Native ─────────────────────────────
  await prisma.subject.create({
    data: {
      title: 'Mobile Development with React Native',
      slug: 'react-native-mobile',
      description: 'Build cross-platform iOS and Android apps using React Native and Expo. Ship real apps to the app store.',
      is_published: true,
      category: 'Mobile',
      is_premium: true,
      price: 5499,
      level: 'Intermediate',
      instructor: 'Carlos Mendes',
      rating: 4.7,
      sections: {
        create: [
          {
            title: 'Getting Started with React Native',
            order_index: 1,
            videos: {
              create: [
                {
                  title: 'React Native in 100 Seconds',
                  description: 'What React Native is and how Expo makes it easy.',
                  // React Native in 100 Seconds – Fireship
                  youtube_url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw',
                  order_index: 1,
                  duration_seconds: 100,
                },
                {
                  title: 'React Native Crash Course',
                  description: 'Core components, navigation, and styling with StyleSheet.',
                  // React Native Crash Course – Traversy Media
                  youtube_url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
                  order_index: 2,
                  duration_seconds: 4800,
                },
              ],
            },
          },
          {
            title: 'Building Real Features',
            order_index: 2,
            videos: {
              create: [
                {
                  title: 'React Navigation Deep Dive',
                  description: 'Stack, tab, and drawer navigators for multi-screen apps.',
                  // React Navigation Tutorial – The Net Ninja
                  youtube_url: 'https://www.youtube.com/watch?v=OmQCU-3KPms',
                  order_index: 1,
                  duration_seconds: 3000,
                },
                {
                  title: 'Fetching Data & AsyncStorage',
                  description: 'REST API calls, loading states, and offline data persistence.',
                  // React Native AsyncStorage – Academind
                  youtube_url: 'https://www.youtube.com/watch?v=PRGHWgTydyQ',
                  order_index: 2,
                  duration_seconds: 2400,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });