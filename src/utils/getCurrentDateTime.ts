export const getCurrentDateTime = (): string => {
  return new Date().toISOString().replace('T', ' ').split('.')[0]
}
