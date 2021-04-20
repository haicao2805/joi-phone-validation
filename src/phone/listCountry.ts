export const ListCountry = new Map([
      [
            "vi",
            {
                  default: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})/,
                  international: /(\+84)+(3|5|7|8|9|1[2|6|8|9])+([0-9]{8})/,
                  prefix: "+84",
            },
      ],
]);
