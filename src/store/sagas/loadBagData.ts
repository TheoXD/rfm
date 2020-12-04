import { takeEvery, put } from 'redux-saga/effects';
import * as rchainToolkit from 'rchain-toolkit';
import { inflate } from 'pako';

import { store, State } from '../../store/'

const {
  readBagOrTokenDataTerm,
} = require('rchain-token-files');

const loadBagData = function* (action: { type: string; payload: any}) {
  console.log('load-bag-data', action.payload);
  const state: State = store.getState();
  if (state.bagsData[action.payload.bagId]) {
    return true;
  }
  yield put(
    {
      type: "SET_LOADING_BAG_DATA",
      payload: true
    }
  );

  const term = readBagOrTokenDataTerm(state.registryUri, 'bags', action.payload.bagId);
  console.log(term);
  const ed = yield rchainToolkit.http.exploreDeploy(
    state.readOnlyUrl,
    {
      term: term
    }
  );

  try {
    const dataAtNameBuffer = Buffer.from(rchainToolkit.utils.rhoValToJs(JSON.parse(ed).expr[0]), 'base64');
    console.log(dataAtNameBuffer)
    // pako.inflate returns a UInt8Array
    const unzippedBuffer = Buffer.from(inflate(dataAtNameBuffer));
    console.log(1, unzippedBuffer)
    const fileAsString = unzippedBuffer.toString("utf-8");
    console.log(2, fileAsString)
    const fileAsJson = JSON.parse(fileAsString);
    console.log(3, fileAsJson)
    yield put(
      {
        type: "SAVE_BAG_DATA_COMPLETED",
        payload: {
          bagId: action.payload.bagId,
          document: fileAsJson,
        }
      }
    );
  } catch (err) {

  }

  yield put(
    {
      type: "SET_LOADING_BAG",
      payload: false
    }
  );

  return true;
};

export const loadBagDataSaga = function* () {
  yield takeEvery("LOAD_BAG_DATA", loadBagData);
};
