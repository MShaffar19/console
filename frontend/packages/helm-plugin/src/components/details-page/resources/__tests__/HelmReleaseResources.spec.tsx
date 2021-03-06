import * as React from 'react';
import { shallow } from 'enzyme';
import { MultiListPage } from '@console/internal/components/factory';
import { mockHelmReleases } from '../../../__tests__/helm-release-mock-data';
import HelmReleaseResources from '../HelmReleaseResources';

jest.mock('react-i18next', () => {
  const reactI18next = require.requireActual('react-i18next');
  return {
    ...reactI18next,
    useTranslation: () => ({ t: (key) => key }),
  };
});

describe('HelmReleaseResources', () => {
  const match = {
    params: { ns: 'default', name: 'nodejs-example' },
    isExact: true,
    path: '',
    url: '',
  };

  const helmReleaseResourcesProps: React.ComponentProps<typeof HelmReleaseResources> = {
    match,
    customData: mockHelmReleases[0],
  };

  const helmReleaseResources = shallow(<HelmReleaseResources {...helmReleaseResourcesProps} />);
  it('should render the MultiListPage component', () => {
    expect(helmReleaseResources.find(MultiListPage).exists()).toBe(true);
  });
});
