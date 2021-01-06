import { Customer, Prisma } from '@prisma/client';

import PrismaORM from '@graphql/prisma';

export default class CustomerResolver extends PrismaORM {
  Query() {
    const { customer } = this.prisma;
    return {
      async totalCustomers(_, { city }: Customer) {
        const customers_total = await customer.count({
          where: { city },
        });
        return { city, customers_total };
      },
      cityCustomers(_, { city, page }: Customer & { page: number }) {
        const args: Prisma.Subset<Prisma.FindManyCustomerArgs, Prisma.FindManyCustomerArgs> = {
          orderBy: { first_name: 'asc' },
        };
        if (city) {
          args.where = { city };
        }
        if (page) {
          args.skip = page === 1 ? 0 : (page - 1) * 10;
          args.take = 10;
        }
        return customer.findMany(args);
      },
      async customer(_, { id }: Customer) {
        const user = await customer.findUnique({ where: { id } });
        const request = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${user.city}&key=${process.env.GOOGLE_API_KEY}`,
          {
            keepalive: true,
          },
        );
        const {
          results: [{ geometry }],
        } = await request.json();
        return { ...user, lat: geometry.location.lat, long: geometry.location.lng };
      },
    };
  }

  Mutation() {
    const { customer } = this.prisma;
    return {
      async seed() {
        const customers: Array<Customer> = require('@assets/customers.json');
        for await (const data of customers) {
          await customer.create({ data });
        }
        return 'Customers got stored';
      },
    };
  }
}
