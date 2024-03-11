"use client";

import { formatTime } from "@/lib/date";
import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState<Date>();

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return formatTime(time?.toString());
}
