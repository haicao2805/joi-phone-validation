import * as Joi from "joi";
import { ListCountry } from "./listCountry";

interface JoiStringExtend extends Joi.StringSchema {
      defaultPhoneFormat(countryName: string): this;
      internationalPhoneFormat(countryName: string): this;
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
                        method(country: string) {
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
                              const regexString = ListCountry.get(args["country"]);
                              if (!regexString) return helpers.error("phone.defaultPhoneFormat", args["country"]);
                              const regex = new RegExp(regexString.default);
                              if (!regex.test(value)) return helpers.error("phone.defaultPhoneFormat", args["country"]);

                              return value.replace(value.charAt(0), regexString.prefix);
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
                              const regexString = ListCountry.get(args["country"]);
                              if (!regexString) return helpers.error("phone.internationalPhoneFormat", args["country"]);
                              const regex = new RegExp(regexString.international);
                              if (!regex.test(value)) return helpers.error("phone.internationalPhoneFormat", args["country"]);

                              return value;
                        },
                  },
            },
      };
});
