export const getTagColor = (type: string) => {
  switch (type) {
    case 'intro-paths':
      return 'bg-blue-100 text-blue-800';
    case 'event':
      return 'bg-purple-100 text-purple-800';
    case 'competitor':
      return 'bg-orange-100 text-orange-800';
    case 'lookalike':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};