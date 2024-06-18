import { ethers } from "hardhat";

const types = {
  ExampleMessage: [
    { name: "message", type: "string" },
    { name: "value", type: "uint256" },
    { name: "from", type: "address" },
    { name: "to", type: "address" },
  ],
};

async function main() {
  const [owner] = await ethers.getSigners();

  const contractName = "EIP712Example";
  const contractVersion = "1";
  const eip712ExampleFactory = await ethers.getContractFactory("EIP712Example");
  const eip712Example = await eip712ExampleFactory.deploy(contractName, contractVersion);
  await eip712Example.waitForDeployment();
  const contractAddress = await eip712Example.getAddress();
  console.log(`EIP712Example was deployed to ${contractAddress} by ${owner.address}`);

  const { chainId } = await ethers.provider.getNetwork();
  const domain = {
    name: contractName,
    version: contractVersion,
    chainId: chainId,
    verifyingContract: contractAddress,
  };
  const msg = {
    message: "Test message",
    value: 10000,
    from: owner.address,
    to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  };
  console.log("signTypedData parameters:");
  console.log("domain:", domain);
  console.log("types:", types);
  console.log("msg:", msg);

  const signedTypedData = await owner.signTypedData(domain, types, msg);
  console.log("signedTypedData signature =>", signedTypedData);
  const signature = signedTypedData.substring(2);
  const r = "0x" + signature.substring(0, 64);
  const s = "0x" + signature.substring(64, 128);
  const v = parseInt(signature.substring(128, 130), 16);
  console.log("r: ", r);
  console.log("s: ", s);
  console.log("v: ", v);

  const verifyResult = await eip712Example.verifyMessageV4(msg, v, r, s);
  console.log("verify result: ", verifyResult);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
