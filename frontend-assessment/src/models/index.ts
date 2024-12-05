export interface ProjectDetails {
    sNo: number; 
    title: string; 
    blurb: string; 
    by: string; 
    amtPledged: number; 
    numBackers: number; 
    percentageFunded: number; 
    country: string;
    state: string; 
    currency: string; 
    endTime: string; 
    location: string; 
    type: string; 
    url: string; 
  }

  export interface TableProps {
    data: {
      sNo: number;
      percentageFunded: number;
      amountPledged: number;
    }[] | any;
  }

  export interface ModalProps {
    title: string; 
    description: string |any; 
    type: "error" | "success"; 
    onClose?: () => void; 
  }