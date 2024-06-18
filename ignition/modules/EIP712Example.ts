import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

export default buildModule("EIP712Example", (m) => {
  const eip712Example = m.contract("EIP712Example", []);

  return { eip712Example };
});
