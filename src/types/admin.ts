export type ExportStudentGuest = {
   email: string;
   guest: Array<{ name: string; guestId: string }> | [];
};

export type ExportJhsGuest = {
   email: string;
   jhsId: string;
   parents: Array<{ name: string; guestId: string }> | [];
};

export type ExportOb = {
   email: string;
   name: string;
   obId: string;
};

export type ExportSponsor = {
   email: string;
   name: string;
   sponsorId: string;
};
