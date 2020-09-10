# SweatBank.io

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Deploys the `build` forlder to S3.

## Getting Started

### Install Yarn

The following link outlines options to [install yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

I used the homebrew option. If you do not have Homebrew installed, follow the steps [here](https://brew.sh/).

## Deploying Code to sweatbank.io

The process to deploy code is to execute:

```bash
yarn build && yarn deploy
```

The effects of each of those commands is documented above. The deploy script requires credentials to our SweatBank AWS account. [Here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds) is a tutorial outlining how to configure your computer so have permissions to execute the deploy script.
