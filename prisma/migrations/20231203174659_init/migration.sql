-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PURCHASED', 'AVAILABLE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDITCARD', 'DEBITCARD', 'PAYPAL', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" INTEGER,
    "organizerId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" SERIAL NOT NULL,
    "userId" INTEGER,
    "ticketId" INTEGER,
    "amount" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CREDITCARD',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewID" SERIAL NOT NULL,
    "eventId" INTEGER,
    "userId" INTEGER,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" SERIAL NOT NULL,
    "eventId" INTEGER,
    "purchaserId" INTEGER,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
);

-- CreateTable
CREATE TABLE "UserEvent" (
    "userEventID" SERIAL NOT NULL,
    "userId" INTEGER,
    "eventId" INTEGER,

    CONSTRAINT "UserEvent_pkey" PRIMARY KEY ("userEventID")
);

-- CreateTable
CREATE TABLE "Venue" (
    "venueID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("venueID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "Venue"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("venueID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;
