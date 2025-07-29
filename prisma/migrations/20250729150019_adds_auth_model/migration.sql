-- CreateTable
CREATE TABLE "Auth" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_token_key" ON "Auth"("token");
