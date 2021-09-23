import QRCodeUtil from 'qrcode';
import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import rainbowOg from '../../../assets/images/rainbow-og.png';

const QRContainer = styled.div`
  height: 375px;
  user-select: none;
`;

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );
};

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel;
  logoMargin?: number;
  logoSize?: number;
  size?: number;
  value?: string;
};

const QRCode = ({
  ecl = 'M',
  logoMargin = 10,
  logoSize = 50,
  size = 200,
  value = 'QR Code',
}: Props) => {
  const dots = useMemo(() => {
    const dots: ReactElement[] = [];
    const matrix = generateMatrix(value, ecl);
    const cellSize = size / matrix.length;
    let qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'white' : 'black'}
            height={cellSize * (7 - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 3) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            ry={(i - 3) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            width={cellSize * (7 - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />
        );
      }
    });

    const clearArenaSize = Math.floor((logoSize + 5) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd &&
                i < j + clearArenaSize / 2 &&
                j < i + clearArenaSize / 2 + 1
              )
            ) {
              dots.push(
                <circle
                  cx={i * cellSize + cellSize / 2}
                  cy={j * cellSize + cellSize / 2}
                  fill="black"
                  key={`circle-${i}-${j}`}
                  r={cellSize / 3} // calculate size of single dots
                />
              );
            }
          }
        }
      });
    });

    return dots;
  }, [ecl, logoSize, size, value]);

  const logoPosition = size / 2 - logoSize / 2;
  const logoWrapperSize = logoSize + logoMargin * 2;

  return (
    <QRContainer>
      <div
        style={{
          height: 0,
          position: 'relative',
          textAlign: 'center',
          top: logoPosition,
        }}
      >
        <img alt="" height={logoSize} src={rainbowOg} width={logoSize} />
      </div>
      <svg height={size} width={size}>
        <defs>
          <clipPath id="clip-wrapper">
            <rect height={logoWrapperSize} width={logoWrapperSize} />
          </clipPath>
          <clipPath id="clip-logo">
            <rect height={logoSize} width={logoSize} />
          </clipPath>
        </defs>
        <rect fill="transparent" height={size} width={size} />
        {dots}
      </svg>
    </QRContainer>
  );
};

export default QRCode;
