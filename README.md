Due to size restrictions in git, please download the finetuned models, and save them to backend>src>savedModels.  These can be downloaded from one of the following: 

Zipped folder: The ‘savedModels’ folder has been included in the submitted zip folder 

Google Drive: https://drive.google.com/drive/folders/18bUtp8eGLH2r2fnww6y_rYTKDXx616_M?usp=drive_link 


One Drive: https://qmulprod-my.sharepoint.com/:f:/g/personal/ec20751_qmul_ac_uk/Eu37bWQO7p9CnLmvBM9owSIBJGJ21OB_dpJMLArG_xr_Gw?e=rOEkoS 



Then follow the instructions below.



Running locally
    Navigate to compliance-approval-portal/frontend
    Run npm install to install dependencies 
    Run npm start to start the front end

    Navigate back to compliance-approval-portal
    Deactivate any existing venv, by running deactivate
    Navigate to compliance-approval-portal/backend
    Run pipenv shell to activate the correct virtual environment
    Run  pip install -r requirements.txt to install dependencies 
    Run sh ./bootstrap.sh to start the backend

    Navigate to localhost:4200 (if you are logged in with google you will be auto logged in, if you would like to experience the signup/login process, please run in a window which is not logged in to google, such as by opening a guest window)
    Log in or create an account (for testing as an apprentice use an @qmul.ac.uk email)
    Interact with system as desired 

    Running deployed version
    Follow this link: http://compliance-approval-portal.s3-website.eu-north-1.amazonaws.com
    (if you are logged in with chrome you will be auto logged in, if you would like to experience the signup/login process, please run in a window which is not logged in, such as by opening a guest window)
    Log in or create an account (for testing as an apprentice use an @qmul.ac.uk email)
    Interact with system as desired 
    Please note: this deployment does not include the ability to generate an AI report, in order to do this please run locally