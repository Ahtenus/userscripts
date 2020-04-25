#!/bin/bash
changedFiles=$(git status --porcelain | awk 'BEGIN { ORS=" " }; { print $2 }')
version=1.$(date +"%Y%m%d.%H%M%S")
sed -i '' "/.*version.*/s/1\.[0-9]*\.[0-9]*/$version/g" $changedFiles

git commit -am "Updated $changedFiles"
git push
