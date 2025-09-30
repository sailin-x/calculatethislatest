#!/usr/bin/env python3

import os
import shutil
from collections import defaultdict

def consolidate_duplicates():
    """Consolidate duplicate calculator directories by keeping the most appropriate version"""

    # Find all calculator directories
    calculator_dirs = []
    for root, dirs, files in os.walk('src/calculators'):
        for dir_name in dirs:
            if dir_name.endswith('-calculator'):
                calculator_dirs.append(os.path.join(root, dir_name))

    # Group by calculator name
    duplicates = defaultdict(list)
    for calc_dir in calculator_dirs:
        calc_name = os.path.basename(calc_dir)
        duplicates[calc_name].append(calc_dir)

    # Find duplicates (more than one instance)
    duplicate_groups = {name: paths for name, paths in duplicates.items() if len(paths) > 1}

    print(f"Found {len(duplicate_groups)} calculator names with duplicates")
    print(f"Total duplicate directories: {sum(len(paths) for paths in duplicate_groups.values())}")

    # Priority order for keeping calculators (most to least preferred)
    priority_order = [
        'finance',      # Finance calculators first
        'business',     # Business calculators second
        'legal',        # Legal calculators third
        'health',       # Health calculators fourth
        'construction', # Construction calculators fifth
        'math',         # Math calculators sixth
        'lifestyle'     # Lifestyle calculators last
    ]

    def get_priority(path):
        """Get priority score for a calculator path (lower is better)"""
        for i, category in enumerate(priority_order):
            if f'/{category}/' in path:
                return i
        return len(priority_order)  # Lowest priority for unknown categories

    consolidated = 0
    kept = 0

    for calc_name, paths in duplicate_groups.items():
        # Sort by priority (keep the highest priority one)
        sorted_paths = sorted(paths, key=get_priority)

        # Keep the first (highest priority) one
        keep_path = sorted_paths[0]
        remove_paths = sorted_paths[1:]

        print(f"\n🔄 Consolidating {calc_name}:")
        print(f"  ✅ KEEP: {keep_path}")
        for remove_path in remove_paths:
            print(f"  🗑️  REMOVE: {remove_path}")
            try:
                shutil.rmtree(remove_path)
                consolidated += 1
            except Exception as e:
                print(f"    ❌ Error removing {remove_path}: {e}")

        kept += 1

    print("\n📊 CONSOLIDATION SUMMARY:")
    print(f"  ✅ Kept {kept} unique calculators")
    print(f"  🗑️  Removed {consolidated} duplicate directories")
    print(f"  📁 Total directories remaining: {len(calculator_dirs) - consolidated}")

if __name__ == "__main__":
    consolidate_duplicates()