# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL: http://ec2-35-160-127-228.us-west-2.compute.amazonaws.com  --- IP: 35.160.127.228
2. SSH username: ec2-user
3. SSH key: team01KeyPair.pem (provided in the credentials folder)

4. Database URL: Mysql@35.160.127.228:3306 => ( Database IP (Hostname): 35.160.127.228 --- Port: 3306 )
5. Database username: team01
6. Database password: Team01Pass!
7. Database name: SFSUFFdb
 
8. Instructions: 
    To the the following URL to visit the frontend website

    To connect to the database:<br>
    There are otherways but this a simple way:<br>
    In MySQL Workbench, create a new Connection using the + button.<br>
    Using the given info above, Test and Create a new Connection:<br>
        Hostname: 35.160.127.228  <br>
        Port: 3306  <br>
        Username: team01  <br>
        Password: (Press Store in Vault): Team01Pass!  <br>
    Press Test Connection, Then Ok.  <br>
    <br>
    <br>
    For Backend Devs: <br>
    First, SSH into the EC2 instance, using gitbash (works the best) <br>
    Save the team01KeyPair.pem in a folder, and cd into that folder (e.c Dektop/648) <br>
    Then run the SSH command which is the key followed by the user@server URL: <br>
        ssh -i "team01KeyPair.pem" ec2-user@ec2-35-160-127-228.us-west-2.compute.amazonaws.com <br>
    <br>
    This connect you to the EC2 instance with Amazon Linux 2 <br>
    cd into 'csc648-03...team01' directory, then cd application/server <br>
    pm2 logs to show if server is running, if not: pm2 start server.js <br>
    <br>
    use 'exit' to end EC2 connection <br>

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
