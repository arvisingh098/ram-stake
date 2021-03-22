import React, { useState, useEffect } from 'react';
import { LinkBase, Box } from '@aragon/ui';

import BigNumber from 'bignumber.js';
import { getTokenBalance } from '../../utils/infura';
import { toTokenUnitsBN } from '../../utils/number';

import TradePageHeader from './Header';
import {RAM, UNI} from "../../constants/tokens";
import IconHeader from "../common/IconHeader";


function UniswapPool({ user }: {user: string}) {
  const [pairBalanceRAM, setPairBalanceRAM] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        pairBalanceRAMStr, pairBalanceUSDCStr,
      ] = await Promise.all([
        getTokenBalance(RAM.addr, UNI.addr),
        getTokenBalance("0xd0a1e359811322d97991e03f863a0c30c2cf029c", UNI.addr),
      ]);

      if (!isCancelled) {
        setPairBalanceRAM(toTokenUnitsBN(pairBalanceRAMStr, RAM.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, RAM.decimals));
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <IconHeader icon={<i className="fas fa-exchange-alt"/>} text="Trade"/>

      <TradePageHeader
        pairBalanceRAM={pairBalanceRAM}
        pairBalanceWETH={pairBalanceUSDC}
        uniswapPair={UNI.addr}
      />

      <div style={{ padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flexBasis: '30%', marginRight: '3%', marginLeft: '2%'  }}>
          <MainButton
            title="Info"
            description="View RAM-WETH pool stats."
            icon={<i className="fas fa-chart-area"/>}
            href={"https://uniswap.info/pair/0x5f629df06573607097d3ebf7bb276f11c20b00de"}
          />
        </div>

        <div style={{ flexBasis: '30%' }}>
          <MainButton
            title="Trade"
            description="Trade RAM tokens."
            icon={<i className="fas fa-exchange-alt"/>}
            href={"https://uniswap.exchange/swap?inputCurrency=0xcAcc27EE067794cddA679464b185fE8FB8391c9a&outputCurrency=0xd0a1e359811322d97991e03f863a0c30c2cf029c"}
          />
        </div>

        <div style={{ flexBasis: '30%', marginLeft: '3%', marginRight: '2%' }}>
          <MainButton
            title="Supply"
            description="Supply and redeem liquidity."
            icon={<i className="fas fa-water"/>}
            href={"https://uniswap.exchange/add/0xcAcc27EE067794cddA679464b185fE8FB8391c9a/0xd0a1e359811322d97991e03f863a0c30c2cf029c"}
          />
        </div>
      </div>
    </>
  );
}

type MainButtonProps = {
  title: string,
  description: string,
  icon: any,
  href:string
}

function MainButton({
  title, description, icon, href,
}:MainButtonProps) {
  return (
    <LinkBase href={href} style={{ width: '100%' }}>
      <Box>
        <div style={{ padding: 10, fontSize: 18 }}>
          {title}
        </div>
        <span style={{ fontSize: 48 }}>
          {icon}
        </span>
        {/*<img alt="icon" style={{ padding: 10, height: 64 }} src={iconUrl} />*/}
        <div style={{ paddingTop: 5, opacity: 0.5 }}>
          {' '}
          {description}
          {' '}
        </div>

      </Box>
    </LinkBase>
  );
}

export default UniswapPool;
