import type { ThemeConfig } from "antd";

/** Brand palette – mirrored as CSS custom properties in globals.css. */
export const brand = {
  navy: "#0A1F44",
  navyDeep: "#061430",
  blue: "#1E6FFF",
  cyan: "#00D4FF",
  orange: "#FF8A1F",
  offWhite: "#F7F9FC",
  ink: "#0F1B33",
  muted: "#5B6B86",
} as const;

const bodyFont = "var(--font-inter), system-ui, -apple-system, 'Segoe UI', sans-serif";
const headingFont = "var(--font-jakarta), var(--font-inter), system-ui, sans-serif";

/** Ant Design theme so every AntD component feels bespoke rather than stock. */
export const antdTheme: ThemeConfig = {
  cssVar: { key: "terralink" },
  hashed: false,
  token: {
    colorPrimary: brand.blue,
    colorInfo: brand.blue,
    colorLink: brand.blue,
    colorSuccess: "#16B47F",
    colorWarning: brand.orange,
    colorError: "#E5484D",
    colorTextBase: brand.ink,
    colorBgLayout: brand.offWhite,
    colorBorder: "#D8E0EE",
    colorBorderSecondary: "#E6ECF5",
    fontFamily: bodyFont,
    fontSize: 16,
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    controlHeight: 46,
    controlHeightLG: 54,
    controlHeightSM: 34,
    wireframe: false,
    motionDurationMid: "0.25s",
    boxShadowSecondary: "0 18px 50px -12px rgba(10, 31, 68, 0.25)",
  },
  components: {
    Button: {
      fontWeight: 600,
      paddingInline: 22,
      paddingInlineLG: 28,
      contentFontSizeLG: 16,
      primaryShadow: "0 10px 24px -10px rgba(30, 111, 255, 0.7)",
      defaultShadow: "none",
    },
    Input: {
      activeShadow: "0 0 0 4px rgba(30, 111, 255, 0.12)",
      paddingInline: 16,
    },
    Select: {
      optionSelectedBg: "rgba(30, 111, 255, 0.08)",
      optionPadding: "10px 14px",
    },
    Form: {
      labelFontSize: 14,
      verticalLabelPadding: "0 0 6px",
      itemMarginBottom: 20,
    },
    Segmented: {
      itemSelectedBg: brand.blue,
      itemSelectedColor: "#ffffff",
      trackBg: "rgba(10, 31, 68, 0.06)",
      trackPadding: 4,
      itemHoverBg: "rgba(30, 111, 255, 0.08)",
      fontFamily: headingFont,
    },
    Collapse: {
      headerBg: "transparent",
      contentBg: "transparent",
      headerPadding: "20px 24px",
      contentPadding: "0 24px 22px",
    },
    Drawer: {
      colorBgElevated: brand.navy,
      colorText: "#ffffff",
      colorIcon: "#ffffff",
      colorIconHover: brand.cyan,
    },
    Carousel: {
      dotWidth: 10,
      dotHeight: 10,
      dotActiveWidth: 28,
    },
    Tabs: {
      titleFontSize: 16,
    },
    Message: {
      contentPadding: "12px 18px",
    },
  },
};
