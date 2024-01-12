/*
  Warnings:

  - You are about to drop the column `storesId` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TodoList_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TodoList" ("createdAt", "id", "title", "userId") SELECT "createdAt", "id", "title", "userId" FROM "TodoList";
DROP TABLE "TodoList";
ALTER TABLE "new_TodoList" RENAME TO "TodoList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
