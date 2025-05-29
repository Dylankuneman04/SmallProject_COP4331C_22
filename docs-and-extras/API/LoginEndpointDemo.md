
# Login Endpoint Demonstration

1. https://app.swaggerhub.com/apis-docs/COP4331Team22/COP4331SimpleProject/1.0.0#/
2. Click on the /accounts/login.php endpoint
3. Click on "Try it out" on the far right of the page
4. Edit the JSON to {"Username": "Demo", "Password": ""}
5. Click execute
6. Observe that the response code is 400. We didn't send a password!
7. Edit the JSON to {"Username": "Demo", "Password": "Demoo"}
8. Click execute
9. Observe that the response code is 401. The username/password pair is incorrect!
10. Edit the JSON to {"Username": "Demo", "Password": "Demo"}
11. Click execute
12. Observe that the response code is 200. Login successful! It also returns the UserID.