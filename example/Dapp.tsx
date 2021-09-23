import 'react-app-polyfill/ie11';
import * as React from 'react';
import './App.css';
import { useMemo, useState } from 'react';
import DappV1 from './dapps/v1';
import { Button, Wrapper } from './styled';

const Dapp = () => {
  const [version, setVersion] = useState('v1');

  const renderDapp = useMemo(() => {
    if (version === 'v1') return <DappV1 />;
  }, [version]);

  return (
    <div className="body">
      <h1 className="text-center">Rainbow Button Dapp</h1>
      {version && renderDapp}
      {!version && (
        <div>
          <h2 className="text-center">Choose a RainbowButton</h2>
          <Wrapper>
            <Button
              className="button"
              key="v1"
              onClick={() => setVersion('v1')}
            >
              RainbowButton WC v1
            </Button>
          </Wrapper>
        </div>
      )}
    </div>
  );
};

export default Dapp;
