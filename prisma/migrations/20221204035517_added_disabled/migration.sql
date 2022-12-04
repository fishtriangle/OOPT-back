-- AlterTable
ALTER TABLE "Axis" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Holiday" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Master" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Point" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Town" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN "disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN "disabled" BOOLEAN DEFAULT false;
