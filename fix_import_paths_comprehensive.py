#!/usr/bin/env python3
"""
Comprehensive script to fix import path issues in src/calculators/index.ts

This script:
1. Parses all import statements in the file
2. Checks if referenced paths exist in the filesystem
3. Attempts to fix paths by:
   - Normalizing naming conventions (removing extra 'Calculator' suffixes)
   - Finding similar directory names
   - Converting between naming conventions
4. Updates import paths to correct ones
5. Removes imports that reference completely non-existent calculators
6. Generates a detailed report of changes
"""

import os
import re
import difflib
from pathlib import Path
from typing import Dict, List, Tuple, Optional

class ImportFixer:
    def __init__(self, base_dir: str = 'src/calculators'):
        self.base_dir = Path(base_dir)
        self.existing_dirs = self._get_existing_dirs()
        self.report = {
            'fixed': [],
            'removed': [],
            'unchanged': [],
            'errors': []
        }

    def _get_existing_dirs(self) -> List[str]:
        """Get list of all existing calculator directories"""
        if not self.base_dir.exists():
            return []
        return [d.name for d in self.base_dir.iterdir() if d.is_dir()]

    def _normalize_path(self, path: str) -> str:
        """Normalize a path by removing extra 'Calculator' suffixes"""
        # Remove leading ./
        path = path.lstrip('./')

        # Split into directory and file
        parts = path.split('/')
        if len(parts) != 2:
            return path

        dir_name, file_name = parts

        # Normalize directory name
        dir_name = self._normalize_name(dir_name)

        # Normalize file name
        file_name = self._normalize_name(file_name)

        return f'./{dir_name}/{file_name}'

    def _normalize_name(self, name: str) -> str:
        """Remove extra 'Calculator' suffixes from a name"""
        while name.endswith('Calculator') and name.count('Calculator') > 1:
            name = name[:-10]  # Remove 'Calculator' (10 chars)
        return name

    def _find_similar_dir(self, dir_name: str) -> Optional[str]:
        """Find the most similar existing directory"""
        if dir_name in self.existing_dirs:
            return dir_name

        # Try normalizing first
        normalized = self._normalize_name(dir_name)
        if normalized in self.existing_dirs:
            return normalized

        # Find closest matches
        matches = difflib.get_close_matches(dir_name, self.existing_dirs, n=1, cutoff=0.6)
        if matches:
            return matches[0]

        # Try with normalized
        matches = difflib.get_close_matches(normalized, self.existing_dirs, n=1, cutoff=0.6)
        if matches:
            return matches[0]

        return None

    def _path_exists(self, path: str) -> bool:
        """Check if a path exists (with .ts extension or as index.ts)"""
        full_path = self.base_dir / path.lstrip('./')

        # Check for .ts file
        if full_path.with_suffix('.ts').exists():
            return True

        # Check for index.ts in directory
        if full_path.is_dir() and (full_path / 'index.ts').exists():
            return True

        return False

    def _fix_import_path(self, original_path: str) -> Optional[str]:
        """Try to fix an import path"""
        # First, try normalizing
        normalized = self._normalize_path(original_path)
        if self._path_exists(normalized):
            return normalized

        # Split and try fixing directory
        path = original_path.lstrip('./')
        parts = path.split('/')
        if len(parts) != 2:
            return None

        dir_name, file_name = parts

        # Try finding similar directory
        similar_dir = self._find_similar_dir(dir_name)
        if similar_dir:
            # Try with original file name
            candidate = f'./{similar_dir}/{file_name}'
            if self._path_exists(candidate):
                return candidate

            # Try with normalized file name
            normalized_file = self._normalize_name(file_name)
            candidate = f'./{similar_dir}/{normalized_file}'
            if self._path_exists(candidate):
                return candidate

            # Try with directory name as file base
            candidate = f'./{similar_dir}/{similar_dir}'
            if self._path_exists(candidate):
                return candidate

        return None

    def fix_imports(self, file_path: str) -> str:
        """Fix all imports in the file and return the updated content"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')
        fixed_lines = []
        import_pattern = re.compile(r'^(\s*)import\s+(.+?)\s+from\s+([\'"])(.+?)\3\s*;?\s*$')

        for line in lines:
            match = import_pattern.match(line)
            if match:
                indent, imports, quote, path = match.groups()
                fixed_path = self._fix_import_path(path)

                if fixed_path and fixed_path != path:
                    # Fixed
                    new_line = f"{indent}import {imports} from {quote}{fixed_path}{quote};"
                    fixed_lines.append(new_line)
                    self.report['fixed'].append({
                        'original': path,
                        'fixed': fixed_path,
                        'line': line.strip()
                    })
                elif fixed_path:
                    # Unchanged (already correct)
                    fixed_lines.append(line)
                    self.report['unchanged'].append(path)
                else:
                    # Could not fix - remove
                    self.report['removed'].append({
                        'path': path,
                        'line': line.strip()
                    })
                    # Skip this line
                    continue
            else:
                fixed_lines.append(line)

        return '\n'.join(fixed_lines)

    def generate_report(self) -> str:
        """Generate a detailed report of changes"""
        report_lines = []
        report_lines.append("# Import Path Fix Report")
        report_lines.append("")

        report_lines.append(f"## Summary")
        report_lines.append(f"- Fixed imports: {len(self.report['fixed'])}")
        report_lines.append(f"- Removed imports: {len(self.report['removed'])}")
        report_lines.append(f"- Unchanged imports: {len(self.report['unchanged'])}")
        report_lines.append(f"- Errors: {len(self.report['errors'])}")
        report_lines.append("")

        if self.report['fixed']:
            report_lines.append("## Fixed Imports")
            for item in self.report['fixed']:
                report_lines.append(f"- `{item['original']}` → `{item['fixed']}`")
                report_lines.append(f"  Original: {item['line']}")
            report_lines.append("")

        if self.report['removed']:
            report_lines.append("## Removed Imports")
            for item in self.report['removed']:
                report_lines.append(f"- `{item['path']}` (could not find correct path)")
                report_lines.append(f"  Line: {item['line']}")
            report_lines.append("")

        if self.report['errors']:
            report_lines.append("## Errors")
            for error in self.report['errors']:
                report_lines.append(f"- {error}")
            report_lines.append("")

        return '\n'.join(report_lines)

def main():
    fixer = ImportFixer()

    file_path = 'src/calculators/index.ts'
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return

    print("Analyzing imports...")
    fixed_content = fixer.fix_imports(file_path)

    print("Writing fixed file...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    print("Generating report...")
    report = fixer.generate_report()
    with open('import_fix_report.md', 'w', encoding='utf-8') as f:
        f.write(report)

    print("Done!")
    print(f"Report saved to import_fix_report.md")
    print(f"Fixed: {len(fixer.report['fixed'])}, Removed: {len(fixer.report['removed'])}, Unchanged: {len(fixer.report['unchanged'])}")

if __name__ == '__main__':
    main()