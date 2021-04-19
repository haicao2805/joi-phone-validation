import * as Joi from "joi";
import { ListCountry } from "../phone/listCountry";
import { JoiPhoneFormat } from "../phone/phone";

describe("JoiPhoneFormat", () => {
      const schemaDefault = (country: string, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().defaultPhoneFormat(country),
            }).validate(input);

      const schemaInternational = (country: string, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().internationalPhoneFormat(country),
            }).validate(input);

      it("Pass a default Vietnam's phone number", () => {
            const { error } = schemaDefault("Vietnam", { phone: "0862334006" });
            expect(error).toBeUndefined();
      });

      it("Pass a default Vietnam's international phone number", () => {
            const { error } = schemaInternational("Vietnam", { phone: "+84862334006" });
            expect(error).toBeUndefined();
      });
});
