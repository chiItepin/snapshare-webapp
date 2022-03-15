import React, { FunctionComponent } from 'react';
import withAuth from '../components/HOC/withAuth';

const PostsList: FunctionComponent = () => (
  <>
    made it PostsList!
  </>
);

export default withAuth(PostsList);
