/*
  Warnings:

  - You are about to drop the column `isTakeDays` on the `Track` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
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
INSERT INTO "new_Track" ("description", "id", "length", "ooptId", "season", "timeInTrack", "title", "transport", "type", "water") SELECT "description", "id", "length", "ooptId", "season", "timeInTrack", "title", "transport", "type", "water" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
