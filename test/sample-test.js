const { expect } = require("chai");

describe("Vault", function () {
  it("Should unlock Vault", async function () {

    const [deployer, hacker] = await ethers.getSigners();
    
    const password = 'Very strong password'
    const password_enc = ethers.utils.formatBytes32String(password);

    const Vault = await ethers.getContractFactory("Vault", deployer);
    const vault = await Vault.deploy(password_enc);
    await vault.deployed();

    const bytes_storage = await ethers.provider.getStorageAt(vault.address, 1);

    await vault.connect(hacker).unlock(bytes_storage);

    expect(await vault.locked()).to.be.false;


  });
});
