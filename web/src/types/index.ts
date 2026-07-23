import type { FlavorId, FormatId } from "@/lib/tokens";

export type OrderStep = "format" | "flavors" | "quantity" | "delivery" | "summary";

export type DeliveryMethod = "pickup" | "delivery";

export interface OrderState {
  format: FormatId | null;
  flavors: FlavorId[];
  quantity: number;
  delivery: DeliveryMethod;
  name: string;
  phone: string;
  address: string;
  step: OrderStep;
  setFormat: (format: FormatId) => void;
  toggleFlavor: (flavor: FlavorId) => void;
  setQuantity: (n: number) => void;
  setDelivery: (d: DeliveryMethod) => void;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  setAddress: (v: string) => void;
  setStep: (step: OrderStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  maxFlavors: () => number;
}
