import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {approve, deposit} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {RAM, TokenGeyser, UNI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";

type WithdrawDepositProps = {
  user: string
  balance: BigNumber,
  allowance: BigNumber,
  stagedBalance: BigNumber
};

function WithdrawDeposit({
  user, balance, allowance, stagedBalance
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Stake">
      {allowance.comparedTo(MAX_UINT256) === 0 ?
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staked" balance={stagedBalance} suffix={"RAM"}/>
          </div>
          {/* Deposit RAM into Geyser */}
          <div style={{flexBasis: '50%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                <BigNumberInput
                    adornment="RAM"
                    value={depositAmount}
                    setter={setDepositAmount}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '6em'}}>
                <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Deposit"
                  onClick={() => {
                    deposit(
                      TokenGeyser.addr,
                      toBaseUnitBN(depositAmount, RAM.decimals),
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        :
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"RAM"}/>
          </div>
          <div style={{flexBasis: '35%'}}/>
          {/* Approve DAO to spend Døllar */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <Button
              wide
              icon={<IconCirclePlus />}
              label="Approve"
              onClick={() => {
                approve(UNI.addr, TokenGeyser.addr);
              }}
              disabled={user === ''}
            />
          </div>
        </div>
      }
    </Box>
  );
}

export default WithdrawDeposit;
