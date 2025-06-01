# The following commands clones the GitHub repository into /var/www/html
cd /var/www/html
rm -rf .git
rm -rf *
git clone https://github.com/Dylankuneman04/SmallProject_COP4331C_22.git . & wa>

# The followinge commands deletes files that are in the repository
# but that we don't want on the server
rm -rf .git
rm -f api/DATABASE.md
rm -f .gitignore
rm -f README.md
rm -rf docs-and-extras