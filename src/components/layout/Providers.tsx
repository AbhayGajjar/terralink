"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import { MotionConfig } from "framer-motion";
import { antdTheme } from "@/lib/theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme} locale={enGB}>
      {/* "user" disables transform/layout animations when the OS asks for reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ConfigProvider>
  );
}
