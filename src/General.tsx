import printJS from 'print-js';
import fileDownload from "js-file-download";

export const printFunction = (buffer: ArrayBuffer) => {
  // Create a Blob with the correct type and data
  const file = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });

  // Create an object URL from the Blob
  const url = URL.createObjectURL(file);

  // Use printJS to print the document
  printJS(url);

  // Optionally, revoke the object URL after printing
  URL.revokeObjectURL(url);
};

export const downloadFunction = (buffer:any, filename:string) => {
  const file = new Blob([new Uint8Array(buffer)], {
    type: "application/pdf",
  });
  // const url = URL.createObjectURL(file);
  // return url;
  console.log(filename);
  fileDownload(file, `${filename}.pdf`);
};
