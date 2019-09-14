import gql from 'graphql-tag';
// import { withApollo } from 'react-apollo';
import PostEditor from '../../components/PostEditor';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { NextPage } from 'next';
import { useQuery } from 'react-apollo';
import LinearProgress from '@material-ui/core/LinearProgress';
import Error from 'next/error';

const editor: NextPage = () => {
  const router = useRouter();
  const postId = router.query.pid;

  const postQuery = gql`
    query {
      post(id: ${postId}) {
        _id
        title
        content
      }
    }
  `;

  const { loading, data } = useQuery(postQuery);

  if (loading) {
    return <LinearProgress></LinearProgress>;
  } else if (data) {
    return (
      <Layout>
        <PostEditor post={data.post} />
      </Layout>
    );
  }
  return <Error statusCode={404}></Error>;
};

export default editor;
