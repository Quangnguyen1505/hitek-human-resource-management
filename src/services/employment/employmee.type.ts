export interface IUserUpdate {
  userId: string
  fullname?: string
  password?: string
  avatar?: string
  status?: 'active' | 'deactive' | undefined
}
