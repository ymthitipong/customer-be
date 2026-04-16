import dayjs from 'dayjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

interface CustomerData {
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
  active_since: Date;
  last_activity: Date;
  recent_activity: string; // json
}

export class InsertCustomers implements MigrationInterface {
  name = 'InsertCustomers1776239840000';
  numberOfRecords = 1000;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const customers: CustomerData[] = [];

    for (let i = 1; i <= this.numberOfRecords; i++) {
      const firstName = this.generateRandomFirstName();
      const lastName = this.generateRandomLastName();
      const company = this.generateRandomCompany();
      const email = this.generateRandomEmail();
      const phone = this.generateRandomPhone();
      const salesperson = this.generateRandomSalespersons();
      const creditStatus = this.generateRandomCreditStatus();
      const status = this.generateRandomStatus();
      const totalSpend = Math.floor(Math.random() * 100000) + 1000;
      const numberOfPurchases = Math.floor(Math.random() * 50) + 1;
      const activeSince = this.generateRandomDate(
        new Date(2023, 0, 1),
        new Date(2025, 0, 1),
      );
      const lastActivity = this.generateRandomDate(
        new Date(2026, 0, 1),
        new Date(),
      );
      const initials = `${firstName[0]}${lastName[0]}`;

      customers.push({
        name: `${firstName} ${lastName}`,
        company,
        initials,
        email,
        phone,
        salesperson,
        credit_status: creditStatus,
        status,
        total_spend: totalSpend,
        number_of_purchases: numberOfPurchases,
        active_since: activeSince,
        last_activity: lastActivity,
        recent_activity: JSON.stringify(
          this.generateRandomRecentActivity(lastActivity),
        ),
      });
    }

    // Insert in batches
    const batchSize = 100;
    for (let i = 0; i < customers.length; i += batchSize) {
      const batch = customers.slice(i, i + batchSize);
      const values = batch
        .map(
          (customer) =>
            `('${customer.name}', '${customer.company}', '${customer.initials}', '${customer.email}', '${customer.phone}', '${customer.salesperson}', '${customer.credit_status}', '${customer.status}', ${customer.total_spend}, ${customer.number_of_purchases}, '${customer.active_since.toISOString().split('T')[0]}', '${customer.last_activity.toISOString()}', '${customer.recent_activity}')`,
        )
        .join(', ');

      await queryRunner.query(`
        INSERT INTO customer (name, company, initials, email, phone, salesperson, credit_status, status, total_spend, number_of_purchases, active_since, last_activity, recent_activity)
        VALUES ${values}
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM customer`);
  }

  private generateRandomCompany(): string {
    const companies = [
      'TECHNOVA SOLUTIONS',
      'BLUEPEAK SYSTEMS',
      'NEXTGEN DIGITAL',
      'VERTEX INNOVATIONS',
      'CLOUDCORE TECHNOLOGIES',
      'BRIGHTWAVE ANALYTICS',
      'APEX SOFTWARE LABS',
      'GLOBALNET SERVICES',
      'INFINITE LOOP TECH',
      'PRIMEDATA SOLUTIONS',
      'SKYLINE IT SERVICES',
      'QUANTUM EDGE SYSTEMS',
      'NEXUS DIGITAL GROUP',
      'FUSIONWORKS TECHNOLOGIES',
      'CLEVERBRIDGE SOLUTIONS',
      'IRONGATE CYBERSECURITY',
      'STELLAR CLOUD SERVICES',
      'REDWOOD ANALYTICS',
      'ORION SOFTWARE HOUSE',
      'HYPERION TECH GROUP',
      'ZENITH INNOVATIONS',
      'CODECRAFT STUDIOS',
      'AURORA DIGITAL SYSTEMS',
      'MATRIXCORE TECHNOLOGIES',
      'ELEVATE IT SOLUTIONS',
      'PINNACLE DATA SERVICES',
      'NIMBUS CLOUD TECH',
      'VECTOR SOFTWARE LABS',
      'CATALYST TECH GROUP',
      'SUMMIT DIGITAL WORKS',
    ];
    const companyLength = companies.length;
    return companies[Math.floor(Math.random() * companyLength)];
  }

  private generateRandomEmail(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = chars.length;
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += chars[Math.floor(Math.random() * charLength)];
    }
    return `${name}@mail.com`;
  }

  private generateRandomStatus(): string {
    const statuses = ['Active', 'Inactive'];
    const statusLength = statuses.length;
    return statuses[Math.floor(Math.random() * statusLength)];
  }

  private generateRandomCreditStatus(): string {
    const creditStatuses = [
      'No Credit',
      'Good Credit',
      'Poor Credit',
    ];
    const creditStatusLength = creditStatuses.length;
    return creditStatuses[Math.floor(Math.random() * creditStatusLength)];
  }

  private generateRandomSalespersons(): string {
    const salespersons = [
      'JOHN SMITH', 'JANE DOE', 'ROBERT JOHNSON', 'EMILY DAVIS', 'MICHAEL WILSON',
      'SARAH BROWN', 'DAVID TAYLOR', 'LISA ANDERSON', 'JAMES MARTINEZ', 'JENNIFER THOMAS',
      'WILLIAM JACKSON', 'OLIVIA WHITE', 'BENJAMIN HARRIS', 'EMMA CLARK', 'JACOB LEWIS',
      'AVA ROBINSON', 'MASON WALKER', 'ISABELLA YOUNG', 'ETHAN ALLEN', 'MIA KING',
      'LOGAN SCOTT', 'SOPHIA GREEN', 'DANIEL HALL', 'CHARLOTTE ADAMS', 'JACK WRIGHT',
      'AMELIA HILL', 'ALEXANDER BAKER', 'HARPER GONZALEZ', 'ELIJAH NELSON', 'EVELYN CARTER',
    ];
    const salespersonLength = salespersons.length;
    return salespersons[Math.floor(Math.random() * salespersonLength)];
  }

  private generateRandomFirstName(): string {
    const firstNames = [
      'JAMES', 'MARY', 'ROBERT', 'PATRICIA', 'JOHN', 'JENNIFER', 'MICHAEL', 'LINDA', 'DAVID', 'ELIZABETH',
      'WILLIAM', 'BARBARA', 'RICHARD', 'SUSAN', 'JOSEPH', 'JESSICA', 'THOMAS', 'SARAH', 'CHARLES', 'KAREN',
      'CHRISTOPHER', 'NANCY', 'DANIEL', 'LISA', 'MATTHEW', 'BETTY', 'ANTHONY', 'HELEN', 'MARK', 'SANDRA',
      'DONALD', 'DONNA', 'PAUL', 'ASHLEY', 'STEVEN', 'KIMBERLY', 'ANDREW', 'EMILY', 'JOSHUA', 'KENNETH',
      'LAURA', 'BRIAN', 'ANGELA', 'GEORGE', 'AMANDA', 'EDWARD', 'MICHELLE', 'RONALD', 'DOROTHY', 'TIMOTHY',
    ];
    const firstNameLength = firstNames.length;
    return firstNames[Math.floor(Math.random() * firstNameLength)];
  }

  private generateRandomLastName(): string {
    const lastNames = [
      'SMITH', 'JOHNSON', 'WILLIAMS', 'BROWN', 'JONES', 'GARCIA', 'MILLER', 'DAVIS', 'RODRIGUEZ', 'MARTINEZ',
      'HERNANDEZ', 'LOPEZ', 'GONZALEZ', 'WILSON', 'ANDERSON', 'THOMAS', 'TAYLOR', 'MOORE', 'JACKSON', 'MARTIN',
      'LEE', 'PEREZ', 'THOMPSON', 'WHITE', 'HARRIS', 'SANCHEZ', 'CLARK', 'RAMIREZ', 'LEWIS', 'ROBINSON',
    ];
    const lastNameLength = lastNames.length;
    return lastNames[Math.floor(Math.random() * lastNameLength)];
  }

  private generateRandomRecentActivity(
    lastActivityTime: Date,
  ): { action: string; time: Date }[] {
    const activities = [
      'Payment received',
      'Generate Report',
      'Receive Email',
      'Subscribed Promotion',
      'Update Profile',
      'Update Billing',
    ];
    const activityLength = activities.length;

    const maxRecord = 5;
    const randomActivityNumber =
      Math.floor(Math.pow(Math.random(), 0.4) * maxRecord) + 1;
    const recentActivities: { action: string; time: Date }[] = [];
    let currentActivityTime = lastActivityTime;

    for (let i = 1; i <= randomActivityNumber; i++) {
      const randomActivity =
        activities[Math.floor(Math.random() * activityLength)];

      recentActivities.push({
        action: randomActivity,
        time: currentActivityTime,
      });

      currentActivityTime = dayjs(currentActivityTime)
        .subtract(Math.random() * 60 * 2, 'minute') // 2hr
        .toDate();
    }

    return recentActivities;
  }

  private generateRandomPhone(): string {
    const prefixNumbers = ['06', '08', '09'];
    const prefix = prefixNumbers[Math.floor(Math.random() * 3)];
    const lineNumber = Math.floor(Math.random() * 100000000);
    return `${prefix}${String(lineNumber).padStart(8, '0')}`;
  }

  private generateRandomDate(start: Date, end: Date): Date {
    return dayjs(start)
      .add(Math.random() * dayjs(end).diff(start, 'millisecond'), 'millisecond')
      .toDate();
  }
}
