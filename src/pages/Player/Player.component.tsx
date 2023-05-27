import { useQuery } from '@tanstack/react-query';
import Title from '../../component/presentation/Title.component';
import { IServiceResult, IVisulInfo } from '../../general/interface';
import { GetCurrentVisualInfoAddress } from '../../general/serviceAddress';
import { PlayerContent } from '../../component/presentation/PlayerContent.component';
import Layout from '../../component/presentation/Layout.component';

export default function Player() {
  const { data: serviceResult } = useQuery<IServiceResult<IVisulInfo>>({
    queryKey: ['getCurrent'],
    queryFn: () => fetch(GetCurrentVisualInfoAddress).then((res) => res.json()),
  });
  return (
    <Layout>
      <Title text='Video Player' />     
       <PlayerContent serviceResult={serviceResult?.data || defaultValue} />
    </Layout>
  );
}

const defaultValue = {
  text: 'Hello',
  position: { x: 0, y: 0 },
  timeStamp: '',
};
