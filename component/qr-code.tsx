"use client";

import { BREAKPOINT_VALUES, getHostName } from "@/lib/constants";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export const PAGES = {
  upload: "upload",
} as const;

export default function QrCode({
  flyboothId,
  redirectTo,
}: Readonly<{
  flyboothId: string | null;
  redirectTo: keyof typeof PAGES;
}>) {
  const qrCodeSize = useBreakpointValue(BREAKPOINT_VALUES) || 1;
  const [hostName, setHostName] = useState("");

  useEffect(() => {
    setHostName(getHostName());
  }, []);

  return (
    <QRCode
      size={qrCodeSize * 100}
      value={`${hostName}/${flyboothId}/${redirectTo}`}
    />
  );
}
