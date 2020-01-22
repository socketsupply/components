#!/usr/bin/env bash
set -e

find . \
    -name 'test.js' \
    -not -path './node_modules/*' \
    -not -path './test/*' \
    -not -path './docs/*' |
    sed s/\.js// |
while read FILE; do
    if ! grep -q "require.*\.${FILE}" test/index.js ; then
        echo "Could not find $FILE" >&2
        exit 1
    fi
done

echo "All tests included!"
