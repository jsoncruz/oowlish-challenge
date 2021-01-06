import Customer from './customer';

const customer = new Customer();

export default {
  Query: {
    ...customer.Query(),
  },
  Mutation: {
    ...customer.Mutation(),
  },
};
