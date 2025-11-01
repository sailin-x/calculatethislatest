const fs = require('fs');

const content = fs.readFileSync('src/calculators/index.ts', 'utf8');

const lines = content.split('\n');

const newLines = lines.map(line => {
  if (line.includes('import') && line.includes('as')) {
    const match = line.match(/import \{ ([^}]+) \} from '([^']+)';/);
    if (match) {
      const fullImport = match[1];
      const path = match[2];
      const parts = fullImport.split(' as ');
      if (parts.length === 2) {
        const importedName = parts[0];
        const alias = parts[1];
        if (alias.includes('_')) {
          const camelAlias = alias.replace(/_([a-z])/g, (m, p1) => p1.toUpperCase());
          return `import { ${importedName} as ${camelAlias} } from '${path}';`;
        }
      }
    }
  }
  return line;
});

fs.writeFileSync('src/calculators/index.ts', newLines.join('\n'));