export type STATUS = 'TODO' | 'PROGRESS' | 'DONE';
export interface CreateLinkDto {
  name: string;
  description: string;
  status: STATUS;
  tags: string[];
  url: string;
  honeypot: string;
}
