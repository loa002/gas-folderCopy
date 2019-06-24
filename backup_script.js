function Backup() {
  var backUpFolder = DriveApp.getFolderById('');//バックアップするフォルダのID
  var savePlaceFolder = DriveApp.getFolderById('');//バックアップ作成先フォルダ
  var files = backUpFolder.getFiles();//ファイルイテレータの取得
  var folders = backUpFolder.getFolders();//フォルダイテレータの取得
  
  var mainBackUpFolder = savePlaceFolder.createFolder(backUpFolder.getName() + '-' + Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd-HH-mm'));//バックアップフォルダ作成
  
  copy(backUpFolder,mainBackUpFolder);
}

function copy(srcFolder, newFolder){
  var srcFiles = srcFolder.getFiles();//フォルダ内ファイルをゲット
  while(srcFiles.hasNext()) {
    var srcFile = srcFiles.next();
    srcFile.makeCopy(srcFile.getName(), newFolder);
  }
  var srcFolders = srcFolder.getFolders();//フォルダ内フォルダをゲット
  while(srcFolders.hasNext()) {
    var nextSrcFolder = srcFolders.next();
    var nextNewFolder = newFolder.createFolder(nextSrcFolder.getName());
    copy(nextSrcFolder, nextNewFolder);//再帰
  }
}