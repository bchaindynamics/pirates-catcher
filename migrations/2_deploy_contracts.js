const PiratesCatcher = artifacts.require("PiratesCatcher");

module.exports = function(deployer) {
  deployer.deploy(PiratesCatcher);
};
