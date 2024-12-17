export const mockProspects = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'TechCorp',
    position: 'Head of Marketing',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    email: 'sarah.j@techcorp.com',
    icpScore: 92,
    timingScore: 78,
    linkedinHandle: 'sarahjohnson',
    companyLinkedinHandle: 'techcorp',
    companyWebsite: 'https://techcorp.com',
    tags: [
      { type: 'intro-paths', label: '2 intro paths found' },
      { type: 'event', label: 'Attending AI Summit 2024' }
    ],
    introPaths: [
      {
        id: '1',
        connector: {
          id: 'c1',
          name: 'Alex Thompson',
          position: 'CTO',
          company: 'TechGrowth',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          connectionStrength: 85
        },
        strength: 85,
        path: []
      },
      {
        id: '2',
        connector: {
          id: 'c2',
          name: 'Lisa Chen',
          position: 'VP Engineering',
          company: 'DataFlow',
          profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
          connectionStrength: 92
        },
        strength: 92,
        path: []
      }
    ]
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    company: 'InnovateLabs',
    position: 'CTO',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    email: 'm.chen@innovatelabs.com',
    icpScore: 88,
    timingScore: 95,
    linkedinHandle: 'michaelchen',
    companyLinkedinHandle: 'innovatelabs',
    companyWebsite: 'https://innovatelabs.com',
    tags: [
      { type: 'intro-paths', label: '1 intro path found' },
      { type: 'competitor', label: 'Uses CompeteAI' }
    ],
    introPaths: [
      {
        id: '3',
        connector: {
          id: 'c1',
          name: 'Alex Thompson',
          position: 'CTO',
          company: 'TechGrowth',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          connectionStrength: 85
        },
        strength: 88,
        path: []
      }
    ]
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Wilson',
    company: 'GrowthStart',
    position: 'CEO',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    email: 'emma@growthstart.io',
    icpScore: 95,
    timingScore: 82,
    linkedinHandle: 'emmawilson',
    tags: [
      { type: 'lookalike', label: 'Similar to TechCorp' }
    ]
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Park',
    company: 'AIScale',
    position: 'VP Engineering',
    profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    email: 'd.park@aiscale.com',
    icpScore: 90,
    timingScore: 88,
    linkedinHandle: 'davidpark',
    tags: [
      { type: 'event', label: 'Speaking at DevCon 2024' },
      { type: 'competitor', label: 'Former MLOps Pro user' }
    ]
  },
  {
    id: '5',
    firstName: 'Rachel',
    lastName: 'Martinez',
    company: 'DataFlow',
    position: 'Head of AI',
    profilePicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    email: 'rachel.m@dataflow.io',
    icpScore: 87,
    timingScore: 92,
    linkedinHandle: 'rachelmartinez',
    tags: [
      { type: 'lookalike', label: 'Similar to InnovateLabs' },
      { type: 'event', label: 'Attending AI Summit 2024' }
    ]
  }
];