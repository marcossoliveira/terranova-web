export interface TicketModel {
  id: number;
  ticketType: 'support' | 'denounce' | 'donation_receipt' | 'whatsapp';
  player: string;
  userId: number;
  username?: string | null;
  avatar?: string | null;
  userType?: 'admin' | 'staff' | 'mod' | null; 
  title: string;
  description: string;
  attachments?: string | null | undefined;
  status: 'pending' | 'ongoing' | 'closed';
  conclusion: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketCommentModel {
  id: number;
  ticket: number;
  player: string | null;
  user: number | null;
  username: string | null;
  avatar: string | null;
  userType: 'admin' | 'staff' | 'mod' | null;
  description: string;
  attachments?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export const getTicketType = (ticketType: TicketModel['ticketType']) => {
  switch (ticketType) {
    case 'support':
      return 'Suporte';
    case 'denounce':
      return 'Denúncia';
    case 'donation_receipt':
      return 'Comprovante de doação';
    case 'whatsapp':
      return 'WhatsApp';
    default:
      return '';
  }
};

export const getTicketStatus = (status: TicketModel['status']) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'ongoing':
      return 'Em andamento';
    case 'closed':
      return 'Fechado';
    default:
      return '';
  }
};
