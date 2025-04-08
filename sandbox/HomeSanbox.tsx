// export const revalidate = 5 ревалидация для продакшн билда каждые 5 секунд если есть какой то запрос
// export const dynamic = "force-dynamic" ревалидация для продакшн билда при каждом обновлении страницы

import getPosts from "@/server/actions/get-posts";
import createPost from "@/server/actions/create-post";
import PostButton from "@/components/PostButton/PostButton";

export default async function Home() {
    const {error, success} = await getPosts()
    if (error) {
        throw new Error(error);
    }
    // cookies() ревалидация для продакшн билда при каждом обновлении страницы
    if (success)
        return (
            <div>
                {success?.map((post) => (
                    <div key={post.id}>
                        {post.title}
                    </div>
                ))}
                <form action={createPost}>
                    <input className='bg-black' type="text" name='title' placeholder='Title'/>
                    <PostButton/>
                </form>
            </div>
        );
}
