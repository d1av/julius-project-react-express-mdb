import { useEffect, useState } from "react";
import { Placeholder } from "../assets/images";
import { Footer, HeaderContainer, NewsLetter, Post } from "../shared";
import { IOnePostFormat } from "../shared/dto/PostDto";
import { PostService } from "../shared/services";

export default function Home() {
  const postService = new PostService();

  useEffect(() => {
    callPostsFromApi();
  }, []);

  const [posts, setPosts] = useState([
    {
      title: "",
      imgUrl: "",
      description: "",
    },
  ]);

  async function callPostsFromApi() {
    const { data } = await postService.loadPosts();
    setPosts(data);
  }

  return (
    <div>
      <HeaderContainer />

      {posts.map((post: IOnePostFormat, index: any) => (
        <Post
          key={index}
          title={post.title}
          imgUrl={post.imgUrl ? post.imgUrl : Placeholder.src}
          description={post.description}
        />
      ))}
      <NewsLetter />
      <Footer />
    </div>
  );
}
