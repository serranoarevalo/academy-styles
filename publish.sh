yarn run build
git add .
git commit -m "Publish"
git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master
git push origin master