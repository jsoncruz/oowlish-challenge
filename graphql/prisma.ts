import { PrismaClient } from '@prisma/client';

export default class Prisma {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
