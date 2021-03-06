import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Status, {
  StatusPopupSection,
} from '@console/shared/src/components/dashboard/status-card/StatusPopup';
import HealthItem from '@console/shared/src/components/dashboard/status-card/HealthItem';
import {
  healthStateMapping,
  HealthState,
} from '@console/shared/src/components/dashboard/status-card/states';
import { SubsystemHealth } from '@console/plugin-sdk';
import { getWorstStatus } from '@console/app/src/components/dashboards-page/status';
import { StatusType } from '../../constants';

type ObjectServiceStatusProps = {
  RGWMetrics: SubsystemHealth;
  MCGMetrics: SubsystemHealth;
  statusType: StatusType;
};

export const ObjectServiceStatus: React.FC<ObjectServiceStatusProps> = ({
  RGWMetrics,
  MCGMetrics,
  statusType,
}) => {
  const { t } = useTranslation();

  const isMissing = !(RGWMetrics && MCGMetrics);
  const title =
    statusType === StatusType.HEALTH
      ? t('noobaa-storage-plugin~Object Service')
      : t('noobaa-storage-plugin~Data Resiliency');
  const popupTitle =
    statusType === StatusType.HEALTH
      ? t('noobaa-storage-plugin~Object Service Status')
      : t('noobaa-storage-plugin~Data Resiliency');
  const { state = HealthState.LOADING, message = '' } = !isMissing
    ? getWorstStatus([RGWMetrics, MCGMetrics], t)
    : {};
  return isMissing ? (
    <HealthItem
      title={title}
      state={RGWMetrics?.state || MCGMetrics?.state}
      details={RGWMetrics?.message || MCGMetrics?.message}
    />
  ) : (
    <HealthItem title={title} state={state} details={message} popupTitle={popupTitle}>
      {statusType === StatusType.HEALTH
        ? t('noobaa-storage-plugin~The object service includes 2 services.')
        : t('noobaa-storage-plugin~The data resiliency includes 2 services')}
      <StatusPopupSection
        firstColumn={t('noobaa-storage-plugin~Services')}
        secondColumn={t('noobaa-storage-plugin~Status')}
      >
        <Status icon={healthStateMapping[MCGMetrics.state]?.icon}>Multicloud Object Gateway</Status>
        <Status icon={healthStateMapping[RGWMetrics.state]?.icon}>Object Gateway (RGW)</Status>
      </StatusPopupSection>
    </HealthItem>
  );
};
