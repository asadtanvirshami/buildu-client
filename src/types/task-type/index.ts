export default interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string | null;
  flag: boolean;
}
