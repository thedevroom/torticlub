"use client";

import { create } from "zustand";
import type { FlavorId, FormatId } from "@/lib/tokens";
import type { DeliveryMethod, OrderState, OrderStep } from "@/types";

const STEPS: OrderStep[] = ["format", "flavors", "quantity", "delivery", "summary"];

function maxForFormat(format: FormatId | null): number {
  if (format === "solo") return 1;
  if (format === "duo") return 2;
  if (format === "club") return 4;
  return 1;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  format: null,
  flavors: [],
  quantity: 1,
  delivery: "pickup",
  name: "",
  phone: "",
  address: "",
  step: "format",

  setFormat: (format) =>
    set((s) => ({
      format,
      flavors: s.flavors.slice(0, maxForFormat(format)),
    })),

  toggleFlavor: (flavor) =>
    set((s) => {
      const max = maxForFormat(s.format);
      if (s.flavors.includes(flavor)) {
        return { flavors: s.flavors.filter((f) => f !== flavor) };
      }
      if (s.flavors.length >= max) {
        return { flavors: [...s.flavors.slice(1), flavor] };
      }
      return { flavors: [...s.flavors, flavor] };
    }),

  setQuantity: (quantity) => set({ quantity: Math.max(1, Math.min(12, quantity)) }),
  setDelivery: (delivery) => set({ delivery }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setStep: (step) => set({ step }),

  nextStep: () => {
    const { step } = get();
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) set({ step: STEPS[i + 1] });
  },

  prevStep: () => {
    const { step } = get();
    const i = STEPS.indexOf(step);
    if (i > 0) set({ step: STEPS[i - 1] });
  },

  reset: () =>
    set({
      format: null,
      flavors: [],
      quantity: 1,
      delivery: "pickup",
      name: "",
      phone: "",
      address: "",
      step: "format",
    }),

  maxFlavors: () => maxForFormat(get().format),
}));
