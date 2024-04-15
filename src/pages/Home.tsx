import Clients from '../component/Clients';
import AddClientModal from '../component/AddClientModal';
import Projects from '../component/Projects';
import AddProjectModal from '../component/AddProjectModal';

const Home = () => {
  return (
    <>
      <Clients />
      <AddClientModal />
      <Projects />
      <AddProjectModal />
    </>
  );
};

export default Home;
