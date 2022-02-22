export type ModalState = {
  show: boolean;
  id: string | null;
};

export interface IModalPopup {
  modal: ModalState;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}

export interface userState {
  entities: {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: {
      city?: string;
    };
  }[];
  loading: boolean;
  error: boolean;
}

export interface TableContentProps {
  loading: boolean;
  error: boolean;
  usersAmount: number;
  handleShow: (id: string) => void;
  users: userState;
}

export interface IUsersTable {
  users: userState;
  handleShow: (id: string) => void;
}
