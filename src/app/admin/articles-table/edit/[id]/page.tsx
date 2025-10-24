import { getSingleArticle } from '@/apiCalls/articleApiCall';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EditArticleFrom from './EditArticleFrom';

interface SingleArticlePageProps {
  params: {id:string}
}

const SingleArticlePage = async({params}:SingleArticlePageProps) => {
  const token = cookies().get('jwtToken')?.value;
  if (!token) return redirect('/');

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) {
    return redirect('/')
  }

  const article: Article = await getSingleArticle(params.id)
  
  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
      <div className='shadow p-4 bg-purple-200 rounded w-full'>
        <h1 className='text-2xl text-green-700 font-semibold mb-4'>
          Edit Article
        </h1>
        <EditArticleFrom article={article} />
      </div>
    </section>
  )
}

export default SingleArticlePage