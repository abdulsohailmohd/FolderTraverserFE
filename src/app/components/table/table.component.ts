import { Component, OnInit } from '@angular/core';
import { FolderStructureService } from '../../services/folder-structure.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableRows: object[];
  currentPath: string = "";
  directoryName: string = "";
  showNewFolderOpt: boolean;
  showFileUpload: boolean;

  // fileName: string = "";
  createdBy: string = "";
  formData: FormData = new FormData();
  constructor(private folderService: FolderStructureService) { }

  changeFolder(path: string) {
    this.getData(path);
  }
  ngOnInit() {
    this.currentPath = "D:\\";
    // this.directoryName = "";
    this.showNewFolderOpt = false;
    this.getData("");
  }
  getData(path: string) {
    this.folderService.getFolderContents(path).subscribe(data => {
      this.tableRows = data;
      if (path !== "")
        this.currentPath = path;
    });
  }

  goBack() {

    if (!this.currentPath.endsWith("\\")) {
      this.currentPath = this.currentPath + "\\";
    }

    let pathArray = this.currentPath.split("\\");

    pathArray.pop();
    pathArray.pop();

    if (pathArray.length > 0) {
      this.getData(pathArray.join("\\") + "\\");
    }

    // let pathArray = this.currentPath.split("\\");
    // if (pathArray.length > 2) {
    //   let path = pathArray.slice(0, pathArray.length - 1).join("\\");
    //   if (!path.endsWith("\\")) {
    //     path = path + "\\";
    //   }
    //   this.getData(path);
    // }
  }

  goHome() {
    this.getData("D:\\");
  }

  getIcon(type: string) {
    if (type === "DIR") {
      return "mdi-folder";
    }
    else {
      return "mdi-file";
    }
  }

  cancelNewFolder() {
    this.showNewFolderOpt = false;
    this.createdBy = "";
    this.formData = new FormData();
    this.directoryName = "";
  }

  createNewFolder() {

    this.formData.append('createdBy', this.createdBy);
    this.formData.append('directoryName', this.directoryName);
    this.formData.append('path', this.currentPath);
    this.folderService.createNewFolder(this.formData).subscribe(data => {
      this.showNewFolderOpt = false;
      this.getData(this.currentPath);
      this.cancelNewFolder();
    });
  }

  uploadFile() {
    console.log("yayy");

    this.formData.append('path', this.currentPath);
    this.formData.append('createdBy', this.createdBy);

    this.folderService.uploadFile(this.formData).subscribe(data => {
      this.getData(this.currentPath);
      this.resetFileUpload();
    });
  }


  onFileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData.append('file', file);
    }
  }

  resetFileUpload() {
    this.createdBy = "";
    // this.formData.delete('fileName');
    this.formData = new FormData();
    this.showFileUpload = false;
  }

  refresh() {
    this.getData(this.currentPath);
  }
}
