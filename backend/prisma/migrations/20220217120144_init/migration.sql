-- CreateTable
CREATE TABLE "Meter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "days" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ElectricyToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "meterId" INTEGER NOT NULL,
    CONSTRAINT "ElectricyToken_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "Meter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Meter_number_key" ON "Meter"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricyToken_token_key" ON "ElectricyToken"("token");
