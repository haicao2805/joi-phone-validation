import * as Joi from "joi";
import { ListCountry } from "./listCountry";
import { CountryCode } from "./countryCode";

interface JoiStringExtend extends Joi.StringSchema {
      /**
       * @description Specifies the default phone number format in the country. Return this phone number in the international phone number format
       * @param countryName The country name in ISO format. For example: Viet Nam(vn), Japan(jp), India(in), United States of America(us)
       *
       */
      defaultPhoneFormat(countryName: CountryCode): this;

      /**
       * @description Specifies the international phone number format in the country.
       * @param countryName The country name in ISO format. For example: Viet Nam(vn), Japan(jp), India(in), United States of America(us)
       */
      internationalPhoneFormat(countryName: CountryCode): this;

      /**
       * @description Specifies the default or international phone number format in the country.
       * @param countryName The country name in ISO format. For example: Viet Nam(vn), Japan(jp), India(in), United States of America(us)
       */
      bothPhoneFormat(countryName: CountryCode): this;
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
                  "phone.bothPhoneFormat": "should be the {#country}'s phone number format",
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
                  bothPhoneFormat: {
                        method(country: string) {
                              return this.$_addRule({
                                    name: "bothPhoneFormat",
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
                              if (!regexObject) return helpers.error("phone.bothPhoneFormat", args);
                              const regexInternational = new RegExp(regexObject.international);
                              const regexDefault = new RegExp(regexObject.default);

                              if (regexInternational.test(value)) return value;
                              else if (regexDefault.test(value)) return value.replace(value.charAt(0), regexObject.prefix);
                              else return helpers.error("phone.bothPhoneFormat", args);
                        },
                  },
            },
      };
});
