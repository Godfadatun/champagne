import NumaIntegration from '../Integrations/numa.integration';

interface ServiceInterface {
  initiateNumaAuth(): Promise<any>;
}

const Service: ServiceInterface = {
  async initiateNumaAuth() {
    return NumaIntegration.authorizeNumaAPIs();
  },
};

export default Service;
