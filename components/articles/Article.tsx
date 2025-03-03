import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, FolderOpen, Megaphone } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "Collect your testimonials in 3 clicks",
    description: "Effortlessly gather feedback from your satisfied customers.",
    icon: ClipboardList,
    color: "from-pink-500 to-rose-500",
    id: "collect",
  },
  {
    title: "How to manage testimonials easily",
    description: "Organize and curate your testimonials with ease.",
    icon: FolderOpen,
    color: "from-purple-500 to-indigo-500",
    id: "manage",
  },
  {
    title: "Share testimonials in seconds",
    description: "Display your testimonials beautifully on your website.",
    icon: Megaphone,
    color: "from-blue-500 to-cyan-500",
    id: "share",
  },
];

export default function Article() {
  return (
    <div className="md:px-4 w-screen lg:px-56 max-w-[1750px]">
      <div className="px-4 py-20 md:pt-20 w-full">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 max-w-xl">
              Boost Your Business with ViewUs
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 justify-center items-center gap-8  w-full ">
            {articles.map((article, index) => (
              <Link
                key={index}
                href={`/blogs/${article.id}`}
                className="w-full h-full"
              >
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl w-full h-full cursor-pointer"
                >
                  <CardContent className="p-0 h-full">
                    <div
                      className={`p-6 bg-gradient-to-br ${article.color} min-h-[65%]`}
                    >
                      <article.icon className="w-12 h-12 text-white mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {article.title}
                      </h3>
                    </div>
                    <div className="p-6 bg-white">
                      <p className="text-gray-600">{article.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
