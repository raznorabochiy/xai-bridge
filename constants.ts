import { Network } from "./types";

export const KEYS_FILENAME = "keys.txt";

export const MIN_BRIDGE_IN_ETH = 0.05; // нужно настроить
export const MAX_BRIDGE_IN_ETH = 0.08; // нужно настроить

export const DELAY_FROM_SEC = 100; // нужно настроить
export const DELAY_TO_SEC = 200; // нужно настроить

export const BRIDGE_CONTRACT = "0x8b842ad88aaffd63d52ec54f6428fb7ff83060a8";
export const BRIDGE_ABI = [
  "function depositEth() payable returns (uint256)",
];

export const RPC_URL = {
  [Network.ARBITRUM_GOERLI]: "https://goerli-rollup.arbitrum.io/rpc",
  [Network.XAI]: "https://testnet.xai-chain.net/rpc",
};

export const TX_SCAN = {
  [Network.ARBITRUM_GOERLI]: "https://goerli.arbiscan.io/tx/",
  [Network.XAI]: "https://testnet-explorer.xai-chain.net/tx/",
};
