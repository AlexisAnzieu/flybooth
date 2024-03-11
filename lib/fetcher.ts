/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (args: any) => fetch(args).then((res) => res.json());
