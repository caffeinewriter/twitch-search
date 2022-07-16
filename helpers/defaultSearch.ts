export const getDefaultSearchTerm = (): string => {
  const terms = [
    'valheim',
    'charity',
    'giveaway',
    'gta rp',
  ];
  return terms[Math.floor(Math.random() * terms.length)];
}