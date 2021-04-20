import { JoiPhoneFormat } from "./phone/phone";

export { JoiPhoneFormat };
export default JoiPhoneFormat;

const hello = JoiPhoneFormat.string().defaultPhoneFormat("vi");
const hello2 = JoiPhoneFormat.string().internationalPhoneFormat("vi");
const hello3 = JoiPhoneFormat.string().bothPhoneFormat("vi");
