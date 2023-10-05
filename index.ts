import cli from "cli";
import random from "lodash/random";
import round from "lodash/round";
import { Contract, formatEther, parseEther, Wallet } from "ethers";
import {
  delayProgress,
  getBalance,
  getTxLink,
  loadKeys,
  providers,
} from "./utils";
import {
  BRIDGE_ABI,
  BRIDGE_CONTRACT,
  DELAY_FROM_SEC,
  DELAY_TO_SEC,
  MAX_BRIDGE_IN_ETH,
  MIN_BRIDGE_IN_ETH,
} from "./constants";
import { Network } from "./types";

const keys = await loadKeys();

async function bridge(key: string): Promise<boolean> {
  const provider = providers.get(Network.ARBITRUM_GOERLI);
  const wallet = new Wallet(key, provider);
  const contract = new Contract(BRIDGE_CONTRACT, BRIDGE_ABI, wallet);

  const randomAmount = round(random(MIN_BRIDGE_IN_ETH, MAX_BRIDGE_IN_ETH), 3);
  const value = parseEther(randomAmount.toString());

  try {
    cli.spinner(`Бриджим ${randomAmount} eth`);

    const gasLimit = await contract.depositEth.estimateGas({
      value,
    });

    const { maxFeePerGas, maxPriorityFeePerGas } = await provider
      .getFeeData();

    const tx = await contract.depositEth({
      value,
      maxFeePerGas,
      maxPriorityFeePerGas,
      gasLimit,
    });

    await provider.waitForTransaction(tx.hash);

    cli.spinner(getTxLink(Network.ARBITRUM_GOERLI, tx.hash), true);

    cli.spinner("", true);
    return true;
  } catch (_) {
    console.log(_);
    cli.spinner("", true);
    return false;
  }
}

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const count = i + 1;
  const { length } = keys;
  const last = i === keys.length - 1;
  const { address } = new Wallet(key);

  console.log(`${count}/${length} address: ${address}`);

  try {
    const arbGoerliEthBalance = await getBalance(
      Network.ARBITRUM_GOERLI,
      address,
    );

    if (arbGoerliEthBalance < parseEther(MAX_BRIDGE_IN_ETH.toString())) {
      console.log(
        `ETH в сети ${Network.ARBITRUM_GOERLI} баланс: ${
          formatEther(arbGoerliEthBalance)
        }, меньше чем ${MAX_BRIDGE_IN_ETH}`,
      );
      continue;
    }

    const xaiEthBalance = await getBalance(
      Network.XAI,
      address,
    );

    if (xaiEthBalance === 0n) {
      console.log(`Нет ETH в сети ${Network.XAI}`);
      console.log(`Делаем бридж из ${Network.ARBITRUM_GOERLI}`);
      const result = await bridge(key);

      if (!result) {
        console.log("Ошибка бриджа");
        continue;
      }
    } else {
      console.log(
        `В сети ${Network.XAI} уже есть ${
          formatEther(arbGoerliEthBalance)
        } ETH`,
      );
    }
  } catch (e) {
    cli.spinner("", true);
    console.log("Error", e);
  }

  if (!last) {
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }
}
