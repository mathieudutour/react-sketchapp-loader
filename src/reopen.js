import { exec, loadReactFile } from './utils'
import prefsManager from 'sketch-module-user-preferences'

import React from 'react'
import ReactSketchApp from 'react-sketchapp'

export default function (context) {
  const preferences = prefsManager.getUserPreferences('react-loader', {
    lastOpened: 'nothing-opened'
  })
  if (preferences.lastOpened && preferences.lastOpened != 'nothing-opened') {
    loadReactFile(context, preferences.lastOpened, React, ReactSketchApp)
  } else {
    context.document.showMessage('You haven\'t opened any react file yet')
  }
}
