import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../dialog.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private dialogService: DialogService) { }

  onFileSelected(event: any) {
    const label = event.target.nextElementSibling;
    this.selectedFile = event.target.files[0];
    label.innerHTML = this.selectedFile?.name;
  }

  onUpload() {
    if (!this.selectedFile) {
      this.dialogService.showErrorDialog("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile as File);


    this.http.post('http://localhost:8080/rolemanagement/massupload', formData)
      .subscribe(
        (response: any) => {
          console.log(response);

          response && response.message === "Success" ? this.dialogService.showSuccessDialog("File uploaded successfully!") : this.dialogService.showErrorDialog("Error uploading file.Please try again");


        },
        (error: HttpErrorResponse) => {

          console.error('Error uploading file:', error);
          if (error.error && typeof error.error === 'string') {
            this.dialogService.showErrorDialog(error.error)
          }
          if (error.error && typeof error.error === 'object') {
            const errorMap = error.error;
            for (const key in errorMap) {
              if (errorMap.hasOwnProperty(key)) {
                this.dialogService.showErrorDialog(`${errorMap[key]}`);
              }
            }

          }
          // if (error.status === 400) {
          //   this.dialogService.showErrorDialog('Please upload a file first.')

          // }


        },

      );
  }

}

