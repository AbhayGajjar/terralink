"use client";

import type { CSSProperties } from "react";
import {
  ApiOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CheckOutlined,
  ClockCircleOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  FacebookFilled,
  FileProtectOutlined,
  FileSearchOutlined,
  FormOutlined,
  GoogleOutlined,
  HeartOutlined,
  HomeOutlined,
  InstagramOutlined,
  LinkedinFilled,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  NodeIndexOutlined,
  PhoneOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  SearchOutlined,
  ShopOutlined,
  SmileOutlined,
  StarFilled,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  TrophyOutlined,
  VideoCameraOutlined,
  WifiOutlined,
} from "@ant-design/icons";

/**
 * Central icon registry. Data files refer to icons by name so content can live
 * in plain TypeScript (and in Server Components) without importing React icons.
 */
const icons = {
  fibre: NodeIndexOutlined,
  node: ClusterOutlined,
  cable: ApiOutlined,
  camera: VideoCameraOutlined,
  wifi: WifiOutlined,
  server: CloudServerOutlined,
  bolt: ThunderboltOutlined,
  safety: SafetyCertificateOutlined,
  insured: FileProtectOutlined,
  shield: SafetyOutlined,
  lock: LockOutlined,
  star: StarFilled,
  team: TeamOutlined,
  tool: ToolOutlined,
  clock: ClockCircleOutlined,
  dollar: DollarOutlined,
  location: EnvironmentOutlined,
  home: HomeOutlined,
  shop: ShopOutlined,
  sparkle: SmileOutlined,
  heart: HeartOutlined,
  trophy: TrophyOutlined,
  rocket: RocketOutlined,
  eye: EyeOutlined,
  mobile: MobileOutlined,
  dashboard: DashboardOutlined,
  support: CustomerServiceOutlined,
  calendar: CalendarOutlined,
  schedule: ScheduleOutlined,
  form: FormOutlined,
  search: SearchOutlined,
  survey: FileSearchOutlined,
  phone: PhoneOutlined,
  mail: MailOutlined,
  check: CheckOutlined,
  checkCircle: CheckCircleFilled,
  arrowRight: ArrowRightOutlined,
  arrowUp: ArrowUpOutlined,
  facebook: FacebookFilled,
  instagram: InstagramOutlined,
  linkedin: LinkedinFilled,
  google: GoogleOutlined,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}

export default function Icon({ name, className, style }: IconProps) {
  const Component = icons[name];
  return <Component className={className} style={style} aria-hidden="true" />;
}
