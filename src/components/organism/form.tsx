// import React, { useState } from 'react'
// import Joi from "joi";

//  const Form:React.FC = () => {
//     const [data, setAccount] = useState<any>();

//     const validate = () => {
//         const result = schema.validate(data, { abortEarly: false });
//         console.log(result);
//         if (!result.error) return null;
    
//         const error: any = {};
    
//         for (let item of result.error.details) {
//           error[item.path[0]] = item.message;
//         }
    
//         return error;
//       };

//       const validateProperty = ({ name, value }:any) => {
//         const obj = { [name]: value };
//         const schemaSingle:any = Joi.object({[name] : rules[name]});
//         const errorObj = schemaSingle.validate(obj);
//         return errorObj.error ? errorObj.error.details[0].message: null;
//       };
//   return (
//     <div>form</div>
//   )
// }

// export default Form;
export {}