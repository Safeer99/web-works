import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_0kkL856eBRMZVQErfpXt9aX6jF-kYW8CnFixDSr5KGhATByg_Kmx3y5L_-BOe9Q4",
});

export async function POST(request: Request) {
  const self = await currentUser();

  if (!self) {
    return new Response("Unauthorized", { status: 403 });
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const canvas = await db.canvas.findUnique({ where: { id: room } });

  if (!canvas) {
    return new Response("Not found", { status: 404 });
  }

  const authorize = await db.associate.findUnique({
    where: {
      agencyId_userId: {
        agencyId: canvas.agencyId,
        userId: user.id,
      },
    },
  });

  if (!authorize) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.name,
    avatar: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
