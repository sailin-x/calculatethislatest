#!/bin/bash

grep "from './" src/calculators/index.ts | sed "s/.*from '\.\///;s/'.*//" | while read path; do
  if [ ! -d "src/calculators/$path" ]; then
    echo "$path MISSING"
  fi
done
echo "Check complete. If no MISSING printed, all exist."