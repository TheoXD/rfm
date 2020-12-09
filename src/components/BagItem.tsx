import { connect } from 'react-redux';
import React from 'react';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
<<<<<<< HEAD
  IonItemOption,
  IonButton,
=======
  IonItemOption
<<<<<<< HEAD
>>>>>>> Prettier
=======
>>>>>>> ccfd166b42ba613e70eb84a8a5ce67423c5faf9a
} from '@ionic/react';

import { useHistory } from 'react-router';
import { Bag } from '../store';
import './BagItem.scoped.css';

import { document as documentIcon, trash, create } from 'ionicons/icons';

interface BagItemProps {
  bag: Bag;
  registryUri: string;
  id: string;
  awaitsSignature: boolean;
}

const BagItemComponent: React.FC<BagItemProps> = ({
  awaitsSignature,
  registryUri,
  id,
}) => {
  const history = useHistory();
  return (
    <IonItemSliding>
      <IonItemOptions side="end">
        <IonItemOption
          color="secondary"
          onClick={() => console.log('favorite clicked')}
        >
          <IonIcon icon={create} size="large" />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => console.log('share clicked')}
        >
          <IonIcon icon={trash} size="large" />
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        detail={false}
        button
        onClick={() => {
          history.push('/doc/show/' + registryUri + '/' + id);
        }}
      >
        <div className="IconContainer">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <IonIcon icon={documentIcon} size="large" />
=======
          <IonIcon icon={documentIcon} color="secondary" size="large"/>
>>>>>>> Added qr code scanner, yarn.lock
=======
          <IonIcon icon={documentIcon} color="secondary" size="large" />
>>>>>>> Prettier
=======
          <IonIcon icon={documentIcon} color="secondary" size="large" />
>>>>>>> ccfd166b42ba613e70eb84a8a5ce67423c5faf9a
        </div>
        <IonLabel className="ion-text-wrap">
          <h2>{id}</h2>
        </IonLabel>
        {awaitsSignature && (
          <IonButton color="secondary" size="small">
            Needs signature
          </IonButton>
        )}
      </IonItem>
    </IonItemSliding>
  );
};

const BagItem = connect(
  undefined,
  undefined
)(BagItemComponent);

export default BagItem;
