import * as Joi from "joi";
import { ListCountry } from "./listCountry";
import { CountryCode } from "./countryCode";

interface JoiStringExtend extends Joi.StringSchema {
      defaultPhoneFormat(countryName: CountryCode): this;
      internationalPhoneFormat(countryName: CountryCode): this;
}

interface JoiPhoneFormatExtend extends Joi.Root {
      string(): JoiStringExtend;
}

export const JoiPhoneFormat: JoiPhoneFormatExtend = Joi.extend((joi) => {
      return {
            type: "string",
            base: joi.string(),
            messages: {
                  "phone.defaultPhoneFormat": "should be the same format as {#country}'s phone number",
                  "phone.internationalPhoneFormat": "should be the same format as {#country}'s international phone number format",
            },
            rules: {
                  defaultPhoneFormat: {
                        method(country: CountryCode) {
                              return this.$_addRule({
                                    name: "defaultPhoneFormat",
                                    args: { country },
                              });
                        },
                        args: [
                              {
                                    name: "country",
                                    assert: (value) => {
                                          const res = ListCountry.has(value);
                                          return res;
                                    },
                                    message: "must be an invalid country",
                              },
                        ],
                        validate: (value: string, helpers: Joi.CustomHelpers, args): any => {
                              const regexObject = ListCountry.get(args["country"]);
                              if (!regexObject) return helpers.error("phone.defaultPhoneFormat", args);
                              const regex = new RegExp(regexObject.default);
                              if (!regex.test(value)) return helpers.error("phone.defaultPhoneFormat", args);

                              return value.replace(value.charAt(0), regexObject.prefix);
                        },
                  },
                  internationalPhoneFormat: {
                        method(country: string) {
                              return this.$_addRule({
                                    name: "internationalPhoneFormat",
                                    args: { country },
                              });
                        },
                        args: [
                              {
                                    name: "country",
                                    assert: (value) => {
                                          const res = ListCountry.has(value);
                                          return res;
                                    },
                                    message: "must be an invalid country",
                              },
                        ],
                        validate: (value: string, helpers: Joi.CustomHelpers, args): any => {
                              const regexObject = ListCountry.get(args["country"]);
                              if (!regexObject) return helpers.error("phone.internationalPhoneFormat", args);
                              const regex = new RegExp(regexObject.international);
                              if (!regex.test(value)) return helpers.error("phone.internationalPhoneFormat", args);

                              return value;
                        },
                  },
            },
      };
});
