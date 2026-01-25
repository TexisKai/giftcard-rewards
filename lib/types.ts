// TypeScript interfaces for the sweepstakes landing page

export interface Lead {
  id: string;
  email: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  user_agent?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface OfferClick {
  id: string;
  lead_id: string;
  offer_name: string;
  offer_url: string;
  clicked_at: string;
}

export interface Offer {
  name: string;
  logo: string;
  url: string;
  requirements: string;
}

export interface CollectEmailRequest {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface CollectEmailResponse {
  success: boolean;
  lead_id?: string;
  existing?: boolean;
  error?: string;
}

export interface TrackClickRequest {
  lead_id: string;
  offer_name: string;
  offer_url: string;
}

export interface TrackClickResponse {
  success: boolean;
  error?: string;
}
