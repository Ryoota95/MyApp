/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followingId]` on the table `following` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "following_followerId_followingId_key" ON "following"("followerId", "followingId");
