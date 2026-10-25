"use client";

import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Result, Select, message } from "antd";
import { company } from "@/data/company";
import { contactMethods, isAustralianPhone, propertyTypes, serviceOptions, type ContactInput } from "@/lib/contact";
import Icon from "@/components/ui/Icon";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [form] = Form.useForm<ContactInput>();
  const [status, setStatus] = useState<Status>("idle");
  const [messageApi, contextHolder] = message.useMessage();

  // Pre-select the service when arriving from a service page (/contact?service=fttp-installation).
  // Read in an effect (not useSearchParams) so the form itself can still be statically rendered.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service && serviceOptions.some((o) => o.value === service)) form.setFieldValue("serviceType", service);
  }, [form]);

  const onFinish = async (values: ContactInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> } = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          form.setFields(
            Object.entries(data.fieldErrors).map(([name, errors]) => ({ name: name as keyof ContactInput, errors })),
          );
        }
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.resetFields();
    } catch (err) {
      setStatus("idle");
      messageApi.error({
        content: `${err instanceof Error ? err.message : "Something went wrong."} You can also call us on ${company.phone.display}.`,
        duration: 6,
      });
    }
  };

  if (status === "success") {
    return (
      <Result
        status="success"
        className={styles.result}
        title="Thanks – your quote request is on its way!"
        subTitle={`Our team will be in touch within one business day. Need us sooner? Call ${company.phone.display}.`}
        extra={
          <Button type="primary" size="large" onClick={() => setStatus("idle")}>
            Send another request
          </Button>
        }
      />
    );
  }

  return (
    <>
      {contextHolder}
      <Form<ContactInput>
        form={form}
        layout="vertical"
        size="large"
        requiredMark="optional"
        onFinish={onFinish}
        onFinishFailed={() => messageApi.warning("Please check the highlighted fields.")}
        initialValues={{ propertyType: "residential", contactMethod: "either" }}
        scrollToFirstError={{ behavior: "smooth", block: "center" }}
        className={styles.form}
        disabled={status === "submitting"}
      >
        <div className={styles.row}>
          <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Please enter your name" }, { min: 2, message: "Please enter your name" }]}>
            <Input autoComplete="name" placeholder="Jane Citizen" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                validator: (_, value?: string) =>
                  !value || isAustralianPhone(value) ? Promise.resolve() : Promise.reject(new Error("Please enter a valid Australian phone number")),
              },
            ]}
          >
            <Input type="tel" autoComplete="tel" inputMode="tel" placeholder="04xx xxx xxx" />
          </Form.Item>
        </div>

        <div className={styles.row}>
          <Form.Item
            label="Email"
            name="email"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input type="email" autoComplete="email" placeholder="you@example.com" />
          </Form.Item>
          <Form.Item label="Suburb" name="suburb" rules={[{ required: true, message: "Please enter your suburb" }]}>
            <Input autoComplete="address-level2" placeholder="e.g. Norwood" />
          </Form.Item>
        </div>

        <Form.Item label="Service required" name="serviceType" rules={[{ required: true, message: "Please choose a service" }]}>
          <Select placeholder="Select a service" options={serviceOptions} />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item label="Property type" name="propertyType" rules={[{ required: true, message: "Please choose a property type" }]}>
            <Radio.Group optionType="button" buttonStyle="solid" options={propertyTypes.map((o) => ({ ...o }))} className={styles.radios} />
          </Form.Item>
          <Form.Item label="Preferred contact method" name="contactMethod" rules={[{ required: true, message: "Please choose a contact method" }]}>
            <Radio.Group optionType="button" buttonStyle="solid" options={contactMethods.map((o) => ({ ...o }))} className={styles.radios} />
          </Form.Item>
        </div>

        <Form.Item label="Tell us about your job" name="message" rules={[{ max: 2000, message: "2000 characters max" }]}>
          <Input.TextArea
            rows={5}
            showCount
            maxLength={2000}
            placeholder="e.g. We'd like 4 cameras covering the driveway and backyard, or our NBN box needs moving to the study…"
          />
        </Form.Item>

        {/* Honeypot – hidden from people and screen readers, bots tend to fill it in */}
        <div className={styles.honeypot} aria-hidden="true">
          <Form.Item label="Website" name="website">
            <Input tabIndex={-1} autoComplete="off" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" size="large" block loading={status === "submitting"} className={`btn-cta ${styles.submit}`}>
          {status === "submitting" ? "Sending…" : "Request my free quote"}
          {status !== "submitting" && <Icon name="arrowRight" />}
        </Button>
        <p className={styles.privacy}>
          <Icon name="lock" /> Your details are only used to respond to your enquiry. We never share them.
        </p>
      </Form>
    </>
  );
}
