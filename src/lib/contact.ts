export const CONTACT={email:"npfathima06@gmail.com",phone:"7902585902",phoneIntl:"917902585902",linkedin:"https://www.linkedin.com/in/fathima-np",instagram:"https://www.instagram.com/fah._e?stkn=bm1qdTBuazNlZWN0",facebook:"https://www.facebook.com/search/top?q=fathima%20np"} as const;
export type Enquiry={name:string;email:string;company:string;budget:string;message:string};
export function formatEnquiry(e:Enquiry){return [`Name: ${e.name}`,`Email: ${e.email}`,`Company: ${e.company||"-"}`,`Budget: ${e.budget||"-"}`,`Project brief: ${e.message}`].join("\n")}
export function whatsappLink(e?:Enquiry){const text=e?formatEnquiry(e):"Hi Fathima, I'd like to discuss a project.";return `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`}
