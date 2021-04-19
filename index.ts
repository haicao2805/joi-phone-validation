import * as Joi from "joi";
import { JoiPhoneFormat } from "./phone/phone";

const schema = Joi.object({
    phone: JoiPhoneFormat.string().defaultPhoneFormat("Vietnam"),
});

console.log(
    schema.validate({
        phone: "0862334006",
    })
);
