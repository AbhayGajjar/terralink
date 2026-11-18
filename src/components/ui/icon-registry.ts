/**
 * Icon artwork registry (raw Ant Design icon definitions). Server-only in practice: it is read by
 * the sprite route (src/app/icons.svg/route.ts), which writes every icon into one cached SVG file.
 * Components import only the IconName type from here, so no icon data ships in page JavaScript.
 *
 * To add an icon: import it below and add it to the map with a short name.
 */
import NodeIndexOutlined from "@ant-design/icons-svg/es/asn/NodeIndexOutlined";
import ClusterOutlined from "@ant-design/icons-svg/es/asn/ClusterOutlined";
import ApiOutlined from "@ant-design/icons-svg/es/asn/ApiOutlined";
import VideoCameraOutlined from "@ant-design/icons-svg/es/asn/VideoCameraOutlined";
import WifiOutlined from "@ant-design/icons-svg/es/asn/WifiOutlined";
import CloudServerOutlined from "@ant-design/icons-svg/es/asn/CloudServerOutlined";
import ThunderboltOutlined from "@ant-design/icons-svg/es/asn/ThunderboltOutlined";
import SafetyCertificateOutlined from "@ant-design/icons-svg/es/asn/SafetyCertificateOutlined";
import FileProtectOutlined from "@ant-design/icons-svg/es/asn/FileProtectOutlined";
import SafetyOutlined from "@ant-design/icons-svg/es/asn/SafetyOutlined";
import LockOutlined from "@ant-design/icons-svg/es/asn/LockOutlined";
import StarFilled from "@ant-design/icons-svg/es/asn/StarFilled";
import TeamOutlined from "@ant-design/icons-svg/es/asn/TeamOutlined";
import ToolOutlined from "@ant-design/icons-svg/es/asn/ToolOutlined";
import ClockCircleOutlined from "@ant-design/icons-svg/es/asn/ClockCircleOutlined";
import DollarOutlined from "@ant-design/icons-svg/es/asn/DollarOutlined";
import EnvironmentOutlined from "@ant-design/icons-svg/es/asn/EnvironmentOutlined";
import HomeOutlined from "@ant-design/icons-svg/es/asn/HomeOutlined";
import ShopOutlined from "@ant-design/icons-svg/es/asn/ShopOutlined";
import SmileOutlined from "@ant-design/icons-svg/es/asn/SmileOutlined";
import HeartOutlined from "@ant-design/icons-svg/es/asn/HeartOutlined";
import TrophyOutlined from "@ant-design/icons-svg/es/asn/TrophyOutlined";
import RocketOutlined from "@ant-design/icons-svg/es/asn/RocketOutlined";
import EyeOutlined from "@ant-design/icons-svg/es/asn/EyeOutlined";
import MobileOutlined from "@ant-design/icons-svg/es/asn/MobileOutlined";
import DashboardOutlined from "@ant-design/icons-svg/es/asn/DashboardOutlined";
import CustomerServiceOutlined from "@ant-design/icons-svg/es/asn/CustomerServiceOutlined";
import CalendarOutlined from "@ant-design/icons-svg/es/asn/CalendarOutlined";
import ScheduleOutlined from "@ant-design/icons-svg/es/asn/ScheduleOutlined";
import FormOutlined from "@ant-design/icons-svg/es/asn/FormOutlined";
import SearchOutlined from "@ant-design/icons-svg/es/asn/SearchOutlined";
import FileSearchOutlined from "@ant-design/icons-svg/es/asn/FileSearchOutlined";
import PhoneOutlined from "@ant-design/icons-svg/es/asn/PhoneOutlined";
import MailOutlined from "@ant-design/icons-svg/es/asn/MailOutlined";
import CheckOutlined from "@ant-design/icons-svg/es/asn/CheckOutlined";
import CheckCircleFilled from "@ant-design/icons-svg/es/asn/CheckCircleFilled";
import ArrowRightOutlined from "@ant-design/icons-svg/es/asn/ArrowRightOutlined";
import ArrowUpOutlined from "@ant-design/icons-svg/es/asn/ArrowUpOutlined";
import FacebookFilled from "@ant-design/icons-svg/es/asn/FacebookFilled";
import InstagramOutlined from "@ant-design/icons-svg/es/asn/InstagramOutlined";
import LinkedinFilled from "@ant-design/icons-svg/es/asn/LinkedinFilled";
import GoogleOutlined from "@ant-design/icons-svg/es/asn/GoogleOutlined";
import MenuOutlined from "@ant-design/icons-svg/es/asn/MenuOutlined";
import CloseOutlined from "@ant-design/icons-svg/es/asn/CloseOutlined";
import ArrowLeftOutlined from "@ant-design/icons-svg/es/asn/ArrowLeftOutlined";

interface IconNode {
  tag: string;
  attrs: Record<string, string>;
  children?: IconNode[];
}
type IconDefinition = { icon: IconNode | ((...args: string[]) => IconNode) };

export const icons = {
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
  menu: MenuOutlined,
  close: CloseOutlined,
  arrowLeft: ArrowLeftOutlined,
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function nodeToSvg(node: IconNode): string {
  const attrs = Object.entries(node.attrs)
    .map(([key, value]) => ` ${key}="${escapeAttr(String(value))}"`)
    .join("");
  return `<${node.tag}${attrs}>${(node.children ?? []).map(nodeToSvg).join("")}</${node.tag}>`;
}

/** The whole sprite: one <symbol id="i-name"> per icon. */
export function iconSprite() {
  const symbols = (Object.keys(icons) as IconName[]).map((name) => {
    const definition = (icons[name] as IconDefinition).icon;
    const svg = typeof definition === "function" ? definition("currentColor", "currentColor") : definition;
    return `<symbol id="i-${name}" viewBox="${svg.attrs.viewBox}">${(svg.children ?? []).map(nodeToSvg).join("")}</symbol>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`;
}
