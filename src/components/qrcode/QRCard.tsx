import React from 'react';
import styled from 'styled-components';
import QRCode from './QRCode';

const Content = styled.div<{ showQR?: boolean; size?: number }>`
  border-radius: 39px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  height: ${({ size }) => (size ? `${size}px` : '200px')};
  width: ${({ size }) => (size ? `${size}px` : '200px')};
  opacity: ${({ showQR }) => (showQR ? 1 : 0)};
  padding: 8px;
  transition: 0.225s ease;
  position: 'absolute';
`;

const QRCard = ({
  value,
  showQR,
  size,
}: {
  value: string;
  showQR: boolean;
  size?: number;
}) => {
  return (
    <Content showQR={showQR} size={size}>
      <QRCode size={size} value={value} />
    </Content>
  );
};

export default QRCard;
