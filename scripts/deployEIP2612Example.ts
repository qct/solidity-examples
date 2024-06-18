import { assert } from "console";
import { ethers, network } from "hardhat";

const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};

async function main() {
  //   await network.provider.send("evm_setIntervalMining", [1000]);
  const [owner, spender] = await ethers.getSigners();

  const eip2612ExampleFactory = await ethers.getContractFactory("EIP2612Example");
  const eip2612Example = await eip2612ExampleFactory.deploy();
  await eip2612Example.waitForDeployment();
  const contractAddress = await eip2612Example.getAddress();
  console.log(`EIP2612Example was deployed to ${contractAddress} by ${owner.address}`);

  const { chainId } = await ethers.provider.getNetwork();
  const domain = {
    name: "EIP2612Example",
    version: "1",
    chainId: chainId,
    verifyingContract: contractAddress,
  };

  // get the current nonce for the deployer address
  const nonces = await eip2612Example.nonces(owner.address);
  const deadline = getTimestampInSeconds() + 4200;
  const permitValue = ethers.parseEther("0.1");
  const msg = {
    owner: owner.address,
    spender: spender.address,
    value: permitValue,
    nonce: nonces,
    deadline: deadline,
  };

  const signedTypedData = await owner.signTypedData(domain, types, msg);
  console.log("signedTypedData signature =>", signedTypedData);
  const signature = signedTypedData.substring(2);
  const r = "0x" + signature.substring(0, 64);
  const s = "0x" + signature.substring(64, 128);
  const v = parseInt(signature.substring(128, 130), 16);
  console.log("r: ", r);
  console.log("s: ", s);
  console.log("v: ", v);

  // verify the Permit type data with the signature
  const recovered = ethers.verifyTypedData(domain, types, msg, signedTypedData);
  console.log("recoverd address:", recovered);
  assert(recovered == owner.address, "recoverd address is not equal to owner's address!");

  // permit the tokenReceiver address to spend tokens on behalf of the tokenOwner
  await eip2612Example.connect(spender).permit(owner.address, spender.address, permitValue, deadline, v, r, s);

  // check that the tokenReceiver address can now spend tokens on behalf of the tokenOwner
  const allowance = await eip2612Example.allowance(owner.address, spender.address);
  console.log(`Check allowance of tokenReceiver: ${ethers.formatEther(allowance)} ether`);

  // transfer tokens from the tokenOwner to the tokenReceiver address
  await eip2612Example.connect(spender).transferFrom(owner.address, spender.address, permitValue);

  // Get ending balances
  const tokenOwnerBalance = (await eip2612Example.balanceOf(owner.address)).toString();
  const tokenReceiverBalance = (await eip2612Example.balanceOf(spender.address)).toString();
  console.log(`Ending tokenOwner balance: ${ethers.formatEther(tokenOwnerBalance)}`);
  console.log(`Ending tokenReceiver balance: ${ethers.formatEther(tokenReceiverBalance)}`);
}

function getTimestampInSeconds() {
  // returns current timestamp in seconds
  return Math.floor(Date.now() / 1000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
