set -e
find . -type f -name "*.js" -not -path "*node_modules*" -not -path "*dist*" | xargs npx eslint
npx jest