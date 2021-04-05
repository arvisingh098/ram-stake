import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";

type PoolPageHeaderProps = {
  userLpToken: BigNumber,
  userRamToken: BigNumber,
  userEarnedToken: BigNumber,
};

const PoolPageHeader = ({
  userLpToken, userRamToken, userEarnedToken
}: PoolPageHeaderProps) => (
  <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ flexBasis: '25%' }}>
      <TextBlock label="APY" text="Comming Soon"/>
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="Wallet Balance" balance={userLpToken} suffix={" RAM-WETH"}/>
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="RAM" balance={userRamToken} suffix={" RAM"} />
    </div>
    <div style={{ flexBasis: '25%' }}>
      <BalanceBlock asset="Earned Amount" balance={userEarnedToken}  suffix={" RAM"}/>
    </div>
  </div>
);


export default PoolPageHeader;
