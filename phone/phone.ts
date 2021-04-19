import * as Joi from "joi";

interface JoiStringExtend extends Joi.StringSchema {
    defaultPhoneFormat(countryName: string): this;
    internationalPhoneFormat(countryName: string): this;
}

interface JoiPhoneFormatExtend extends Joi.Root {
    string(): JoiStringExtend;
}

export const JoiPhoneFormat: JoiPhoneFormatExtend = Joi.extend((joi) => {
    return {};
});
