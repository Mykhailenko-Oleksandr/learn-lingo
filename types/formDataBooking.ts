type Reason = "career" | "kids" | "abroad" | "exams" | "hobby";

export default interface FormData {
  reason: Reason;
  fullName: string;
  email: string;
  phoneNumber: string;
}
