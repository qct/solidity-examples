# init project

npm init

# basic

npm install --save-dev hardhat ts-node typescript @types/node ethers dotenv

# hardhat-deploy

npm install --save-dev @nomicfoundation/hardhat-ethers ethers hardhat-deploy hardhat-deploy-ethers


# test

npm install --save-dev chai @types/node @types/mocha @types/chai

# typechain

npm install --save-dev typechain @typechain/hardhat @typechain/ethers-v6 @nomiclabs/hardhat-solhint


# format

npm install --save-dev eslint prettier eslint-config-airbnb-typescript-prettier
echo -e "
module.exports = {
    extends: "airbnb-typescript-prettier"
};
" > .eslintrc1.js
