import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JoinRoomClient from "./JoinRoomClient";

type Props = {
  params: Promise<{ roomId: string }>;
};

const ROOM_ID_REGEX = /^[a-z0-9]{7}$/i;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  if (!ROOM_ID_REGEX.test(roomId)) {
    return { title: "رابط غير صالح — البعاتي" };
  }
  return {
    title: "انضم للغرفة — البعاتي",
    description: `انضم لغرفة في لعبة البعاتي! لعبة الذكاء والخداع السودانية.`,
    openGraph: {
      title: "انضم للغرفة — البعاتي",
      description:
        "صديقك يدعوك للانضمام لغرفة في لعبة البعاتي! حمّل التطبيق وانضم الآن.",
      locale: "ar",
      type: "website",
    },
  };
}

export default async function JoinRoomPage({ params }: Props) {
  const { roomId } = await params;
  if (!ROOM_ID_REGEX.test(roomId)) {
    notFound();
  }
  return <JoinRoomClient roomId={roomId} />;
}
