#!/bin/bash

# Variables
MAIN_REPO="https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/ws2425/group10-hexalayer.git"
FOLDER="frontend"
BRANCH="development"
TEMP_DIR="/tmp/frontend"
TARGET_REPO="https://github.com/mdhafizur/hexashield.git"
TARGET_BRANCH="main"
LIVE_REPO_DIR="/tmp/live-repo"

# Ensure script works from any directory
CURRENT_DIR=$(pwd)

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
    echo "Error: git-filter-repo is not installed. Please install it and try again."
    exit 1
fi

# Step 1: Clone the main repo into a temporary directory
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR
git clone --branch $BRANCH $MAIN_REPO $TEMP_DIR

if [ $? -ne 0 ]; then
    echo "Error: Failed to clone the main repository."
    exit 1
fi

cd $TEMP_DIR

# Step 2: Filter the frontend folder
git filter-repo --path $FOLDER --force

if [ $? -ne 0 ]; then
    echo "Error: Failed to filter the folder '$FOLDER'."
    exit 1
fi

# Step 3: Prepare the target directory as a clean folder
rm -rf $LIVE_REPO_DIR
mkdir -p $LIVE_REPO_DIR

# Step 4: Copy the filtered contents to the target repo
rsync -a --delete $TEMP_DIR/$FOLDER/ $LIVE_REPO_DIR/

if [ $? -ne 0 ]; then
    echo "Error: Failed to copy files to the target directory."
    exit 1
fi

# Step 5: Initialize a new Git repository in the target directory
cd $LIVE_REPO_DIR
git init

# Add the remote repository
git remote add origin $TARGET_REPO

# Set the branch name
git checkout -b $TARGET_BRANCH

# Step 6: Commit and push the changes
git add .
git commit -m "Sync frontend folder from main repository"

if [ $? -ne 0 ]; then
    echo "Error: Failed to commit changes to the target repository."
    exit 1
fi

# Attempt to fetch and integrate remote changes
git fetch origin $TARGET_BRANCH

if [ $? -eq 0 ]; then
    echo "Remote branch found. Attempting to pull and rebase."
    git pull origin $TARGET_BRANCH --rebase

    if [ $? -ne 0 ]; then
        echo "Error: Failed to rebase with the remote repository. Consider resolving conflicts manually."
        exit 1
    fi
else
    echo "No remote branch found. Proceeding with push."
fi

# Push the changes (force push if necessary)
git push -u origin $TARGET_BRANCH

if [ $? -ne 0 ]; then
    echo "Push failed. Attempting to force push."
    git push -u origin $TARGET_BRANCH --force

    if [ $? -ne 0 ]; then
        echo "Error: Failed to push changes to the target repository, even with force."
        exit 1
    fi
fi

# Clean up temporary directories
rm -rf $TEMP_DIR

# Return to the original directory
cd $CURRENT_DIR

echo "Success: The frontend folder from the main repository has been synced to the target repository."
