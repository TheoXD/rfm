import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import * as rchainToolkit from 'rchain-toolkit';
import {
  IonItem,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonButton,
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';

import { useHistory } from 'react-router';
import './Horizontal.scoped.css';
import { State } from '../store';

interface HorizontalProps {
  privateKey: string;
  registryUri: string;
  searchText: string;
  init: (a: { privateKey: string; registryUri: string }) => void;
  setSearchText: (searchText: string) => void;
}

const HorizontalComponent: React.FC<HorizontalProps> = props => {
  const history = useHistory();

  const doFetch = () => {
    props.init({
      privateKey: props.privateKey,
      registryUri: props.registryUri,
    });
  };

  useEffect(() => {
    doFetch();
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    doFetch();
    event.detail.complete();
  };

  return (
    <React.Fragment>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonItem
        detail={false}
        no-padding
        lines="none"
        className="SearchBarContainer"
      >
        <IonButton
          className="AddButton with-border"
          icon-only
          slot="start"
          color="none"
          size="default"
          onClick={() => {
            history.push('/doc/upload/');
          }}
        >
          <span>upload</span>
        </IonButton>
        <IonSearchbar
          color="none"
          value={props.searchText}
          onIonChange={e => props.setSearchText(e.detail.value!)}
        />
      </IonItem>
    </React.Fragment>
  );
};

const Horizontal = connect(
  (state: State) => {
    return {
      privateKey: state.privateKey as string,
      registryUri: state.registryUri as string,
      searchText: state.searchText as string,
    };
  },
  (dispatch: Dispatch) => {
    return {
      init: (a: { privateKey: string; registryUri: string }) => {
        dispatch({
          type: 'INIT',
          payload: {
            ...a,
            publicKey: rchainToolkit.utils.publicKeyFromPrivateKey(
              a.privateKey as string
            ),
          },
        });
      },

      setSearchText: (searchText: string) => {
        dispatch({
          type: 'SET_SEARCH_TEXT',
          payload: searchText,
        });
      },
    };
  }
)(HorizontalComponent);

export default Horizontal;
