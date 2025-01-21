import { BlogCard } from "../../Components";
import { content } from "./content";

export const BlogSection = () => {
  return (
    <div className="lg:px-0 px-2 md:px-6 space-y-6 pt-10 md:pt-0 pb-16">
      <div>
        <h2 className="md:text-3xl text-lg font-bold tracking-wider pb-4">
          Our Blogs
        </h2>
        <hr />
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {content.map((item) => {
          return (
            <BlogCard
              title={item.title}
              image={item.image}
              link={item.link}
              date={item.date}
            />
          );
        })}
      </div>
    </div>
  );
};
