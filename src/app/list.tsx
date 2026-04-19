"use client";
import { Label, ListBox, Surface } from "@heroui/react";
import { useRouter } from "next/navigation";

import { demoItems } from "@/data/demo";

export function DemoList() {
  const router = useRouter();

  return (
    <Surface className="rounded-3xl shadow-surface">
      <ListBox aria-label="Demo list" className="w-full p-2" onAction={(key) => router.push(key.toString())}>
        {demoItems.map((item) => (
          <ListBox.Item id={item.href} textValue={item.label} key={item.href}>
            <div className="flex items-center justify-center">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <div className="flex flex-col">
              <Label>{item.label}</Label>
            </div>
          </ListBox.Item>
        ))}
      </ListBox>
    </Surface>
  );
}
