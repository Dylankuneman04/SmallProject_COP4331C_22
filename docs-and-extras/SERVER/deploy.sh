# The following commands clones the GitHub repository into /var/www/html
cd /var/www/html
rm -rf *
rm -rf .git
git clone https://github.com/Dylankuneman04/SmallProject_COP4331C_22.git . & wa>

# The followinge commands deletes files that are in the repository
# but that we don't necessarily want on the server
rm -rf docs-and-extras
rm -f .gitignore
rm -f README.md