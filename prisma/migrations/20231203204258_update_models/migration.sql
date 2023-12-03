/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_purchaserId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvent" DROP CONSTRAINT "UserEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvent" DROP CONSTRAINT "UserEvent_userId_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserEvent";

-- DropTable
DROP TABLE "Venue";

-- CreateTable
CREATE TABLE "users" (
    "userID" SERIAL NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "events" (
    "eventID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" INTEGER,
    "organizerId" INTEGER,

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "payments" (
    "paymentID" SERIAL NOT NULL,
    "userId" INTEGER,
    "ticketId" INTEGER,
    "amount" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CREDITCARD',

    CONSTRAINT "payments_pkey" PRIMARY KEY ("paymentID")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewID" SERIAL NOT NULL,
    "eventId" INTEGER,
    "userId" INTEGER,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewID")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticketID" SERIAL NOT NULL,
    "eventId" INTEGER,
    "purchaserId" INTEGER,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketID")
);

-- CreateTable
CREATE TABLE "userevents" (
    "userEventID" SERIAL NOT NULL,
    "userId" INTEGER,
    "eventId" INTEGER,

    CONSTRAINT "userevents_pkey" PRIMARY KEY ("userEventID")
);

-- CreateTable
CREATE TABLE "venues" (
    "venueID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("venueID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "events_name_key" ON "events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "venues_name_key" ON "venues"("name");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("venueID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("ticketID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "users"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userevents" ADD CONSTRAINT "userevents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userevents" ADD CONSTRAINT "userevents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;
