// razorpay.d.ts
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler?: (response: RazorpayResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      [key: string]: string;
    };
    theme?: {
      color?: string;
      [key: string]: string | undefined;
    };
    modal?: {
      confirm_close?: boolean;
      escape?: boolean;
      animation?: boolean;
      [key: string]: boolean | undefined;
    };
    callback_url?: string;
    redirect?: boolean;
    [key: string]: unknown;
  }
  
  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    [key: string]: string;
  }
  
  interface RazorpayInstance {
    open(): void;
    close(): void;
  }
  
  interface RazorpayConstructor {
    new(options: RazorpayOptions): RazorpayInstance;
  }
  
  interface Window {
    Razorpay: RazorpayConstructor;
  }