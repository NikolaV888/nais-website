#!/bin/bash
cd "$(dirname "$0")/nais-website"

# Generate a random port between 3000 and 9999
RANDOM_PORT=$((RANDOM % 7000 + 3000))

echo "Starting Mr. Naisgai Website on port $RANDOM_PORT..."

# Attempt to open the browser after a short delay
(sleep 3 && open http://localhost:$RANDOM_PORT) &

# Start the dev server on the random port
PORT=$RANDOM_PORT npm run dev
