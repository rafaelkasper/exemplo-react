import dateFormat from 'dateformat';
import { readFile } from 'fs/promises'; // Usando fs/promises para leitura de arquivos
// Importa as regras de emojis
import commitRules from './.semantic-release/commitRules.js';

// Caminho para os templates Handlebars
const TEMPLATE_DIR = '.semantic-release/templates';

// Carrega os templates de forma assíncrona
const loadTemplates = async () => {
  const [template, commitTemplate] = await Promise.all([
    readFile(`${TEMPLATE_DIR}/default-template.hbs`, 'utf8'),
    readFile(`${TEMPLATE_DIR}/commit-template.hbs`, 'utf8'),
  ]);
  return { template, commitTemplate };
};

// Configuração principal do semantic-release
export default async () => {
  const { template, commitTemplate } = await loadTemplates();

  return {
    branches: ['main'],
    repositoryUrl: 'https://github.com/rafaelkasper/exemplo-react.git',
    plugins: [
      [
        'semantic-release-gitmoji',
        {
          releaseRules: {
            major: commitRules
              .filter((rule) => rule.release === 'major')
              .map((rule) => rule.emoji),
            minor: commitRules
              .filter((rule) => rule.release === 'minor')
              .map((rule) => rule.emoji),
            patch: commitRules
              .filter((rule) => rule.release === 'patch')
              .map((rule) => rule.emoji),
          },
          releaseNotes: {
            template,
            partials: { commitTemplate },
            helpers: {
              datetime: (format = 'UTC:dd-mm-yyyy') =>
                dateFormat(new Date(), format),
              or: (...args) => args.slice(0, -1).some(Boolean),
            },
          },
        },
      ],
      [
        '@semantic-release/changelog',
        {
          changelogFile: 'CHANGELOG.md',
        },
      ],
      '@semantic-release/npm',
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json'],
          message: '🔖 Versão ${nextRelease.version}\n\n${nextRelease.notes}',
        },
      ],
      '@semantic-release/github',
    ],
  };
};
