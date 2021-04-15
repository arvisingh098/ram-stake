import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import {
  getBalance, totalStakedFor, unstakeQuery, getTokenAllowance, apy,
} from '../../utils/infura';
import {UNI, TokenGeyser, RAM} from "../../constants/tokens";
import { toTokenUnitsBN } from '../../utils/number';

import AccountPageHeader from "./Header";
import WithdrawDeposit from "./WithdrawDeposit";
import IconHeader from "../common/IconHeader";

function Wallet({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const [userLpToken, setUserLpToken] = useState(new BigNumber(0));
  const [userStakedLpToken, setUserStakedLpToken] = useState(new BigNumber(0));
  const [userRamToken, setRamToken] = useState(new BigNumber(0));
  const [userEarnedToken, setEarnedToken] = useState(new BigNumber(0));
  const [apyPer, setApy] = useState(new BigNumber(0));
  const [userESDAllowance, setUserESDAllowance] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateAPY() {
      const [
        apyPercent,
      ] = await Promise.all([
        apy(),
      ]);

      if (!isCancelled) {
        setApy(new BigNumber(apyPercent));
      }
    }

    updateAPY();
    const id = setInterval(updateAPY, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  //Update User balances
  useEffect(() => {
    if (user === '') {
      setUserLpToken(new BigNumber(0));
      setUserStakedLpToken(new BigNumber(0));
      setRamToken(new BigNumber(0));
      setEarnedToken(new BigNumber(0));
      setUserESDAllowance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        lpTokens, stakedAmount, ramToken, earnedAmount, esdAllowance
      ] = await Promise.all([
        getBalance(UNI.addr, user),
        totalStakedFor(TokenGeyser.addr, user),
        getBalance(RAM.addr, user),
        unstakeQuery(TokenGeyser.addr, user),
        getTokenAllowance(UNI.addr, user, TokenGeyser.addr),
      ]);

      const userLpToken = toTokenUnitsBN(lpTokens, UNI.decimals);
      const userStakedLpToken = toTokenUnitsBN(stakedAmount, RAM.decimals);
      const userRamToken = toTokenUnitsBN(ramToken, RAM.decimals);
      const userEarnedToken = toTokenUnitsBN(earnedAmount, RAM.decimals);

      if (!isCancelled) {
        setUserLpToken(new BigNumber(userLpToken));
        setUserStakedLpToken(new BigNumber(userStakedLpToken));
        setRamToken(new BigNumber(userRamToken));
        setEarnedToken(new BigNumber(userEarnedToken));
        setUserESDAllowance(new BigNumber(esdAllowance));
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
      <IconHeader icon={<i className="fas fa-parachute-box"/>} text="Stake"/>

      <AccountPageHeader
        apyPer={apyPer}
        userLpToken={userLpToken}
        userRamToken={userRamToken}
        userEarnedToken={userEarnedToken}
      />

      <WithdrawDeposit
        user={user}
        balance={userLpToken}
        allowance={userESDAllowance}
        stagedBalance={userStakedLpToken}
      />
    </>
  );
}

export default Wallet;
