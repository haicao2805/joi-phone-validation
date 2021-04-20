import * as Joi from "joi";
import { CountryCode } from "../phone/countryCode";
import { ListCountry } from "../phone/listCountry";
import { JoiPhoneFormat } from "../phone/phone";

describe("JoiPhoneFormat", () => {
      const schemaDefault = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().defaultPhoneFormat(country),
            }).validate(input);

      const schemaInternational = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().internationalPhoneFormat(country),
            }).validate(input);

      it("Pass a default Vietnam's phone number", () => {
            const { error } = schemaDefault("vi", { phone: "0862334006" });
            expect(error).toBeUndefined();
      });

      it("Pass a default Vietnam's international phone number", () => {
            const { error } = schemaInternational("vi", { phone: "+84862334006" });
            expect(error).toBeUndefined();
      });

      it("Fail a default Vietnam's phone number", () => {
            try {
                  schemaDefault("vi", { phone: "123456789" });
            } catch (err) {
                  expect(err).toBeDefined();
            }
      });

      it("Fail a default Vietnam's international phone number", () => {
            try {
                  schemaInternational("vi", { phone: "+8123456789" });
            } catch (err) {
                  expect(err).toBeDefined();
            }
      });
});
