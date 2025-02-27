const VERSION_TYPES = {
  MAJOR: 'major',
  MINOR: 'minor',
  PATCH: 'patch',
  NONE: false,
};

const emojiRules = [
  {
    emoji: '💥',
    description: 'Mudanças que quebram compatibilidade',
    release: VERSION_TYPES.MAJOR,
  },
  {
    emoji: '✨',
    description: 'Novas funcionalidades',
    release: VERSION_TYPES.MINOR,
  },
  {
    emoji: '🐛',
    description: 'Correção de bugs',
    release: VERSION_TYPES.PATCH,
  },
  { emoji: '🚑', description: 'Hotfix crítico', release: VERSION_TYPES.MINOR },
  {
    emoji: '🔒',
    description: 'Correções de segurança',
    release: VERSION_TYPES.MINOR,
  },
  {
    emoji: '⚡️',
    description: 'Melhorias de performance',
    release: VERSION_TYPES.MINOR,
  },
  {
    emoji: '📦',
    description: 'Atualização de dependências',
    release: VERSION_TYPES.PATCH,
  },
  {
    emoji: '♻️',
    description: 'Refatoração de código',
    release: VERSION_TYPES.MINOR,
  },
  {
    emoji: '📝',
    description: 'Atualizações de documentação',
    release: VERSION_TYPES.PATCH,
  },
  {
    emoji: '🚀',
    description: 'Lançamentos ou deploy',
    release: VERSION_TYPES.NONE,
  },
  { emoji: '🎉', description: 'Commit inicial', release: VERSION_TYPES.NONE },
];

export default emojiRules;
