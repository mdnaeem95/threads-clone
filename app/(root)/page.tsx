import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs"

//app/page.tsx
export default async function Home() {
  const userThreads = await fetchThreads(1, 30);
  const user = await currentUser();

  console.log(userThreads);

  return (
    <div>
      <h1 className="head-text text-left">
        Home
      </h1>

      <section className="mt-9 flex flex-col gap-10">
        {userThreads.threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {userThreads.threads.map((thread) => (
              <ThreadCard 
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  )
}