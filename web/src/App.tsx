import { RouterProvider } from 'react-router-dom';
import routes from '@/routes';
import { Suspense } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Loading';
import { Flower } from 'lucide-react';

const App = styled.div`
  min-height: 100vh;
`;
const Content = styled.div`
  margin: 0 auto;
  @media (min-width: 1280px) {
    width: 1280px;
  }
  @media (min-width: 896px) {
    width: 896px;
  }
`;

export default function () {
  return (
    <App>
      <Suspense
        fallback={
          <Loading>
            <Flower size={128} stroke="green" />
          </Loading>
        }
      >
        <Content>
          <RouterProvider router={routes} />
        </Content>
      </Suspense>
    </App>
  );
}
