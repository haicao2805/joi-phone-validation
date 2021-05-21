# joi-phone
A joi extension that help to validate a correct format phone number

# Installation
### npm
```sh
npm i joi-phone-validation
```

### yarn
```sh
yarn add joi-phone-validation
```

# Joi extend function
-  defaultPhoneFormat(countryName: CountryCode): Specifies the default phone number format in the country. Return this phone number in the international phone number format
-  internationalPhoneFormat(countryName: CountryCode): Specifies the international phone number format in the country. Return this phone number in the international phone number format
-  bothPhoneFormat(countryName: CountryCode): Specifies the default or international phone number format in the country. Return this phone number in the international phone number format

# Type
CountryCode = "vi"|"jp"|"us"

# Example
```javascript
import * as Joi from "joi";
import { JoiPhoneFormat } from 'joi-phone-validation';

const schemaDefault = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().defaultPhoneFormat(country),
            }).validate(input);
const { error } = schemaDefault("vi", { phone: "0862113113"});
console.log(error); // undefined



const schemaInternational = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().internationalPhoneFormat(country),
            }).validate(input);
const { error } = schemaInternational("vi", { phone: "+84862113113"});
console.log(error); // undefined        
            
            
            
const schemaBoth = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().bothPhoneFormat(country),
            }).validate(input);
const { error } = schemaBoth("vi", { phone: "+84862113113"});
console.log(error); // undefined
const { error } = schemaBoth("vi", { phone: "0862113113"});
console.log(error); // undefined  
```
# Custom error message
```javascript
const schemaDefault = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().defaultPhoneFormat(country).messages({
                        "phone.defaultPhoneFormat": "custom error message"
                  }),
            }).validate(input);
            



const schemaInternational = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().internationalPhoneFormat(country).messages({
                        "phone.internationalPhoneFormat": "custom error message"
                  }),
            }).validate(input);



const schemaInternational = (country: CountryCode, input: any) =>
            Joi.object({
                  phone: JoiPhoneFormat.string().internationalPhoneFormat(country).messages({
                        "phone.bothPhoneFormat": "custom error"
                  }),
            }).validate(input);
```
