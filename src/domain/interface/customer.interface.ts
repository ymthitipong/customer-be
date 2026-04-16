export interface Customer {
  id: number;
  name: string;
  company: string;
  initials: string;
  email: string;
  phone: string;
  salesperson: string;
  creditStatus: string;
  status: string;
  totalSpend: number;
  numberOfPurchases: number;
  activeSince: string; // Date string in YYYY-MM-DD format
  lastActivity: Date;
  recentActivity: {
    action: string;
    time: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
