import gql from 'graphql-tag';
// import { withApollo } from 'react-apollo';
import PostEditor from '../../components/PostEditor';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { NextPage } from 'next';
import { useQuery } from 'react-apollo';

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

  // const { loading, error, data } = useQuery(postQuery);
  const { data } = useQuery(postQuery);

  return (
    <Layout>
      <PostEditor post={data.post} />
    </Layout>
  );
};

export default editor;
