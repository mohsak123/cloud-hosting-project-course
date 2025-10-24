import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticlesInput from "@/components/articles/SearchArticlesInput";
import { ARTICLE_PARE_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
import prisma from '@/utils/db';

interface ArticlePageProps {
  searchParams: {
    pageNumber: string
  }
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {

  const { pageNumber } = searchParams

  const articles: Article[] = await getArticles(pageNumber);
  // const count: number = await getArticlesCount();
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PARE_PAGE);

  return (
    <section className="h-[calc(100vh-170px)] container m-auto px-5">
      <SearchArticlesInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      {
        pages !== 1 && (
          <Pagination pageNumber={parseInt(pageNumber)} pages={pages} router="/articles" />
        )
      }
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming",
};
