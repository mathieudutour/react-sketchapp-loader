import { exec, openFile, loadReactFile } from './utils'
import prefsManager from 'sketch-module-user-preferences'

import React from 'react'
import ReactSketchApp from 'react-sketchapp'

export default function (context) {
  const {res, url} = openFile()
  if (res == NSOKButton) {
    loadReactFile(context, url.path(), React, ReactSketchApp)
    prefsManager.setUserPreferences('react-loader', {
      lastOpened: url.path()
    })
  }
}
