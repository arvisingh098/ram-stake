import React, { useEffect, useState } from "react";

import {
  Button,
  IdentityBadge,
  IconConnect,
  Box,
  IconPower,
  LinkBase,
  LoadingRing,
} from "@aragon/ui";

import { connect, connectedNetworkType } from "../../utils/web3";

type connectButtonProps = {
  hasWeb3: boolean;
  user: string;
  setUser: Function;
};

function ConnectButton({ hasWeb3, user, setUser }: connectButtonProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectedLoading, setIsConnectedLoading] = useState(true);
  const [validNetworkSelected, setvalidNetworkSelected] = useState(true);

  useEffect(() => {
    async function checkUserLoggedIn() {
      const address = await connect();
      if (address === false) return;
      const allowedNetworkType = await connectedNetworkType();
      setIsConnected(true);
      setIsConnectedLoading(false);
      setUser(address);
      if(allowedNetworkType === false) {
        setvalidNetworkSelected(false);
      }
    }
    checkUserLoggedIn();
  }, []);

  const connectWeb3 = async () => {
    const address = await connect();
    if (address === false) return;
    setIsConnected(true);
    setIsConnectedLoading(false);
    setUser(address);
  };

  const disconnectWeb3 = async () => {
    setIsConnected(false);
    setUser("");
  };

  return isConnected && !isConnectedLoading ? (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }} />
      <div style={{ opacity: (!validNetworkSelected) ? 0.4 : 1 }}>
        <Box padding={4} style={{ width: "192px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <LinkBase
                onClick={disconnectWeb3}
                style={{ marginRight: "8px", height: "24px" }}
              >
                <IconPower />
              </LinkBase>
            </div>
            <div style={{ flex: "1", textAlign: "right" }}>
              <IdentityBadge entity={user} />
            </div>
          </div>
        </Box>
      </div>
    </div>
  ) : isConnectedLoading ? (
    <LoadingRing />
  ) : (
    <Button
      style={{ backgroundColor: "#00aab0", color: "#fff" }}
      icon={<IconConnect style={{ color: "#fff" }} />}
      label="Connect"
      onClick={connectWeb3}
      disabled={!hasWeb3}
    />
  );
}

export default ConnectButton;