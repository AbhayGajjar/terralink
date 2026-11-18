"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import { antdTheme } from "@/lib/theme";

/**
 * Ant Design theme + SSR style registry. Wrap ONLY the components that use Ant Design
 * (the quote form, the projects gallery) so pages without them don't download Ant Design.
 */
export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={antdTheme} locale={enGB}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
