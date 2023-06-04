import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { URLSearchParams } from "url";
import { useEffect } from "react";

interface IAuthResponse {
  id: String;
  username: String;
  avatar: String;
  membership_expires_at: Date | null;
  token: String;
  membership_level: String | null;
}

const Home: NextPage<{ user: IAuthResponse | null }> = ({ user }) => {
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      router.replace("/").then(() => router.reload());
    }
  }, [router.isReady]);

  return (
    <>
      <div className="w-full h-screen relative flex justify-center">
        {user?.avatar ? (
          <div className="absolute z-10 right-[0.5%] top-[1%] flex items-center ">
            <Image
              src={`https://cdn.discordapp.com/avatars/${user.id}/${
                user.avatar
              }${user.avatar.startsWith("a_") ? ".gif" : ".png"}?size=48`}
              width={48}
              height={48}
              className="opacity-80 rounded-3xl"
            />
            <p className="text-1xl text-[#BA8A28]  mx-3 flex-nowrap whitespace-nowrap">
              {user.username}
            </p>
          </div>
        ) : (
          <div className="absolute z-10 left-[96%] top-[1%] rounded-lg">
            {console.log("ran")}
            <Image
              src="https://cdn.discordapp.com/embed/avatars/0.png?size=48"
              width={48}
              height={48}
              className="opacity-60 cursor-pointer rounded-3xl"
              onClick={(e) =>
                router.push(`${process.env.NEXT_PUBLIC_DISCORD_AUTH_URL}`)
              }
            />
          </div>
        )}
        <div className="absolute z-10 top-[20%]">
          <Image
            src="/pants_bundle.png"
            width={128 * (2 / 3)}
            height={128 * (2 / 3)}
          />
        </div>
        <div className="absolute z-10 top-[37%]">
          <p className="text-center text-[#BA8A28] text-3xl">
            Welcome to Pit Boost!
          </p>
        </div>
        <div className="absolute z-10 top-[52%]">
          <button className="bg-[#89610F] rounded-lg py-1 px-2 mx-2">
            Get Started
          </button>
          <button className="bg-[#89610F] rounded-lg py-1 px-2 mx-2">
            Dashboard
          </button>

          <button
            className="bg-[#89610F] rounded-lg py-1 px-4 mx-2"
            onClick={() => {
              router.push("/discord");
            }}
          >
            Discord
          </button>
        </div>
        <div className="w-full h-full bg-black absolute opacity-60"></div>
        <video
          autoPlay={true}
          loop
          muted
          className="object-fill h-screen w-full"
          src="hard_botting.mp4"
        ></video>
      </div>
    </>
  );
};

Home.getInitialProps = async (context) => {
  if (context.req) {
    let token = "";
    console.log(context.req.url);
    if (context.req.url?.startsWith("/?token=")) {
      token = decodeURIComponent(context.req.url.split("=")[1]);
      context.res?.setHeader(
        `Set-Cookie`,
        `token=${encodeURIComponent(
          token
        )}; SameSite=Lax; HttpOnly=true; expries=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 5
        )}`
      );
    } else {
      const cookies = context.req.headers["cookie"]?.split(";");

      if (!cookies || !cookies.length) return { user: null };

      const map = new Map();

      for (const cookie of cookies) {
        const s = cookie.split("=");
        map.set(s[0].trim(), s[1]);
      }

      if (map.has("token")) {
        token = decodeURIComponent(map.get("token"));
      }
    }
    if (token) {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (request.status === 200) {
          const json = await request.json();
          return { user: json };
        } else {
          context.res?.setHeader(
            "Set-Cookie",
            `token=null; expires=${new Date(
              Date.now() - 10000
            )}; SameSite=Strict `
          );
        }
      } catch (e) {
        e;
      }
    }
  }
  return { user: null };
};

export default Home;
