const whitelist = [
  "714828553916776499"
]

export function validate_v1(userID: string): boolean {
  return whitelist.includes(userID);
}