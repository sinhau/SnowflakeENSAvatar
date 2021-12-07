require("dotenv").config();

const RINKEBY_API_URL = process.env.RINKEBY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(RINKEBY_API_URL);

const contract = require("../artifacts/contracts/AvatarForENS.sol/AvatarForENS.json");

const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function getTokenArt(tokenID) {
  const resp = await nftContract.methods.getArt(tokenID).call();
  console.log(resp);
}

getTokenArt(2);