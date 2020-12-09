import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonIcon,
  IonButtons,
  IonButton,
  IonProgressBar,
} from '@ionic/react';
=======
import { IonHeader, IonContent, IonToolbar, IonTitle, IonLoading, IonIcon, IonButtons, IonButton, IonProgressBar } from '@ionic/react';
import { State } from '../store';
>>>>>>> Prettier
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { document as documentIcon } from 'ionicons/icons';
import { useHistory } from 'react-router';
<<<<<<< HEAD
import { Page, pdfjs, Document as PdfDocument } from 'react-pdf';
=======
import { Document, Page, pdfjs } from 'react-pdf';

import './ModalDocument.scoped.css';
>>>>>>> Prettier

import QRCodeComponent from './QRCodeComponent';
import checkSignature from '../utils/checkSignature';
import { State, Document } from '../store';

import './ModalDocument.scoped.css';

interface ModalDocumentProps {
  registryUri: string;
  bagId: string;
  bags: State['bags'];
  bagsData: State['bagsData'];
  loadBag: (registryUri: string, bagId: string) => void;
}

const ModalDocumentComponent: React.FC<ModalDocumentProps> = (
  props: ModalDocumentProps
) => {
  const history = useHistory();
  const pdfcontent64 = '';
  const [page, setPage] = useState<number>();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
    pdfjs.version
  }/pdf.worker.js`;

  useEffect(() => {
    props.loadBag(props.registryUri, props.bagId);
  });

  const renderLoading = () => {
    return <IonProgressBar color="secondary" type="indeterminate" />;
  };

<<<<<<< HEAD
  const document = props.bagsData[props.registryUri + '/' + props.bagId];
  let signedDocument: Document | undefined;
  if (document) {
    signedDocument = {
      ...document,
      data: Buffer.from(document.data, 'utf-8').toString('base64'),
    };
  }
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Document Viewer</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                history.replace('/doc', { direction: 'back' });
              }}
            >
              Close
<<<<<<< HEAD
            </IonButton>
          </IonButtons>
          <IonIcon icon={documentIcon} slot="start" size="large" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {document ? (
          <PdfDocument
            file={'data:application/pdf;base64,' + pdfcontent64}
            loading={renderLoading}
          >
            <Page pageNumber={page} pageIndex={0} />
          </PdfDocument>
        ) : (
          <React.Fragment />
        )}
        {typeof document === 'undefined' ? (
          <IonLoading isOpen={true} />
        ) : (
          undefined
        )}
        {document === null ? (
          <span>No document attached</span>
        ) : (
          <div className="qrCodeContainer">
            <QRCodeComponent
              url={`http://localhost:3000/doc/show/${props.registryUri}/${
                props.bagId
              }`}
            />
=======
=======
  const document = props.bagsData[props.registryUri + "/" + props.bagId];
  return <>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Document Viewer</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => {
            history.replace('/doc', { direction: 'back' })
          }}>
            Close
>>>>>>> Prettier
          </IonButton>
        </IonButtons>
        <IonIcon icon={documentIcon} slot="start" size="large"></IonIcon>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {
        document ?
          <Document file={"data:application/pdf;base64," + document.data} loading={renderLoading}>

            <Page pageNumber={page} pageIndex={0} />
          </Document> : <React.Fragment></React.Fragment>
      }
      {
        typeof document === 'undefined' ?
          <IonLoading isOpen={true}></IonLoading> : undefined
      }
      {
        document === null ?
          <span>No document attached</span> :
          <div className="qrCodeContainer">
            <QRCodeComponent url={`http://localhost:3000/doc/show/${props.registryUri}/${props.bagId}`} />
          </div>
      }
      {
<<<<<<< HEAD
        document?
        <div className="document">
          <div className="left">
            {
              ['image/png', 'image/jpg', 'image/jpeg'].includes(document.mimeType) ?
              <img
                alt={document.name}
                src={`data:${document.mimeType};base64, ${document.data}`}
              ></img> :<React.Fragment></React.Fragment>
            }
>>>>>>> Added qr code scanner, yarn.lock
          </div>
        )}
        {document ? (
          <div>
            <div className="document">
              <div className="left">
                {['image/png', 'image/jpg', 'image/jpeg'].includes(
                  document.mimeType
                ) ? (
                  <img
                    alt={document.name}
                    src={`data:${document.mimeType};base64, ${document.data}`}
                  />
                ) : (
                  <React.Fragment />
                )}
              </div>
              <div className="right">
                <h5>
                  {props.bagsData[props.registryUri + '/' + props.bagId].name}
                </h5>
                <h5>
                  {
                    props.bagsData[props.registryUri + '/' + props.bagId]
                      .mimeType
                  }
                </h5>
              </div>
            </div>
            {Object.keys(document.signatures).map(s => {
              return (
                <p>
                  signature n°{s}:{' '}
                  {checkSignature(signedDocument as Document, s)
                    ? `✓ verified (${document.signatures[s].publicKey.slice(
                        0,
                        12
                      )}…)`
                    : `✗ invalid (${document.signatures[s].publicKey.slice(
                        0,
                        12
                      )}…)`}
                </p>
              );
            })}
          </div>
        ) : (
          undefined
        )}
      </IonContent>
    </>
  );
};
=======
        document ?
          <div className="document">
            <div className="left">
              {
                ['image/png', 'image/jpg', 'image/jpeg'].includes(document.mimeType) ?
                  <img
                    alt={document.name}
                    src={`data:${document.mimeType};base64, ${document.data}`}
                  ></img> : <React.Fragment></React.Fragment>
              }
            </div>
            <div className="right">
              <h5>{props.bagsData[props.registryUri + "/" + props.bagId].name}</h5>
              <h5>{props.bagsData[props.registryUri + "/" + props.bagId].mimeType}</h5>
            </div>
          </div> : undefined
      }
    </IonContent>
  </>
}
>>>>>>> Prettier

const ModalDocument = connect(
  (state: State) => {
    return {
      bags: state.bags,
      bagsData: state.bagsData,
    };
  },
  (dispatch: Dispatch) => {
    return {
      loadBag: (registryUri: string, bagId: string) => {
        dispatch({
          type: 'LOAD_BAG_DATA',
          payload: {
            registryUri: registryUri,
            bagId: bagId,
          },
        });
      },
    };
  }
)(ModalDocumentComponent);

export default ModalDocument;
