export function exec (command) {
  var task = NSTask.alloc().init()
  var pipe = NSPipe.pipe()
  var errPipe = NSPipe.pipe()

  task.setLaunchPath_('/bin/bash')
  task.setArguments_(NSArray.arrayWithObjects_('-c', command, null))
  task.standardOutput = pipe
  task.standardError = errPipe
  task.launch()

  const errData = errPipe.fileHandleForReading().readDataToEndOfFile()
  const data = pipe.fileHandleForReading().readDataToEndOfFile()

  if (task.terminationStatus() != 0) {
    const message = errData != null && errData.length()
      ? NSString.alloc().initWithData_encoding_(errData, NSUTF8StringEncoding)
      : 'Unknow error'
    return NSException.raise_format_('failed', message)
  }
  return NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding)
}

export function openFile () {
  // Ask user to select a Sketch file:
  const openDialog = NSOpenPanel.openPanel()
  openDialog.setCanChooseFiles(true)
  openDialog.setAllowedFileTypes(['js'])
  openDialog.setCanChooseDirectories(false)
  openDialog.setAllowsMultipleSelection(false)
  openDialog.setCanCreateDirectories(false)
  openDialog.setTitle('Select the source Sketch document')

  return {
    res: openDialog.runModal(),
    url: openDialog.URL()
  }
}

function showErrorAlert (error) {
  var alert = NSAlert.alloc().init()
  alert.informativeText = '' + error
  alert.messageText = 'Failed...'
  alert.addButtonWithTitle('OK')
  alert.runModal()
}

export function loadReactFile (context, path, React, ReactSketchApp) {
  try {
    const resourceFolder = context.plugin.url().path() + '/Resources'
    eval(exec(`cd ${resourceFolder} && ./node_modules/.bin/rollup -c ./rollup.config.js ${path}`) + ';if (code.isReactComponent || typeof code === "function") { code = React.createElement(code, {}) } ReactSketchApp.render(code, context)')
  } catch (err) {
    console.log(err)
    showErrorAlert(err)
  }
}
