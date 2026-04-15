export interface Customer {
  id: number;
  name: string;
  company: string;
  initials: string;
  email: string;
  phone: string;
  salesperson: string;
  credit_status: string;
  status: string;
  total_spend: number;
  number_of_purchases: number;
  active_since: string; // Date string in YYYY-MM-DD format
  last_activity: Date;
  recent_activity: {
    action: string;
    time: string;
  }[];
  created_at: Date;
  updated_at: Date;
}
