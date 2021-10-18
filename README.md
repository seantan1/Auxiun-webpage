# Auxiun Frontend Web page (React App)

## How to deploy
Clone this repository and within the directory, run:  
1. `npm install` - To install relevant module files
2. `npm run build` - To build the app as a static SPA, there will be a `build` folder located in the directory
  
Next, you can serve the `build` files using (PM2)[https://pm2.keymetrics.io/] by running the following command inside the `build` folder:  
`pm2 serve build 80 --spa --name "webpage"`
