# init project

npm init

# basic
npm install --save-dev hardhat ts-node typescript @types/node ethers dotenv

# hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-toolbox

# hardhat-deploy
npm install --save-dev @nomicfoundation/hardhat-ethers ethers hardhat-deploy hardhat-deploy-ethers

# hardhat-ignition-ethers
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers

# test
npm install --save-dev chai @types/node @types/mocha @types/chai

# typechain
npm install --save-dev typechain @typechain/hardhat @typechain/ethers-v6 @nomiclabs/hardhat-solhint --force

# format
npm install --save-dev eslint prettier eslint-config-airbnb-typescript-prettier
echo -e "
module.exports = {
    extends: "airbnb-typescript-prettier"
};
" > .eslintrc1.js


<!--  "@nomicfoundation/hardhat-ethers": "^3.0.6",
    "@nomiclabs/hardhat-solhint": "^3.1.0",
    "@typechain/ethers-v6": "^0.5.1",
    "@typechain/hardhat": "^9.1.0",
    "@types/chai": "^4.3.16",
    "@types/mocha": "^10.0.6",
    "@types/node": "^20.14.2",
    "chai": "^5.1.1",
    "dotenv": "^16.4.5",
    "eslint": "^8.57.0",
    "eslint-config-airbnb-typescript-prettier": "^5.0.0",
    "ethers": "^6.13.0",
    "hardhat": "^2.22.5",
    "hardhat-deploy": "^0.12.4",
    "hardhat-deploy-ethers": "^0.4.2",
    "prettier": "^3.3.2",
    "ts-node": "^10.9.2",
    "typechain": "^8.3.2",
    "typescript": "^5.4.5" -->