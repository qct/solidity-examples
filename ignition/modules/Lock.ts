import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

export default buildModule("Lock", (m) => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 20;
  const lockedAmount = ethers.parseEther("0.001");

  const lock = m.contract("Lock", [unlockTime], { value: lockedAmount });

  m.call(lock, "sayHello", []);

  return { lock };
});
