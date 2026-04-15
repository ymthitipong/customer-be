import { Customer } from '@domain/interface/customer.interface';
import dayjs from 'dayjs';

export interface CustomerResponseInterface {
  object: string;
  id: number;
  name: string;
  company: string;
  initials: string;
  active_since: string;
  email: string;
  phone: string;
  salesperson: string;
  credit_status: string;
  status: string;
  total_spend: number;
  number_of_purchases: number;
  last_activity: string;
  recent_activity: {
    action: string;
    time: string;
    displayTime: string;
  }[];
}

const formatDisplayTime = (time: dayjs.Dayjs): string => {
  const now = dayjs();

  const seconds = now.diff(time, 'second');
  if (seconds < 60) return 'Just now';

  const minutes = now.diff(time, 'minute');
  if (minutes < 60) return `${minutes} min ago`;

  const hours = now.diff(time, 'hour');
  if (hours < 24) return `${hours} hr ago`;

  const days = now.diff(time, 'day');
  if (days < 30) return `${days} days ago`;

  const months = now.diff(time, 'month');
  if (months < 12) return `${months} months ago`;

  const years = now.diff(time, 'year');
  return `${years} years ago`;
};

export const mapCustomerToResponse = (
  customer: Customer,
): CustomerResponseInterface => ({
  object: 'customer',
  id: customer.id,
  name: customer.name,
  company: customer.company,
  initials: customer.initials,
  active_since: customer.active_since,
  email: customer.email,
  phone: customer.phone,
  salesperson: customer.salesperson,
  credit_status: customer.credit_status,
  status: customer.status,
  total_spend: customer.total_spend,
  number_of_purchases: customer.number_of_purchases,
  last_activity: dayjs(customer.last_activity).toISOString(),
  recent_activity: customer.recent_activity.map((activity) => ({
    action: activity.action,
    time: activity.time,
    displayTime: formatDisplayTime(dayjs(activity.time)),
  })),
});
