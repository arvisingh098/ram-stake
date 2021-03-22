import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock, AddressBlock } from '../common/index';

type TradePageHeaderProps = {
  pairBalanceRAM: BigNumber,
  pairBalanceWETH: BigNumber,
  uniswapPair: string,
};

const TradePageHeader = ({
  pairBalanceRAM, pairBalanceWETH, uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceWETH.dividedBy(pairBalanceRAM);

  return (
    <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="RAM Price" balance={price} suffix={"WETH"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="RAM Liquidity" balance={pairBalanceRAM} suffix={"RAM"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="WETH Liquidity" balance={pairBalanceWETH} suffix={"WETH"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <>
          <AddressBlock label="Uniswap Contract" address={uniswapPair} />
        </>
      </div>
    </div>
  );
}


export default TradePageHeader;
