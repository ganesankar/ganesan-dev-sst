
# ganesan-dev-sst [(link)](https://www.ganesan.dev) 


## Local Development
To run a local development server, please ensure you have at least Node.js version 20 installed and added to your PATH.

1. Install dependencies:

    ```
    npm install
    ```

2. Run the SST development instance and wait for completion:

    ```
    npx sst dev
    ```

3. Next, in a duplicate command window, run:

    ```
    npm run dev
    ```

## Deployment
To deploy the application, ensure you have at least Node.js version 20 installed and added to your PATH. This step also requires the AWS CLI to be configured with sufficient IAM permissions.

1. Install dependencies:

    ```
    npm install
    ```

2. Run SST deploy with stage prod:

    ```
    npx sst deploy --stage prod
    ```



## Remove
Remove app and all their resources from AWS

1. Remove entire app for the current stage:

    ```
    npx sst remove
    ```

2. Remove it for a specific stage:

    ```
    npx sst remove --stage dev
    ```