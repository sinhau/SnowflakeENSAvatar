require("dotenv").config();

const RINKEBY_API_URL = process.env.RINKEBY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { base64 } = require("ethers/lib/utils");
const web3 = createAlchemyWeb3(RINKEBY_API_URL);

const contract = require("../artifacts/contracts/AvatarForENS.sol/AvatarForENS.json");

const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function getTokenURI(tokenID) {
  const resp = await nftContract.methods.tokenURI(tokenID).call();
  const json = Buffer.from(resp.substring(29), "base64").toString();
  const result = JSON.parse(json);
  console.log(result);
  const image = Buffer.from(result.image.substring(25), "base64").toString();
  console.log(image);
}

var tokenID = process.argv[2];
console.log('TokenID used is: ', tokenID);
getTokenURI(tokenID);