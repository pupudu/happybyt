#!/bin/bash
# Stops accidental commits and pushes to master and develop. https://gist.github.com/stefansundin/9059706

# Font-Weights
BOLD=$(tput bold)
REGULAR=$(tput sgr0)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0;0m'

# Variables
BRANCH=`git rev-parse --abbrev-ref HEAD`

if [[ "$BRANCH" == "release/"* ||  "$BRANCH" == "master" || "$BRANCH" == "develop" ]]; then
	printf "${RED}\n\nYou are on branch ${BOLD}$BRANCH${REGULAR}. ${BLUE}Are you sure you want to commit to this branch?"
	printf "${NC}\nIf so, commit with -n to bypass this pre-commit hook.\n\n"
	exit 1
fi

exit 0