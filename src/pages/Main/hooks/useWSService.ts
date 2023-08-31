import { useEffect, useState, useRef } from "react";

import { WSService } from "../../../services/websocket";

const useWSService = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);

  const wsServiceRef = useRef<WSService>();

  useEffect(() => {
    wsServiceRef.current = new WSService(url, {
      onOpen: () => setIsConnected(true),
      onClose: () => setIsConnected(false),
      onError: () => setIsConnected(false),
    });

    return () => {
      wsServiceRef.current?.close();
    };
  }, [setIsConnected]);

  return {
    wsService: wsServiceRef.current,
    isConnected,
  };
};

export { useWSService };
