-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer.id_unique" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");
