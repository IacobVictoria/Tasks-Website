import { ContactDetails } from "./contact_details.interface";
import { EducationDetails } from "./education_details.interface";

export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    jobDescription: string;
    contactDetails: ContactDetails;
    educationDetails: EducationDetails;
  }