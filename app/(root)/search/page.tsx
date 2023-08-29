import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

async function SearchPage() {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
  
    const users = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })
  
  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>
  
        <div className="mt-14 flex flex-col gap-9">
            {users.users.length === 0 ? (
                <p className="no-result">No users</p>
            ) : (
                <>
                    {users.users.map((user) => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            imgUrl={user.image}
                            userType='User' />
                    ))}
                </>
            )}
        </div>
    </section>
    )
}

export default SearchPage