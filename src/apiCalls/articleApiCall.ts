import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed To Fetch Articles");
  }

  return response.json()
}

export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed To Fetch Articles");
  }

  const { count } = await response.json() as { count: number };

  return count
}

export async function getArticlesBasedOnSearch(searchText: string): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed To Fetch Articles");
  }

  return response.json()
}

export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed To Fetch Articles");
  }

  return response.json()
}