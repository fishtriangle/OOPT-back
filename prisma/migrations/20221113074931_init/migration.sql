-- CreateTable
CREATE TABLE "OOPT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Town" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "belongsId" INTEGER,
    CONSTRAINT "Town_belongsId_fkey" FOREIGN KEY ("belongsId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "length" TEXT,
    "type" TEXT,
    "transport" TEXT,
    "timeInTrack" TEXT,
    "season" TEXT,
    "water" TEXT,
    "ooptId" INTEGER,
    CONSTRAINT "Track_ooptId_fkey" FOREIGN KEY ("ooptId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "route" TEXT,
    "townId" INTEGER,
    "ooptId" INTEGER,
    "trackId" INTEGER,
    CONSTRAINT "Point_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Point_ooptId_fkey" FOREIGN KEY ("ooptId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Point_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Axis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "axisX" INTEGER NOT NULL DEFAULT 0,
    "axisY" INTEGER NOT NULL DEFAULT 0,
    "ooptId" INTEGER,
    "townId" INTEGER,
    "pointId" INTEGER,
    "trackId" INTEGER,
    CONSTRAINT "Axis_ooptId_fkey" FOREIGN KEY ("ooptId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Axis_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Axis_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Axis_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Master" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "belongsId" INTEGER,
    CONSTRAINT "Master_belongsId_fkey" FOREIGN KEY ("belongsId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "belongsId" INTEGER,
    CONSTRAINT "Service_belongsId_fkey" FOREIGN KEY ("belongsId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "masterId" INTEGER,
    "serviceId" INTEGER,
    CONSTRAINT "Contact_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Contact_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "belongsId" INTEGER,
    CONSTRAINT "Holiday_belongsId_fkey" FOREIGN KEY ("belongsId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "small" TEXT,
    "large" TEXT,
    "description" TEXT,
    "alt" TEXT NOT NULL DEFAULT 'Информация отсутствует',
    "ooptId" INTEGER,
    "townId" INTEGER,
    "pointId" INTEGER,
    "trackId" INTEGER,
    "masterId" INTEGER,
    "serviceId" INTEGER,
    "holidayId" INTEGER,
    CONSTRAINT "Photo_ooptId_fkey" FOREIGN KEY ("ooptId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Photo_holidayId_fkey" FOREIGN KEY ("holidayId") REFERENCES "Holiday" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT,
    "description" TEXT,
    "alt" TEXT NOT NULL DEFAULT 'Информация отсутствует',
    "ooptId" INTEGER,
    "townId" INTEGER,
    "pointId" INTEGER,
    "trackId" INTEGER,
    "masterId" INTEGER,
    "serviceId" INTEGER,
    "holidayId" INTEGER,
    CONSTRAINT "Video_ooptId_fkey" FOREIGN KEY ("ooptId") REFERENCES "OOPT" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Video_holidayId_fkey" FOREIGN KEY ("holidayId") REFERENCES "Holiday" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Axis_townId_key" ON "Axis"("townId");

-- CreateIndex
CREATE UNIQUE INDEX "Axis_pointId_key" ON "Axis"("pointId");
