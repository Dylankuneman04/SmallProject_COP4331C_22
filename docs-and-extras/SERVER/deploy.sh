# The following commands clones the Github repository into /var/www/html
cd /var/www/html
rm -rf *
git clone https://github.com/Dylankuneman04/SmallProject_COP4331C_22.git . & wa>

# The followinge commands deletes files that are in the repository
# but that we don't want on the server (this may need to be tweaked
# as we work on the project)
rm -rf .git
rm -f api/DATABASE.md
rm -f .gitignore
rm -f README.md
rm -rf docs-and-extras