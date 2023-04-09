-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rso" TEXT,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "lName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Events" (
    "events_ID" SERIAL NOT NULL,
    "events_Name" TEXT NOT NULL,
    "start_Time" TIMESTAMP(3) NOT NULL,
    "end_Time" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "rso" TEXT,
    "at" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("events_ID")
);

-- CreateTable
CREATE TABLE "Comments" (
    "user_ID" INTEGER NOT NULL,
    "comments_ID" SERIAL NOT NULL,
    "comments" TEXT NOT NULL,
    "event_ID" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comments_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Location_lName_key" ON "Location"("lName");

-- CreateIndex
CREATE UNIQUE INDEX "Location_address_key" ON "Location"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Events_events_Name_key" ON "Events"("events_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Events_start_Time_key" ON "Events"("start_Time");

-- CreateIndex
CREATE UNIQUE INDEX "Events_end_Time_key" ON "Events"("end_Time");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_at_fkey" FOREIGN KEY ("at") REFERENCES "Location"("lName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_event_ID_fkey" FOREIGN KEY ("event_ID") REFERENCES "Events"("events_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
