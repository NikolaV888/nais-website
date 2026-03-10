#!/bin/bash
cd "$(dirname "$0")"

# Generate a random port between 3000 and 9999
RANDOM_PORT=$((RANDOM % 7000 + 3000))

echo "🎵 Starting Mr. Naisgai Website Server..."
echo "Opening http://localhost:$RANDOM_PORT"

# Check if python3 is available
if command -v python3 &>/dev/null; then
    # Open browser after a slight delay to ensure server is up
    (sleep 1 && open "http://localhost:$RANDOM_PORT") &
    python3 -m http.server $RANDOM_PORT
else
    echo "Python3 not found. Trying to open file directly (API might not work)..."
    open index.html
fi
