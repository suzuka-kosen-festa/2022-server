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
   obId: string;
};

export type ExportSponsor = {
   email: string;
   sponsorId: string;
};
