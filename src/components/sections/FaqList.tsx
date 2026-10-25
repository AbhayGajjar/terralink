"use client";

import { Collapse } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./FaqList.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={["0"]}
      expandIconPlacement="end"
      className={styles.faq}
      expandIcon={({ isActive }) => (
        <span className={`${styles.toggle} ${isActive ? styles.toggleActive : ""}`}>
          {isActive ? <MinusOutlined /> : <PlusOutlined />}
        </span>
      )}
      items={items.map((item, i) => ({
        key: String(i),
        label: <h3 className={styles.question}>{item.question}</h3>,
        children: <p className={styles.answer}>{item.answer}</p>,
        className: styles.item,
      }))}
    />
  );
}
