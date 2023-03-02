# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL: ec2-54-214-208-163.us-west-2.compute.amazonaws.com  --- IP:54.214.208.163
2. SSH username: ec2-user
3. SSH key: team01KeyPair.pem (provided in the credentials folder)

4. Database URL: Mysql@54.214.208.163:3306 => ( Database IP (Hostname): 54.214.208.163 --- Port: 3306 )
5. Database username: team01
6. Database password: Team01Pass!
7. Database name: SFSUFFdb
 
8. Instructions: 
    We are in the process of deploying the app on the network without the need of SSH.
    In the meantime, the webpage of the app is viewable (via AWS Amplify) at:
    https://main.d3ptg0q31ychqv.amplifyapp.com/

    To connect to the database:
    There are otherways but this a simple way:
    In MySQL Workbench, create a new Connection using the + button.
    Using the given info above, Test and Create a new Connection:
        Hostname: 54.214.208.163
        Port: 3306
        Username: team01
        Password: (Press Store in Vault): Team01Pass!
    Press Test Connection, Then Ok.
    
    
    For Backend Devs:
    First, SSH into the EC2 instance, using gitbash (works the best)
    Save the team01KeyPair.pem in a folder, and cd into that folder (e.c Dektop/648)
    Then run the SSH command which is the key followed by the user@server URL:
        ssh -i "team01KeyPair.pem" ec2-user@ec2-54-214-208-163.us-west-2.compute.amazonaws.com
    
    This connect you to the EC2 instance with Amazon Linux 2
    ls to see if you have the project folder 'csc648-03...team01'
        It should already be there, if not, clone the project from github
    cd into server folder and run: node server.js, to display backend on:
        http://54.214.208.163:8080  Or  http://ec2-54-214-208-163.us-west-2.compute.amazonaws.com:8080/
    ctrl+c and cd into client, and npm start to see app on: 
        http://54.214.208.163:3000/
    
    use exit to end EC2 connection

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
