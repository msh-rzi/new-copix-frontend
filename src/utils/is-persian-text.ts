export const isPersian = (text: string) => {
  return /[\u0600-\u06FF\u0750-\u077F]/.test(text)
}
