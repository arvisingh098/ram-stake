import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {unStake} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {TokenGeyser, UNI} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";

type WithdrawDepositProps = {
  userStakedLpToken: BigNumber
  user: string
};

function WithdrawDeposit({
  userStakedLpToken
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Stage">
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={userStakedLpToken} suffix={"UNI-V2"}/>
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{flexBasis: '50%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={false}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(userStakedLpToken);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Withdraw"
                  onClick={() => {
                    unStake(
                      TokenGeyser.addr,
                      toBaseUnitBN(userStakedLpToken, UNI.decimals),
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  }}
                  disabled={TokenGeyser.addr === '' || !isPos(depositAmount)}
                />
              </div>
            </div>
          </div>
        </div>
    </Box>
  );
}

export default WithdrawDeposit;
