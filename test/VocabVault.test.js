import { expect } from "chai";
import hre from "hardhat";

describe("VocabVault", function () {
  it("Devrait ajouter un mot et le lire correctement", async function () {
    const { ethers } = hre;
    const VocabVault = await ethers.getContractFactory("VocabVault");
    const vocabVault = await VocabVault.deploy();
    await vocabVault.waitForDeployment();

    const address = await vocabVault.getAddress();
    console.log(`\n    ?? Contrat déployé à : ${address}`);

    const tx = await vocabVault.addWord("Hello", "Bonjour");
    await tx.wait();

    const total = await vocabVault.getTotalWords();
    expect(total).to.equal(1n);

    const firstWord = await vocabVault.words(0);
    console.log(`    ?? Mot enregistré : ${firstWord.word} -> ${firstWord.translation}\n`);

    expect(firstWord.word).to.equal("Hello");
    expect(firstWord.translation).to.equal("Bonjour");
  });
});
