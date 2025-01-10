// Declaring the module to help TypeScript recognize autoTable
import { jsPDF } from "jspdf";

// Extending jsPDF to include autoTable method
declare module "jspdf" {
  interface jsPDF {
    autoTable: any; // add autoTable as a method to jsPDF
    lastAutoTable?: { finalY: number };
  }
}

import "jspdf-autotable"; // Importing the autoTable plugin
